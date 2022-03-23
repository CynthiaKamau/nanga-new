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
import { getUnassignedTasks } from "actions/tasks";
import moment from "moment";
import styles from "assets/jss/material-dashboard-pro-react/views/assignedTasksStyle.js";
import IconButton from '@material-ui/core/Button';
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import MenuItem from '@material-ui/core/MenuItem';
import { getUserObjectives } from "actions/objectives";
// import Avatar from "../../assets/img/default-avatar.png";
import MaterialTable from 'material-table';

const useStyles = makeStyles(styles);

export default function AllAssignedTasksPage() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth);
    const { unassigned_items, unassigned_items_error } = useSelector(state => state.task);

    console.log("unassigned_items_error", unassigned_items_error)
    console.log("unassigned_items", unassigned_items)

    const [addopen, setAddOpen] = useState(false);
    const [task_id, setTaskId] = useState("");
    const [task, setTask] = useState("");
    const [consent, setConsent] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);
    const [reason, setReason] = useState("");
    const [showloader, setshowloader] = useState(false);

    useEffect(() => {
        dispatch(getUnassignedTasks(currentUser.id))
        dispatch(getUserObjectives(currentUser.id));
    }, []);

    const statuses = [
        {
            id: 'ACCEPT',
            label: 'ACCEPT'
        },
        {
            id: 'REJECT',
            label: 'REJECT'
        }
    ]

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const acceptRejectTask = async (e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

        console.log("task here", task_id, user_id, consent, reason, setUserId )

        let task = {
            task_id: task_id,
            reason: reason,
            consent: consent,
            user_id: user_id,
        }

        console.log("editing task", task)
    
        try {

            let response = await axios.post(`/assignedtasks/acceptRejectTask?task_id=${task_id}&user_id=${user_id}&consent=${consent}&reason=${reason}`, config);

            if (response.data.success === false) {
                setshowloader(false);
                setAddOpen(false)
                let error = response.data.message

                swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                    dangerMode: true
                }).then(() => {
                    setReason("")
                    setConsent("")
                    setTaskId("")
                    dispatch(getUnassignedTasks(user_id))
                });

            } else {

                setshowloader(false);
                setAddOpen(false)
                swal.fire({
                    title: "Success",
                    text: "MAS updated successfully!",
                    icon: "success",
                }).then(() => {
                    setReason("")
                    setConsent("")
                    setTaskId("")
                    dispatch(getUnassignedTasks(user_id))
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
            }).then(() => {
                setReason("")
                setConsent("")
                setTaskId("")
                dispatch(getUnassignedTasks(user_id))
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
            field: 'resource',
            title: 'Resources',
            render: list => {
              return list.assignedTasks.map((detail, index) => {
                  if(detail.assignee.fullnames != null) {
                      return (<p key={index}>{detail.assignee.fullnames}</p>)
                  } else if (detail.assignee.fullnames === null || detail.assignee.fullnames === undefined) {
                    return (<p key={index}>None</p>)                  }
              })
  
            }
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
          title: 'Actions/Reject',
          render: (list) => {
              return (<IconButton aria-label="view" color="error" onClick={() => {handleOpen(); setTask(list.description); setTaskId(list.id); setConsent(""); setReason("");}} ><ControlPoint /></IconButton>)
          }
        }
    ]

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>

                    <Card>
                        <CardHeader color="primary">
                            <h4>All Assigned MAS </h4>
                        </CardHeader>
                        <CardBody>
                            {unassigned_items !== null ? (
                                <MaterialTable
                                title="Assigned MAS details."
                                data={unassigned_items}
                                columns={columns}
                                options={{
                                    search: true,
                                    sorting: true,
                                    pageSize: 10,
                                    pageSizeOptions: [10,50,100 ],
                                }}
                                />
                            ) : (
                                <MaterialTable
                                    title="Assigned MAS details."
                                    data={[]}
                                    columns={columns}
                                    options={{
                                        search: true,
                                        sorting: true,
                                        pageSize: 10,
                                        pageSizeOptions: [10,50,100 ],
                                    }}
                                />
                            )}
                            
                        </CardBody>
                    </Card>

                    <Dialog open={addopen} onClose={handleAddClose}>
                        <DialogTitle>Assigned MAS</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Accept or Reject MAS
                            </DialogContentText>

                            <TextField
                                fullWidth
                                label="MAS Description"
                                id="task"
                                multiline
                                rows={4}
                                disabled
                                variant="outlined"
                                className={classes.textInput}
                                type="text"
                                value={task}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setTask(value)
                                }}
                            />
                          
                            <label> Status : </label>
                            <TextField
                                id="outlined-select-objective"
                                select
                                fullWidth
                                variant="outlined"
                                label="Select"
                                className={classes.textInput}
                                value={consent}
                                onChange={(event) => {
                                    setConsent(event.target.value);
                                }}
                                helperText="Please select one"
                            >
                                {statuses && statuses.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                label="Reason"
                                id="reason"
                                multiline
                                rows={4}
                                variant="outlined"
                                className={classes.textInput}
                                type="text"
                                value={reason}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setReason(value)
                                }}
                            />

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
                                    <Button color="primary" onClick={acceptRejectTask}>Save</Button>
                                )}
                        </DialogActions>
                    </Dialog>

                </GridItem>
            </GridContainer>
        </div>
    );
}
