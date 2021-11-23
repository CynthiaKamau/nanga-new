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
import { getStatus, getPillars } from "actions/data";
import { getUsers } from "actions/users";

// import { getObjectiveTasks } from "actions/objectives";

const useStyles = makeStyles(styles);

export default function StrategicObjectives() {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const history = useHistory();

    const { user: currentUser } = useSelector(state => state.auth);
    const { items, error} = useSelector(state => state.objective);
    const {  items : kpis } = useSelector(state => state.kpi);
    const { statuses, pillars } = useSelector(state => state.data);
    const { items : sysusers} = useSelector(state => state.user)


    useEffect(() => {
        dispatch(getUserObjectives(currentUser.id));
        dispatch(getKpis(currentUser.id));
        setUserId(currentUser.id);
        setCreatedBy(currentUser.id);
        dispatch(getStatus());
        dispatch(getPillars());
        dispatch(getUsers())

    }, [])

    const [addopen, setAddOpen] = useState(false);
    const [addopenindividualtask, setAddOpenIndividualTask] = useState(false);
    const [showloader, setshowloader] = useState(false);
    const [description, setDescription] = useState("");
    const [kpi_unit_of_measure, setKpiUom] = useState("");

    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [kpi_id, setKpiId] = useState("");
    const [target, setTarget] = useState("");
    const [target_achieved_on_review, setTargetAtReview] = useState("");
    const [target_achieved, setTargetAchieved] = useState("");
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
    const [ task_objective_id, setTaskObjectiveId] = useState("");
    const [editopenindividualtask, setEditOpenIndividualTask] = useState(false);
    const [task_status, setTaskStatus] = useState("");
    const [ pillar_id, setPillar] = useState("");
    const [assignee_id, setAssigneeId] = useState("");
    const [ objectiveId, setObjectiveId] = useState("");


    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const saveObjective = async () => {
        // e.preventDefault();
        setAddOpen(false);
        
        console.log("kpi uom", kpi_unit_of_measure)
    
        let end_date = moment(end_date).format('YYYY-MM-DD');
        let start_date = moment(start_date).format('YYYY-MM-DD');
    
        console.log("save objective", description, end_date, kpi_id, start_date, target, user_id, created_by, pillar_id);
    
        const config = { headers: { 'Content-Type': 'application/json' } }
    
        let body = {description, end_date, kpi_id, start_date, target, user_id, created_by, pillar_id};
    
        try {
          let response = await axios.post('/objectives/create', body, config);
        
            if (response.data.success === false) {
              setshowloader(false);
              setAddOpenTask(false);

              let error = response.data.message;

              swal.fire({
                  title: "Error",
                  text: error,
                  icon: "error",
                  dangerMode: true
              });
    
            } else {
              setshowloader(false);
              setAddOpenTask(false);
    
              console.log("objective id", response.data.data.id)
    
              let task_end_date = moment(task_end_date).format('YYYY-MM-DD');
              let task_start_date = moment(task_start_date).format('YYYY-MM-DD');
    
              let task = {
                description: task_description,
                start_date: task_start_date,
                end_date: task_end_date,
                user_id: created_by,
                created_by: created_by,
                objective_id: response.data.data.id
              }
    
              console.log("task", task)
    
              let response1 = await axios.post('/tasks/create', task, config);
    
              if (response1.data.success === false) {
                setshowloader(false);

                let error = response.data.message;

                swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                    dangerMode: true
                });
    
              console.log(response1)
              } else {
                console.log("task add", response1.data.data)

                const body = JSON.stringify({
                task_id : response1.data.data.id ,
                assigner_id : created_by,
                user_id : assignee_id
                })
    
                console.log(body, setAssigneeId)
    
                try {
    
                let response2 = await axios.post('/assignedtasks/update', body, config)
                if (response2.status == 201) {
                    setshowloader(false);
                    swal.fire({
                    title: "Success",
                    text: "Objective and task added successfully!",
                    icon: "success",
                    dangerMode: false
                    }).then(() => dispatch(getUserObjectives(currentUser.id)));
                    
                } else {
            
                    let error = response2.data.message
                    setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        dangerMode: true
                    });
                }
                } catch (error) {
            
                let err = error.response.data.message
                    setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: err,
                        icon: "error",
                        dangerMode: true
                    });
                }
    
              }
    
            }
        } catch (error) {

            setshowloader(false);
            setAddOpenTask(false);

            let err = error.response.data.message;
            
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }
    
      }
    
    const handleAddTaskOpen = () => {
        setAddOpenTask(true);
        setAddOpen(false);
    }

    const handleAddClose = () => {
        setAddOpen(false);
        setAddOpenTask(false);
    };

    const handleAddTaskClose = () => {
        setAddOpenTask(false);
    };

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {

        setDescription(list.description);

        if(list.kpi.kpi_unit_of_measure !== undefined) {
            setKpiUom(list.kpi.kpi_unit_of_measure);
        } else {
            setKpiUom([]);
        }
        setKpiId(list.kpi_id);
        setId(list.id);
        setTarget(list.target);
        setTargetAchieved(list.target_achieved);
        setTargetAtReview(list.target_achieved_on_review);
        setStartDate(list.start_date);
        setEndDate(list.end_date)
        setPillar(list.pillar_id)

    }

    const editObjective = async (e) => {
        e.preventDefault();
        setshowloader(true)
        setUserId();
        setId();

        let end_date = moment(end_date).format('YYYY-MM-DD');
        let start_date = moment(start_date).format('YYYY-MM-DD');

        console.log("save objective", id, description, end_date, kpi_id, start_date, target, user_id, target_achieved, target_achieved_on_review, pillar_id, setUpdatedBy())

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
        const body = JSON.stringify({ id, description, kpi_id, user_id, start_date, end_date,  target, target_achieved, target_achieved_on_review, created_by, updated_by, pillar_id });

        try {

            let response = await axios.post('/objectives/update', body, config)
            if (response.status == 201) {
                setshowloader(false);
                let item = response.data.message
                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => dispatch(getUserObjectives(currentUser.id)));

            } else {
                setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        dangerMode: true
                    });
            }
        } catch (error) {
            let err = error.response.data.message
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }

    }

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const setShowObjectivesTask = (id) => {

        setObjectiveId(id);
        console.log("obj id", objectiveId)

        axios.get(`/tasks/fetchTasksbyObjectiveId?objective_id=${id}`)
            .then(response => setObjTasks(response.data))
            .catch(error => setError("No tasks found", console.log(error))
            )
    
    }

    const handleAddIndividualTaskOpen = () => {
        setAddOpenIndividualTask(true);
    }

    const handleAddIndividualTaskClose = () => {
        setAddOpenIndividualTask(false);
    }

    const saveIndividualTask = async (e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        let task_end_date = moment(task_end_date).format('YYYY-MM-DD');
        let task_start_date = moment(task_start_date).format('YYYY-MM-DD');

        let task = {
        description: task_description,
        start_date: task_start_date,
        end_date: task_end_date,
        user_id: user_id,
        created_by: created_by,
        objective_id: objectiveId
        }

        console.log("individual task", task)
    
        let response = await axios.post('/tasks/create', task, config);

        console.log("resp", response)

        if (response.data.success === false) {
            setshowloader(false);
            let error = response.data.message;

            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });

        } else {

            console.log("task add", response.data.data)

            const body = JSON.stringify({
              task_id : response.data.data.id ,
              assigner_id : created_by,
              user_id : assignee_id
             })
  
            console.log(body, setAssigneeId)
  
            try {
  
              let response2 = await axios.post('/assignedtasks/update', body, config)
              if (response2.status == 201) {
                setshowloader(false);
                swal.fire({
                  title: "Success",
                  text: "Task added successfully!",
                  icon: "success",
                  dangerMode: false
                }).then(() => dispatch(getUserObjectives(currentUser.id)));
                
              } else {
        
                  let error = response2.data.message
                  setshowloader(false);
                  swal.fire({
                      title: "Error",
                      text: error,
                      icon: "error",
                      dangerMode: true
                  });
              }
            } catch (error) {
        
              let err = error.response.data.message
                  setshowloader(false);
                  swal.fire({
                      title: "Error",
                      text: err,
                      icon: "error",
                      dangerMode: true
                  });
            }
        }
    }

    const handleEditIndividualTaskOpen = () => {
        setEditOpenIndividualTask(true);
    }
    
    const handleEditIndividualTaskClose = () => {
        setEditOpenIndividualTask(false);
    }

    const setEditingIndividualTask = (list) => {
        console.log(list);
    
        setTaskDescription(list.description)
        setTaskStatus(list.status);
        setTaskStartDate(list.start_date);
        setTaskEndDate(list.end_date);
        setTaskObjectiveId(list.objective_id);
        setUserId(list.user_id);
        setId(list.id)
      }
    
      const saveEditedIndividualTask = async (e) => {
          e.preventDefault();
          setshowloader(true);
    
          console.log("edit values",  task_description, task_end_date, task_start_date, task_objective_id, user_id, created_by, updated_by, id, task_status, setUpdatedBy)
    
          const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
          const body = JSON.stringify({
            "id": id,
            "description": task_description,
            "user_id": user_id,
            "objective_id": task_objective_id,
            "start_date": task_start_date,
            "end_date": task_end_date,
            "status": task_status,
            "created_by": created_by,
            "updated_by": updated_by
          });
    
          console.log("task", body);
    
          try {
    
              let response = await axios.post('/tasks/update', body, config)
              if (response.status == 201) {
                  setshowloader(false);
                  setEditOpenIndividualTask(false);
    
                  let item = response.data.message
                  swal.fire({
                      title: "Success",
                      text: item,
                      icon: "success",
                  }).then(() => dispatch(getUserObjectives(currentUser.id)))

              } else {
                  let error = response.data.message
                      setshowloader(false);
                      setEditOpenIndividualTask(false);
    
                      swal.fire({
                          title: "Error",
                          text: error,
                          icon: "error",
                          dangerMode: true
                      });
              }
          } catch (error) {
              let err = error.response.data.message
              setshowloader(false);
              setEditOpenIndividualTask(false);
    
              swal.fire({
                  title: "Error",
                  text: err,
                  icon: "error",
                  dangerMode: true
              });
          }
    
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
                    <Card style={{borderLeft : list.objectives.overallStatus === 'INCOMPLETE' ? 'solid 5px red' : (list.objectives.overallStatus === 'COMPLETE') ? 'solid 5px green' : 'solid 5px black' , marginBottom: '0'}} key={index} >
                        <Grid container justify="flex-end">
                            <IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(list.objectives); }} ><EditIcon /></IconButton>
                        </Grid>

                        <GridItem xs={12} sm={12} md={12}>
                            <h4 className={classes.textBold}> {list.objectives.description} </h4>
                            <h6 className={classes.textGreen}> Management actions</h6>

                            <h6> KPIS : {list.objectives.kpi.title} </h6>

                            <h6 > STATUS : {list.objectives.overallStatus} </h6>

                        </GridItem>
                        <CardBody className={classes.cardBody}>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                        {list.offtrack} <small>Off Ttack</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                            <h3 className={classes.cardTitle}>
                                            {list.cancelled} <small>Cancelled</small>
                                            </h3>
                                    </CardBody>
                                </Card>
                            </GridItem >
                            {/* <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                        <h4 className={classes.cardTitle}>
                                        {list.postPoned} <small>Postponed</small>
                                        </h4>
                                    </CardBody>
                                </Card>
                            </GridItem> */}
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyOrange}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                        {list.onGoing}  <small>Ongoing</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card  className={classes.cardBodyGreen}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                        {list.done} <small>Completed</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                        {list.notStarted} <small>Not Started</small>
                                        </h3>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            {/* <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()} /> </IconButton> */}
                            { show_tasks === false ? (
                                <IconButton onClick={() => { setShowTasks(true); setSelectedIndex(index); setShowObjectivesTask(list.objectives.id)}} > <ExpandMoreIcon className={classes.iconBottom} /> </IconButton>
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
                                            <TableCell>Start Date</TableCell>
                                            <TableCell>Due Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Action</TableCell>
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
                                                <TableCell> <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditIndividualTaskOpen(); setEditingIndividualTask(list) }} ><EditIcon /></IconButton></TableCell>
                                            </TableRow>
                                        ))) : err ? (<TableRow> <TableCell> {err} </TableCell></TableRow>) 
                                        : null }
                                    </TableBody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <Grid container justify="center">
                                    <Button simple onClick={() => {setShowTasks(false); handleAddIndividualTaskOpen() }}><p style={{ color: '#388e3c' }}> Add New Task</p> </Button>
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
                    <Grid container spacing={2}>
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
                                {kpis && kpis.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <label> Pillar : </label>
                            <TextField
                                id="outlined-select-pillar"
                                select
                                required
                                fullWidth
                                variant="outlined"
                                label="Select"
                                className={classes.textInput}
                                value={pillar_id}
                                onChange={(event) => {
                                setPillar(event.target.value);
                                // setUomValue()
                                }}
                                helperText="Please select your pillar"
                            >
                                {pillars && pillars.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.description}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} lg={6} xl={6} sm={12}>
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
                            <Button color="primary" onClick={handleAddTaskOpen}>Save</Button>
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

                    <label style={{ fontWeight: 'bold', color: 'black' }}> User : </label>
                    <TextField
                        id="outlined-select-user"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        value={assignee_id}
                        onChange={(event) => {
                            setAssigneeId(event.target.value);
                        }}
                        helperText="Please select a user"
                        >
                        {sysusers.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.fullnames}
                            </MenuItem>
                        ))}
                    </TextField>

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

            <Dialog open={addopenindividualtask} onClose={handleAddIndividualTaskClose}>
                <DialogTitle>Strategic Initiative</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add New Strategic Initiative
                    </DialogContentText>

                    <TextField
                        fullWidth
                        label="Description"
                        id="task_description"
                        multiline
                        rows={4}
                        required
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={task_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setTaskDescription(value)
                        }}
                    />

                    <label style={{ fontWeight: 'bold', color: 'black' }}> User : </label>
                    <TextField
                        id="outlined-select-user"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        value={assignee_id}
                        onChange={(event) => {
                            setAssigneeId(event.target.value);
                        }}
                        helperText="Please select a user"
                        >
                        {sysusers.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.fullnames}
                            </MenuItem>
                        ))}
                    </TextField>

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
                    <Button color="danger" onClick={handleAddIndividualTaskClose}>Cancel</Button>
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
                        <Button color="primary" onClick={(e) => { handleAddIndividualTaskClose(); saveIndividualTask(e) }}>Save</Button>
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
                        {kpis && kpis.map((option) => (
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

                    ) : kpi_unit_of_measure === '%' || kpi_unit_of_measure === '<%' || kpi_unit_of_measure === '%>' ? (

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

                  <label> Pillar : </label>
                  <TextField
                    id="outlined-select-pillar"
                    select
                    required
                    fullWidth
                    variant="outlined"
                    label="Select"
                    className={classes.textInput}
                    value={pillar_id}
                    onChange={(event) => {
                      setPillar(event.target.value);
                      // setUomValue()
                    }}
                    helperText="Please select your pillar"
                  >
                    {pillars && pillars.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>

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
                            value={target_achieved_on_review}
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
                            value={target_achieved}
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

            <Dialog open={editopenindividualtask} onClose={handleEditIndividualTaskClose}>
            <DialogTitle>Strategic Intitative</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit Strategic Intitative Details
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        value={task_description}
                        variant="outlined"
                        onChange={(event) => {
                            setTaskDescription(event.target.value);
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
                                helperText="Set due date"
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

                    <label style={{ fontWeight: 'bold', color: 'black' }}> Status : </label>
                    <TextField
                        id="outlined-select-status"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        value={task_status}
                        onChange={(event) => {
                            setTaskStatus(event.target.value);
                        }}
                        helperText="Please select the status"
                    >
                        {statuses.map((option) => (
                            <MenuItem key={option.status} value={option.status}>
                                {option.status}
                            </MenuItem>
                        ))}
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleEditIndividualTaskClose}>Cancel</Button>
                    <Button color="primary" onClick={(e) => { saveEditedIndividualTask(e) }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}