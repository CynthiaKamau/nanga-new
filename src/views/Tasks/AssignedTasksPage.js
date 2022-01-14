import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ControlPoint } from "@material-ui/icons";
import { getAssignedTasks } from "actions/tasks";
import moment from "moment";
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
// import Avatar from "../../assets/img/default-avatar.png";
import MaterialTable from 'material-table';

const useStyles = makeStyles(styles);

export default function AssignedTasksPage() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth);
    const { items } = useSelector(state => state.task);
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
        user_id: user_id,
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
                }).then(() => {
                    setStartDate("")
                    setEndDate("")
                    setDescription("")
                    setObjectiveId("")
                    dispatch(getAssignedTasks(user_id))
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

    const columns = [
        {
          field: 'description',
          title: 'Management Actions'
        },
        {
            field: 'assignedTasks[0].assigner.fullnames',
            title: 'From'
        },
        {
          field: 'assignee.fullnames',
          title: 'Resources'
        },
        {
          field: 'duedate',
          title: 'Due Date',
          render: list => {
              return (moment(list.end_date).format('YYYY-MM-DD'))
          }
        },
        {
          field: 'status',
          title: 'Status'
        },
        {
          field: '',
          title: 'Actions',
          render: (list) => {
              return (<IconButton aria-label="view" color="error" onClick={() => {handleOpen(); setObjectiveId(list.objective_id); setDescription(list.description)}} ><ControlPoint /></IconButton>)
          }
        }
    ]

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>

                    <Card>
                        <CardHeader color="primary">
                            <h4>Assigned MAS </h4>
                        </CardHeader>
                        <CardBody>

                            <MaterialTable
                                title="Assigned MAS details."
                                data={items}
                                columns={columns}
                                options={{
                                    search: true,
                                    sorting: true,
                                    pageSize: 10,
                                    pageSizeOptions: [10,50,100 ],
                                }}
                                />

                        </CardBody>
                    </Card>

                    <Dialog open={addopen} onClose={handleAddClose}>
                        <DialogTitle>Strategic Objective</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add MAS To Your Strategic Objectives
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
                                        format="yyyy/MM/dd"
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
                                        format="yyyy/MM/dd"
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
                                        color="#29A15B"
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
