import React, { useState } from "react";
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

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function TasksPage() {
    const classes = useStyles();

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [deleteopen, setDeleteOpen] = useState(false);
    const [name, setName] = useState("");
    const [teamlead, setTeamLead] = useState("");
    const [duedate, setDueDate] = useState("");

    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const handleDeleteClickOpen = () => {
        setDeleteOpen(true);
    };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const teamleads = [
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
                                        <TableCell>Name</TableCell>
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key=''>
                                        <TableCell>Add more customers</TableCell>
                                        <TableCell>12/12/2021</TableCell>
                                        <TableCell>Ongoing</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon /></IconButton>
                                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                                        </TableCell>

                                    </TableRow>
                                    <TableRow key=''>
                                        <TableCell>Add more customers</TableCell>
                                        <TableCell>12/12/2021</TableCell>
                                        <TableCell>Ongoing</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon /></IconButton>
                                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                                        </TableCell>

                                    </TableRow>
                                    <TableRow key=''>
                                        <TableCell>Add more customers</TableCell>
                                        <TableCell>12/12/2021</TableCell>
                                        <TableCell>Ongoing</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon /></IconButton>
                                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                                        </TableCell>

                                    </TableRow>
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
                                        id="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        style={{ marginBottom: '15px' }}
                                        value={name}
                                        variant="standard"
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                    />

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            helperText="Set due date"
                                            format="yyyy/dd/MM"
                                            fullWidth
                                            value={duedate}
                                            onChange={setDueDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Status : </label>
                                    <TextField
                                        id="outlined-select-teamlead"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Select"
                                        value={teamlead}
                                        onChange={(event) => {
                                            setTeamLead(event.target.value);
                                        }}
                                        helperText="Please select the status"
                                    >
                                        {teamleads.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                                    <Button color="primary" onClick={handleAddClose}>Save</Button>
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
                                        id="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        style={{ marginBottom: '15px' }}
                                        value={name}
                                        variant="standard"
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                    />

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            helperText="Set due date"
                                            format="yyyy/dd/MM"
                                            fullWidth
                                            value={duedate}
                                            onChange={setDueDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Status : </label>
                                    <TextField
                                        id="outlined-select-teamlead"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Select"
                                        value={teamlead}
                                        onChange={(event) => {
                                            setTeamLead(event.target.value);
                                        }}
                                        helperText="Please select the status"
                                    >
                                        {teamleads.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                                    <Button color="primary" onClick={handleEditClose}>Save</Button>
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
