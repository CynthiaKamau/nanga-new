import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
import { useHistory } from "react-router";
import JsonData from "../../data/data.json";
import { addUserObjective, editUserObjective } from "actions/objectives";
import { addTask } from "actions/tasks";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { Grid } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(styles);

export default function StrategicObjectives() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const history = useHistory();

    const { item } = useSelector(state => state.objective)
    const { error } = useSelector(state => state.objective);

    const kpis = JsonData.KPIS;

    const [addopen, setAddOpen] = useState(false);
    const [showloader, setshowloader] = useState(false);
    const [description, setDescription] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [kpi_id, setKpiId] = useState("");
    const [target, setTarget] = useState("");
    const [targetAtReview, setTargetAtReview] = useState("");
    const [targetAchieved, setTargetAchieved] = useState("");
    const [user_id, setUserId] = useState("");
    const [taskdescription, setTaskDescription] = useState("");
    const [task_start_date, setTaskStartDate] = useState("");
    const [task_end_date, setTaskEndDate] = useState("");
    const [addopentask, setAddOpenTask] = useState("");
    const [objective, setObjective] = useState("");
    const [editopen, setEditOpen] = useState(false);
    const [id, setId] = useState("");


    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const saveObjective = e => {
        e.preventDefault();
        setshowloader(true)
        setUserId();

        console.log("save objective", description, end_date, kpi_id, start_date, target, user_id)

        dispatch(addUserObjective(description, end_date, kpi_id, start_date, target, user_id))
        if (error) {
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });
        } else if (item) {
            location.reload()
        }

    }

    const handleAddClose = () => {
        setAddOpen(false);
        setAddOpenTask(true);
    };

    const handleAddTaskClose = () => {
        setAddOpenTask(false);
    };

    const saveTask = e => {
        e.preventDefault();
        setshowloader(true)
        setUserId();

        console.log("save objective", objective, taskdescription, task_end_date, task_start_date, user_id)

        dispatch(addTask(objective, taskdescription, task_end_date, task_start_date, user_id))
        if (error) {
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });
        } else if (item) {
            location.reload()
        }

    }

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = () => {

        // setKPI(list.title);
        // setUnitOfMeasure(list.kpiUnitOfMeasure);
        // setCategory(list.categoryId);
        // setId(list.id);
        // setTarget(list.target);
        // setTargetAchieved(list.target_achieved);
        // setTargetAtReview(list.target_achieved_on_review);

    }

    const editObjective = e => {
        e.preventDefault();
        setshowloader(true)
        setUserId();
        setId();

        console.log("save objective", id, description, end_date, kpi_id, start_date, target, user_id, targetAchieved, targetAtReview)

        dispatch(editUserObjective(id, description, end_date, kpi_id, start_date, target, user_id, targetAchieved, targetAtReview))
        if (error) {
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });
        } else if (item) {
            location.reload()
        }

    }

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleRedirect = () => {
        history.push('/admin/tasks');
    }

    return (
        <div>

            <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
                <Button color="primary" onClick={handleAddClickOpen}> Create New Objective</Button>
            </Grid>

            <GridContainer>
                <Card className={classes.cardBodyRed}>
                    <Grid container justify="flex-end">
                        <IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(); }} ><EditIcon /></IconButton>
                    </Grid>

                    <GridItem xs={12} sm={12} md={12}>
                        <h4 className={classes.textBold}> 1. Grow Topline Growth </h4>
                        <h6 className={classes.textGreen}> 6. Management actions</h6>
                    </GridItem>
                    <CardBody className={classes.cardBody}>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyRed}>
                                    <h3 className={classes.cardTitle}>
                                        2 <small>Off Ttack</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyRed}>
                                    <h3 className={classes.cardTitle}>
                                        1 <small>Cancelled</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem >
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyRed}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        0 <small>Postponed</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyGreen}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        3 <small>Ongoing</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyGreen}>
                                    <h3 className={classes.cardTitle}>
                                        1 <small>Completed</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyGreen}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        0 <small>Not Started</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()} /> </IconButton>
                    </CardFooter>
                </Card>
            </GridContainer>

            <GridContainer>
                <Card className={classes.cardBodyRed}>
                    <Grid container justify="flex-end">
                        <IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(); }} ><EditIcon /></IconButton>
                    </Grid>

                    <GridItem xs={12} sm={12} md={12}>
                        <h4 className={classes.textBold}> 2. Improve growth of alternate channels</h4>
                        <h6 className={classes.textGreen}> 6. Management actions</h6>
                    </GridItem>
                    <CardBody className={classes.cardBody}>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyRed}>
                                    <h3 className={classes.cardTitle}>
                                        2 <small>Off Ttack</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyRed}>
                                    <h3 className={classes.cardTitle}>
                                        1 <small>Cancelled</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem >
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyRed}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        0 <small>Postponed</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyGreen}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        3 <small>Ongoing</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyGreen}>
                                    <h3 className={classes.cardTitle}>
                                        1 <small>Completed</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyGreen}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        0 <small>Not Started</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()} /> </IconButton>
                    </CardFooter>
                </Card>
            </GridContainer>

            <GridContainer>
                <Card className={classes.cardBodyRed}>

                    <Grid container justify="flex-end">
                        <IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(); }} ><EditIcon /></IconButton>
                    </Grid>

                    <GridItem xs={12} sm={12} md={12}>
                        <h4 className={classes.textBold}> 3. Another management action </h4>
                        <h6 className={classes.textGreen}> 6. Management actions</h6>
                    </GridItem>
                    <CardBody className={classes.cardBody}>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyRed}>
                                    <h3 className={classes.cardTitle}>
                                        2 <small>Off Ttack</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyRed}>
                                    <h3 className={classes.cardTitle}>
                                        1 <small>Cancelled</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem >
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyRed}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        0 <small>Postponed</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyGreen}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        3 <small>Ongoing</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card>
                                <CardBody className={classes.cardBodyGreen}>
                                    <h3 className={classes.cardTitle}>
                                        1 <small>Completed</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                            <Card className={classes.cardBodyGreen}>
                                <CardBody>
                                    <h3 className={classes.cardTitle}>
                                        0 <small>Not Started</small>
                                    </h3>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                        <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()} /> </IconButton>
                    </CardFooter>
                </Card>
            </GridContainer>

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
                        maxRows={4}
                        className={classes.textInput}
                        type="text"
                        value={description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setDescription(value)
                        }}
                    />

                    {/* <label> Category : </label>
            <TextField
              id="outlined-select-category"
              select
              fullWidth
              variant="outlined"
              label="Select"
              className={classes.textInput}
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              helperText="Please select your category"
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.description}
                </MenuItem>
              ))}
            </TextField> */}

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
                        variant="standard"
                        onChange={(event) => {
                            setTarget(event.target.value);
                        }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            helperText="Set start date"
                            format="yyyy/dd/MM"
                            fullWidth
                            value={start_date}
                            onChange={setStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            helperText="Set end date"
                            format="yyyy/dd/MM"
                            fullWidth
                            value={end_date}
                            onChange={setEndDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                    <Button color="primary" onClick={(e) => { handleAddClose(); saveObjective(e) }}>Save</Button>
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
                        disabled
                        value={objective}
                        className={classes.textInput}
                        onChange={(event) => {
                            const value = event.target.value;
                            setObjective(value)
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        id="taskdescription"
                        multiline
                        maxRows={4}
                        className={classes.textInput}
                        type="text"
                        value={taskdescription}
                        onChange={(event) => {
                            const value = event.target.value;
                            setTaskDescription(value)
                        }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            helperText="Set start date"
                            format="yyyy/dd/MM"
                            fullWidth
                            value={task_start_date}
                            onChange={setTaskStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            helperText="Set end date"
                            format="yyyy/dd/MM"
                            fullWidth
                            value={task_end_date}
                            onChange={setTaskEndDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

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
                        <Button color="primary" onClick={(e) => { handleAddTaskClose(); saveTask(e) }}>Save</Button>
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
                        maxRows={4}
                        className={classes.textInput}
                        type="text"
                        value={description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setDescription(value)
                        }}
                    />

                    {/* <label> Category : </label>
            <TextField
              id="outlined-select-category"
              select
              fullWidth
              variant="outlined"
              label="Select"
              className={classes.textInput}
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              helperText="Please select your category"
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.description}
                </MenuItem>
              ))}
            </TextField> */}

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
                        variant="standard"
                        onChange={(event) => {
                            setTarget(event.target.value);
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="target_at_review"
                        label="Target At Review"
                        type="text"
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        value={targetAtReview}
                        variant="standard"
                        onChange={(event) => {
                            setTargetAtReview(event.target.value);
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="target_achieved"
                        label="Target Achieved"
                        type="text"
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        value={targetAchieved}
                        variant="standard"
                        onChange={(event) => {
                            setTargetAchieved(event.target.value);
                        }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            helperText="Set start date"
                            format="yyyy/dd/MM"
                            fullWidth
                            value={start_date}
                            onChange={setStartDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            helperText="Set end date"
                            format="yyyy/dd/MM"
                            fullWidth
                            value={end_date}
                            onChange={setEndDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                    <Button color="primary" onClick={(e) => { handleEditClose(); editObjective(e) }}>Save</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}