import React, { useState, useEffect } from "react";
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
import { ArrowForward } from "@material-ui/icons";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";

import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import avatar from "assets/img/faces/marc.jpg";
import { useHistory } from "react-router";
import { getAssignedTasks, addAssignedTask } from "actions/tasks";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";

import styles from "assets/jss/material-dashboard-pro-react/views/assignedTasksStyle.js";
import { editTask } from "actions/tasks";

const useStyles = makeStyles(styles);

export default function AssignedTasksPage() {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth);
    const { items, item , error, isLoading } = useSelector(state => state.task);

    console.log("at", items)

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [deleteopen, setDeleteOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [end_date, setEndDate] = useState("");
    const [start_date, setStartDate] = useState("");
    const [objective_id, setObjectiveId] = useState("");
    const [user_id, setUserId] = useState("");
    const [status, setStatus] = useState("");
    const [showloader, setshowloader] = useState(false); 

    useEffect(() => {
        dispatch(getAssignedTasks(currentUser.id))
    }, []);


    const handleClickOpen = () => {
        setAddOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const saveTask = e => {
        e.preventDefault();
        setshowloader(true);
        setObjectiveId();
        setUserId(currentUser.id);

        console.log("save values", description, end_date, start_date, objective_id, user_id)
    
        dispatch(addAssignedTask( description, end_date, start_date, objective_id, user_id ))
        if (error) {
          setshowloader(false);
          swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              dangerMode: true
          });
        } else if(item) {
            location.reload()
        }
    
    }

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleOpen = e => {
        e.preventDefault();

        history.push(`/admin/dashboard`);
    }

    const statuses = [
        {
            value: '1',
            label: 'Not Started',
        },
        {
            value: '2',
            label: 'Started',
        },
        {
            value: '3',
            label: 'Ongoing',
        }
    ]

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
                            {/* <div className="pull-right"><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add Task </Button> </div> */}

                            <Table className={classes.tableBorder}>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell>Management Actions</TableCell>
                                        <TableCell>Description </TableCell>
                                        <TableCell>Assigned By</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Progress</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items ? ( items.map((list, index) => (
                                        <TableRow key={index}>
                                                <TableCell>Add more customers</TableCell>
                                                <TableCell>{list.description}</TableCell>
                                                <TableCell onClick={handleClickOpen} > <img src={avatar} alt="..." style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: '160px', marginTop: '35px' }} />  </TableCell>
                                                <TableCell>{list.start_date}</TableCell>
                                                <TableCell>{list.end_date}</TableCell>
                                                <TableCell>
                                                    <CustomLinearProgress
                                                        variant="determinate"
                                                        color="primary"
                                                        value={30}
                                                    />
                                                </TableCell>
                                                <TableCell onClick={handleOpen} > <ArrowForward /> </TableCell>
                                            </TableRow>
                                    ))) : error ? (<TableRow> <TableCell> {error} </TableCell></TableRow> ) : null }
                                </TableBody>    
                            </Table>

                            <Dialog open={addopen} onClose={handleAddClose}>
                                <DialogTitle>Strategic Intitative</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Create New Strategic Intitative
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
                                    { isLoading === true || showloader === true  ? (
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
                                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
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
                                        <Button color="primary" onClick={(e) => { handleEditClose(); editTask(e)}}>Save</Button>
                                    )}
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
