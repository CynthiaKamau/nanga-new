import React, { useState , useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import IconButton from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getTasks, addTask, editTask } from "actions/tasks";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import moment from "moment";
import { getUserObjectives } from "actions/objectives";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function TasksPage() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth)
    const { items : objectives } = useSelector(state => state.objective)
    const { items, item , error, isLoading } = useSelector(state => state.task)

    console.log(objectives)

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [deleteopen, setDeleteOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [end_date, setEndDate] = useState("");
    const [start_date, setStartDate] = useState("");
    const [objective_id, setObjectiveId] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);
    const [status, setStatus] = useState("");
    const [showloader, setshowloader] = useState(false);  
    const [created_by, setCreatedBy] = useState(currentUser.id);
    const [updated_by, setUpdatedBy] = useState(currentUser.id);
    const [id, setId] = useState("");

    useEffect(() => {
        dispatch(getTasks(currentUser.id))
        dispatch(getUserObjectives(currentUser.id));
    }, []);

    console.log("tasks", items)

    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const saveTask = e => {
        e.preventDefault();
        setshowloader(true);

        console.log("save values", description, end_date, start_date, objective_id, user_id, setUserId(), setCreatedBy(), setUpdatedBy())
    
        dispatch(addTask( description, end_date, start_date, objective_id, user_id, created_by ))
        if (error) {
          setshowloader(false);
          swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              dangerMode: true
          });
        } else if(item) {
            setshowloader(false);
            swal.fire({
                title: "Success",
                text: "Task added successfully.",
                icon: "success",
            });
        }
    
    }

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {
        console.log(list);

        setDescription(list.description)
        setStatus(list.status);
        setStartDate(list.start_date);
        setEndDate(list.end_date);
        setObjectiveId(list.objective_id);
        setUserId(list.user_id);
        setId(list.id)
    }

    const saveEdited = e => {
        e.preventDefault();
        setshowloader(true);

        console.log("edit values",  description, end_date, start_date, objective_id, user_id, created_by, updated_by, id, status)
    
        dispatch(editTask(description, end_date, start_date, objective_id, user_id, created_by, updated_by, id, status))
        if (error) {
          setshowloader(false);
          swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              dangerMode: true
          });
        } else if(item) {
            setshowloader(false);
            swal.fire({
                title: "Success",
                text: "Task updated successfully.",
                icon: "success",
            });
        }
    
    }

    const handleDeleteClickOpen = () => {
        setDeleteOpen(true);
    };

    const setDelete = (list) => {
        console.log(list)
    }

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const statuses = [
        {
            value: '1',
            label: 'NOT-STARTED',
        },
        {
            value: '2',
            label: 'STARTED',
        },
        {
            value: '3',
            label: 'ONGOING',
        }
    ]

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4>Tasks</h4>
                            <p>
                                Tasks details.
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add Task </Button> </div>

                            <Table>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell>Management Action</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items ? ( items.map((list, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{list.description}</TableCell>
                                            <TableCell>{moment(list.start_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell>{moment(list.end_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell>{list.status}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                                                <IconButton aria-label="edit" color="primary" onClick={() => { handleEditClickOpen(); setEditing(list) }} ><EditIcon /></IconButton>
                                                <IconButton aria-label="delete" color="secondary" onClick={() => { handleDeleteClickOpen(); setDelete(list) }} ><DeleteIcon /></IconButton>
                                            </TableCell>

                                        </TableRow>
                                    ))) : error ? (<TableRow> <TableCell> {error} </TableCell></TableRow>
                                    ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }
                                </TableBody>
                            </Table>

                            <Dialog open={addopen} onClose={handleAddClose}>
                                <DialogTitle>Strategic Intitative</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Create New Strategic Intitative
                                    </DialogContentText>
                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Objective : </label>
                                    <TextField
                                        id="outlined-select-objective"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Select"
                                        value={objective_id}
                                        onChange={(event) => {
                                            setObjectiveId(event.target.value);
                                        }}
                                        helperText="Please select the objective"
                                    >
                                        {objectives.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.description}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="description"
                                        label="Description"
                                        type="text"
                                        fullWidth
                                        style={{ marginBottom: '15px' }}
                                        value={description}
                                        variant="standard"
                                        onChange={(event) => {
                                            setDescription(event.target.value);
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
                                            helperText="Set due date"
                                            format="yyyy/dd/MM"
                                            fullWidth
                                            value={end_date}
                                            onChange={setEndDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Status : </label>
                                    <TextField
                                        id="outlined-select-status"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Select"
                                        value={status}
                                        onChange={(event) => {
                                            setStatus(event.target.value);
                                        }}
                                        helperText="Please select the status"
                                    >
                                        {statuses.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                                    { showloader === true || isLoading === true ? (
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
                                            <Button color="primary" onClick={(e) => { handleAddClose(); saveTask(e)}}>Save</Button>
                                        )}
                                </DialogActions>
                            </Dialog>

                            <Dialog open={editopen} onClose={handleEditClose}>
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
                                        value={description}
                                        variant="standard"
                                        onChange={(event) => {
                                            setDescription(event.target.value);
                                        }}
                                    />

<                                   MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                            helperText="Set due date"
                                            format="yyyy/dd/MM"
                                            fullWidth
                                            value={end_date}
                                            onChange={setEndDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Status : </label>
                                    <TextField
                                        id="outlined-select-status"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Select"
                                        value={status}
                                        onChange={(event) => {
                                            setStatus(event.target.value);
                                        }}
                                        helperText="Please select the status"
                                    >
                                        {statuses.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                                    <Button color="primary" onClick={(e) => { handleEditClose(); saveEdited(e) }}>Save</Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={deleteopen}
                                onClose={handleDeleteClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure you want to delete this strategic initiative?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please confirm that you want to delete this strategic initiative?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleDeleteClose}>Disagree</Button>
                                    <Button color="primary" onClick={handleDeleteClose} autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
