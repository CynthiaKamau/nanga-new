import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ControlPoint } from "@material-ui/icons";
import { getAssignedTasks } from "actions/tasks";
import moment from "moment";
import { LinearProgress } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-pro-react/views/assignedTasksStyle.js";
import IconButton from '@material-ui/core/Button';
import { getStatus } from "actions/data";
import Button from "components/CustomButtons/Button.js";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import MenuItem from '@material-ui/core/MenuItem';
import { getUserObjectives } from "actions/objectives";

const useStyles = makeStyles(styles);

export default function AssignedTasksPage() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth);
    const { items, error, isLoading } = useSelector(state => state.task);
    const { statuses } = useSelector(state => state.data);
    const { items: objectives} = useSelector(state => state.objective);

    console.log("objectives", objectives)
    console.log("statuses", statuses)


    const [addopen, setAddOpen] = useState(false);
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [created_by, setCreatedBy] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);
    const [showloader, setshowloader] = useState(false);
    const [description, setDescription] = useState("");
    const [objective_id, setObjectiveId] = useState("");


    useEffect(() => {
        dispatch(getAssignedTasks(currentUser.id))
        dispatch(getStatus())
        dispatch(getUserObjectives(currentUser.id));
    }, []);

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const saveTaskToObjectives = async (e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

        console.log("task here", description, start_date, end_date, user_id, created_by, objective_id, setCreatedBy, setUserId )
    
        let end_date = moment(end_date).format('YYYY-MM-DD');
        let start_date = moment(start_date).format('YYYY-MM-DD');

        let task = {
        description: description,
        start_date: start_date,
        end_date: end_date,
        user_ids: user_id,
        created_by: user_id,
        objective_id: objective_id
        }

        console.log("individual task", task)
    
        try {

            let response = await axios.post('/tasks/create', task, config);

            if (response.data.success === false) {
                setshowloader(false);
                setAddOpen(false)
                let error = response.data.message

                swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                    dangerMode: true
                });

            } else {

                setshowloader(false);
                setAddOpen(false)
                swal.fire({
                    title: "Success",
                    text: "Task added successfully!",
                    icon: "success",
                });
            }
        } catch (error) {
            let err = error.response.data.message
            setshowloader(false);
            setAddOpen(false)
  
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }
    }

    
    const handleOpen = () => {
        setAddOpen(true);
        //history.push(`/admin/user-dashboard/id=${user}`);
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>

                    <Card>
                        <CardHeader color="primary">
                            <h4>Assigned Tasks</h4>
                            <p>
                                Assigned Tasks details.
                            </p>
                        </CardHeader>
                        <CardBody>

                            <Table className={classes.tableBorder}>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell>Management Actions</TableCell>
                                        <TableCell>From</TableCell>
                                        <TableCell>Resources</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Progress</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items ? ( items.map((list, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{list.description}</TableCell>
                                            <TableCell> {list.assignedTasks[0].assigner.fullnames} </TableCell>
                                            <TableCell > 
                                                {list.assignedTasks.map((detail, index) => (
                                                   <img key={index} src={detail.assignee.userPicture}
                                                    alt="..." style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: '160px', marginTop: '35px' }} />
                                                ))}
                                            </TableCell>
                                            {/* <TableCell>{moment(list.start_date).format('YYYY-MM-DD')}</TableCell> */}
                                            <TableCell>{moment(list.end_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell>{list.status}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="view" color="error" onClick={() => {handleOpen(); setObjectiveId(list.objective_id); setDescription(list.description)}} ><ControlPoint /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))) : error ? (<TableRow> <TableCell> {error} </TableCell></TableRow> 
                                    ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }
                                </TableBody>    
                            </Table>

                        </CardBody>
                    </Card>

                    <Dialog open={addopen} onClose={handleAddClose}>
                        <DialogTitle>Strategic Objective</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add Task To Your Strategic Objectives
                            </DialogContentText>
                          
                            <label> Objective : </label>
                            <TextField
                                id="outlined-select-objective"
                                select
                                fullWidth
                                variant="outlined"
                                label="Select"
                                className={classes.textInput}
                                value={objective_id}
                                onChange={(event) => {
                                    setObjectiveId(event.target.value);
                                }}
                                helperText="Please select your objective"
                            >
                                {objectives && objectives.map((option) => (
                                    <MenuItem key={option.objectives.id} value={option.objectives.id}>
                                        {option.objectives.description}
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
                                        height={100}
                                        width={100}
                                    />
                                </div>
                                ) :
                                (
                                    <Button color="primary" onClick={saveTaskToObjectives}>Save</Button>
                                )}
                        </DialogActions>
                    </Dialog>

                </GridItem>
            </GridContainer>
        </div>
    );
}
