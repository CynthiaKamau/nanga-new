import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpandLess } from "@material-ui/icons";
import CardFooter from "components/Card/CardFooter";
import { IconButton } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
// import { useHistory } from "react-router";
import {  editUserObjective } from "actions/objectives";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import axios from "axios";
import { getUserObjectives } from "actions/objectives";
import { getKpis } from "actions/kpis";
// import { getObjectiveTasks } from "actions/objectives";

const useStyles = makeStyles(styles);

export default function StrategicObjectives() {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const history = useHistory();

    const { user: currentUser } = useSelector(state => state.auth);
    const { items, error, item } = useSelector(state => state.objective);
    const {  items : kpis } = useSelector(state => state.kpi);

    const [ objectiveId, setObjectiveId] = useState("");


    useEffect(() => {
        dispatch(getUserObjectives(currentUser.id));
        dispatch(getKpis());
        setUserId(currentUser.id);
        setCreatedBy(currentUser.id);

    }, [])

    const [addopen, setAddOpen] = useState(false);
    const [showloader, setshowloader] = useState(false);
    const [description, setDescription] = useState("");
    const [kpi_unit_of_measure, setKpiUom] = useState("");

    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [kpi_id, setKpiId] = useState("");
    const [target, setTarget] = useState("");
    const [targetAtReview, setTargetAtReview] = useState("");
    const [targetAchieved, setTargetAchieved] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);
    const [task_description, setTaskDescription] = useState("");
    const [task_start_date, setTaskStartDate] = useState("");
    const [task_end_date, setTaskEndDate] = useState("");
    const [addopentask, setAddOpenTask] = useState("");
    const [created_by, setCreatedBy] = useState("");
    const [editopen, setEditOpen] = useState(false);
    const [id, setId] = useState("");
    const [updated_by, setUpdatedBy] = useState(currentUser.id);
    const [show_tasks, setShowTasks] = useState(false);
    const [setIndex, setSelectedIndex] = useState("");
    const [err, setError] = useState("");
    const [obj_tasks, setObjTasks] = useState("");

    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const saveObjective = async () => {
        // e.preventDefault();
        setshowloader(true);
        console.log("kpi uom", kpi_unit_of_measure)
    
        let end_date = moment(end_date).format('YYYY-MM-DD');
        let start_date = moment(start_date).format('YYYY-MM-DD');
    
        console.log("save objective", description, end_date, kpi_id, start_date, target, user_id, created_by);
    
        const config = { headers: { 'Content-Type': 'application/json' } }
    
        let body = {description, end_date, kpi_id, start_date, target, user_id, created_by};
    
        try {
          let response = await axios.post('/objectives/create', body, config);
        
            if (response.data.success === false) {
              setshowloader(false);
              swal.fire({
                  title: "Error",
                  text: "An error occurred, please try again!",
                  icon: "error",
                  dangerMode: true
              });
    
              console.log(response)
            } else {
              setshowloader(false);
    
              console.log("objective id", response.data.data.id)
    
              let task_end_date = moment(task_end_date).format('YYYY-MM-DD');
              let task_start_date = moment(task_start_date).format('YYYY-MM-DD');
    
              let task = {
                description: task_description,
                start_date: task_start_date,
                end_date: task_end_date,
                user_id: user_id,
                created_by: created_by,
                objective_id: response.data.data.id
              }
    
              console.log("task", task)
    
              let response1 = await axios.post('/tasks/create', task, config);
    
              if (response1.data.success === false) {
                setshowloader(false);
                swal.fire({
                    title: "Error",
                    text: "An error occurred, please try again!",
                    icon: "error",
                    dangerMode: true
                });
    
              console.log(response1)
              } else {
                console.log("task", response1.data.data)
    
                swal.fire({
                  title: "Success",
                  text: "Objective and task added successfully!",
                  icon: "success",
                  dangerMode: false
              });
    
              }
    
            }
        } catch (error) {

            setshowloader(false);
              swal.fire({
                  title: "Error",
                  text: "An error occurred, please try again!",
                  icon: "error",
                  dangerMode: true
              });
            console.log(error);
        }
    
      }

    const handleAddClose = () => {
        setAddOpen(false);
        setAddOpenTask(true);
    };

    const handleAddTaskClose = () => {
        setAddOpenTask(false);
    };

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {

        setDescription(list.description);
        setKpiUom(list.kpi.kpi_unit_of_measure);
        setKpiId(list.kpi_id);
        setId(list.id);
        setTarget(list.target);
        setTargetAchieved(list.target_achieved);
        setTargetAtReview(list.target_achieved_on_review);
        setStartDate(list.start_date);
        setEndDate(list.end_date)

    }

    const editObjective = e => {
        e.preventDefault();
        setshowloader(true)
        setUserId();
        setId();

        let end_date = moment(end_date).format('YYYY-MM-DD');
        let start_date = moment(start_date).format('YYYY-MM-DD');

        console.log("save objective", id, description, end_date, kpi_id, start_date, target, user_id, targetAchieved, targetAtReview, setUpdatedBy())

        dispatch(editUserObjective(id, description, end_date, kpi_id, start_date, target, user_id, targetAchieved, targetAtReview, created_by, updated_by))
        if (error) {
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });
        } else if (item) {
            setshowloader(false);
            swal.fire({
                title: "Success",
                text: item,
                icon: "success",
            });
        }

    }

    const handleEditClose = () => {
        setEditOpen(false);
    };

    // const setShowObjectivesTask = (id) => {

    //     setObjectiveId(id);

    //     if(objectiveId !== null) {
    //         dispatch(getObjectiveTasks)
    //     }
        
    // }

    // const setShowObjectivesTask = (id) => async () => {

        const setShowObjectivesTask = (id) => {

        setObjectiveId(id);
        console.log("obj id", objectiveId)

        axios.get(`/tasks/fetchTasksbyObjectiveId?objective_id=${id}`)
            .then(response => setObjTasks(response.data))
            .catch(error => setError("No tasks found", console.log(error))
            )
    
    }

    // const handleRedirect = () => {
    //     history.push('/admin/tasks');
    // }

    return (
        <div>

            <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
                <Button color="primary" onClick={handleAddClickOpen}> Create New Objective</Button>
            </Grid>

            {items ? ( items.map((list, index) => (
                <div key={index} style={{ justifyContent: 'center' }} >
                    <Card className={classes.cardBodyRed} key={index} style={{ marginBottom: '0'}} >
                        <Grid container justify="flex-end">
                            <IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(list); }} ><EditIcon /></IconButton>
                        </Grid>

                        <GridItem xs={12} sm={12} md={12}>
                            <h4 className={classes.textBold}> {list.description} </h4>
                            <h6 className={classes.textGreen}> 6. Management actions</h6>
                        </GridItem>
                        <CardBody className={classes.cardBody}>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                            2 <small>Off Ttack</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyPurple}>
                                    <CardBody>
                                            <h3 className={classes.cardTitle}>
                                                1 <small>Cancelled</small>
                                            </h3>
                                    </CardBody>
                                </Card>
                            </GridItem >
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyYellow}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                            0 <small>Postponed</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyOrange}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                            3 <small>Ongoing</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card  className={classes.cardBodyGreen}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                            1 <small>Completed</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyBlack}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                            0 <small>Not Started</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            {/* <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()} /> </IconButton> */}
                            { show_tasks === false ? (
                                <IconButton onClick={() => { setShowTasks(true); setSelectedIndex(index); setShowObjectivesTask(list.id)}} > <ExpandMoreIcon className={classes.iconBottom} /> </IconButton>
                            ) : show_tasks === true ? ( <IconButton> <ExpandLess className={classes.iconBottom} onClick={() => setShowTasks(false)} /> </IconButton> 
                            ) : null}
                        </CardFooter>
                        
                    </Card>

                    {/* tasks card */}
                    { show_tasks === true && setIndex === index ? (

                    
                        <Card style={{ width: "95%", margin: '0', marginLeft: '5%'}} >
                            <CardBody>
                                <h3 className={classes.textBold}>Management Actions </h3>
                                <Table>
                                    <TableHead className={classes.tableHeader}>
                                        <TableRow >
                                            <TableCell>Management Action</TableCell>
                                            <TableCell>Resource</TableCell>
                                            <TableCell>Due Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* <TableRow key=''>
                                            <TableCell>Task One</TableCell>
                                            <TableCell>John Doe</TableCell>
                                            <TableCell>2021-10-01</TableCell>
                                            <TableCell>Pending</TableCell>
                                        </TableRow> */}
                                        { obj_tasks ? obj_tasks.length === 0 ? (<TableRow> <TableCell> No tasks available </TableCell></TableRow>)
                                        : (obj_tasks.map((list, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{list.description}</TableCell>
                                                <TableCell>{moment(list.start_date).format('YYYY-MM-DD')}</TableCell>
                                                <TableCell>{moment(list.end_date).format('YYYY-MM-DD')}</TableCell>
                                                <TableCell>{list.status}</TableCell>
                                            </TableRow>
                                        ))) : err ? (<TableRow> <TableCell> {err} </TableCell></TableRow>) 
                                        : null }
                                    </TableBody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <Grid container justify="center">
                                    <Button simple onClick={() => setShowTasks(false)}><p style={{ color: '#388e3c' }}> Add New Task</p> </Button>
                                </Grid>
                            </CardFooter>
                        </Card>

                    ) : null }
                </div>
                
            ))) : null}

            <Dialog open={addopen} onClose={handleAddClose}>
                <DialogTitle>Strategic Objective</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create New  Strategic Objective
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setDescription(value)
                        }}
                    />

                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <label> KPI : </label>
                        <TextField
                            id="outlined-select-kpi"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            className={classes.textInput}
                            value={kpi_id}
                            onChange={(event) => {
                                setKpiId(event.target.value);
                                setKpiUom(event);
                                console.log("uom search", event.target)
                            }}
                            helperText="Please select your kpi"
                        >
                            {kpis.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.title}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="target"
                        label="Target"
                        className={classes.textInput}
                        type="text"
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        value={target}
                        variant="outlined"
                        onChange={(event) => {
                            setTarget(event.target.value);
                        }}
                        />
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set start date"
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={start_date}
                                onChange={setStartDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </MuiPickersUtilsProvider>

                        </Grid>

                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set end date"
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={end_date}
                                onChange={setEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                            
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                    { showloader === true  ? (
                        <div style={{ textAlign: "center", marginTop: 10 }}>
                            <Loader
                                type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                            />
                        </div>
                        ) :
                        (
                            <Button color="primary" onClick={handleAddClose}>Save</Button>
                        )}
                </DialogActions>
            </Dialog>

            <Dialog open={addopentask} onClose={handleAddTaskClose}>
                <DialogTitle>Strategic Initiative</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add New Strategic Initiative
                    </DialogContentText>

                    <TextField
                        fullWidth
                        label="Objective"
                        id="objective"
                        type="text"
                        variant="outlined"
                        disabled
                        value={description}
                        className={classes.textInput}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        id="task_description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={task_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setTaskDescription(value)
                        }}
                    />

                <Grid container spacing={2}>
                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set start date"
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={task_start_date}
                                onChange={setTaskStartDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set end date"
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={task_end_date}
                                onChange={setTaskEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleAddTaskClose}>Cancel</Button>
                    {showloader === true ? (
                        <div style={{ textAlign: "center", marginTop: 10 }}>
                            <Loader
                                type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                            />
                        </div>
                    ) : (
                        <Button color="primary" onClick={(e) => { handleAddTaskClose(); saveObjective(e) }}>Save</Button>
                    )}
                </DialogActions>
            </Dialog>

            <Dialog open={editopen} onClose={handleEditClose}>
                <DialogTitle>Strategic Objective</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit Strategic Objective
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setDescription(value)
                        }}
                    />

                    <label> KPI : </label>
                    <TextField
                        id="outlined-select-kpi"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        className={classes.textInput}
                        value={kpi_id}
                        onChange={(event) => {
                            setKpiId(event.target.value);
                        }}
                        helperText="Please select your kpi"
                    >
                        {kpis.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </TextField>

                    { kpi_unit_of_measure === 'numeric' ? (

                        <TextField
                        autoFocus
                        margin="dense"
                        id="target"
                        label="Target"
                        className={classes.textInput}
                        type="number"
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        value={target}
                        variant="outlined"
                        onChange={(event) => {
                            setTarget(event.target.value);
                        }}
                        />

                    ) : kpi_unit_of_measure === '%' ? (

                        <TextField
                        autoFocus
                        margin="dense"
                        id="target"
                        label="Target"
                        className={classes.textInput}
                        type="text"
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        value={target}
                        variant="outlined"
                        onChange={(event) => {
                            setTarget(event.target.value);
                        }}
                    />

                    ) : null}  

                    <Grid container spacing={2}>
                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="target_at_review"
                            label="Target At Review"
                            type="text"
                            fullWidth
                            style={{ marginBottom: '15px' }}
                            value={targetAtReview}
                            variant="outlined"
                            onChange={(event) => {
                                setTargetAtReview(event.target.value);
                            }}
                            />
                        </Grid>

                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="target_achieved"
                            label="Target Achieved"
                            type="text"
                            fullWidth
                            style={{ marginBottom: '15px' }}
                            value={targetAchieved}
                            variant="outlined"
                            onChange={(event) => {
                                setTargetAchieved(event.target.value);
                            }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set start date"
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={start_date}
                                onChange={setStartDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set end date"
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={end_date}
                                onChange={setEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                    <Button color="primary" onClick={(e) => { handleEditClose(); editObjective(e) }}>Save</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}