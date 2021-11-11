import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
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
// import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { getTeams, editTeam } from "../../actions/teams"
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import axios from "axios";
import { getUsers } from "actions/users";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function TeamsPage() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { item ,error, items } = useSelector(state => state.team);
    const { user : currentUser } = useSelector(state => state.auth);
    const { items : teamleads} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getTeams());
        dispatch(getUsers())
      }, []);

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    // const [deleteopen, setDeleteOpen] = useState(false);
    const [name, setName] = useState("");
    const [teamlead, setTeamLead] = useState("");
    const [isparent, setIsParent] = useState(true);
    const [parentId, setParentId] = useState("");
    const [id, setId] = useState("");
    const [showloader, setshowloader] = useState(false);
    const [updated_by, setUpdated_by] = useState(currentUser.id);
    const [created_by, setCreatedBy] = useState(currentUser.id);


    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const saveTeam = async (e) => {
        e.preventDefault();
        setshowloader(true);
        console.log(setCreatedBy)
        
        const config = { headers: { 'Content-Type': 'application/json' } }
    
        const body = JSON.stringify({
            name : name, 
            teamlead : teamlead,
            is_parent : isparent,
            parent_team : parentId,
            created_by : created_by
        });
        console.log("team", body);

        try {

            let response = await axios.post('/teams', body, config)
            if (response.status == 201) {
                setshowloader(false);
                let item = response.data.message
                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                });
            } else {
                let error = response.data.message
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

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {
        console.log("here", list)
        setName(list.team_name);
        setTeamLead(list.team_lead_id)
        setIsParent(list.is_parent)
        setParentId(list.parent_team_id)
        setId(list.id)
    }

    const saveEdited = e => {
        e.preventDefault();
        setshowloader(true);
    
        console.log("save user", id, name, teamlead, isparent, parentId,updated_by, setUpdated_by )
    
        dispatch(editTeam(id, name, teamlead, isparent, parentId, updated_by))
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
                text: item,
                icon: "success",
            });
        }
    }

    // const setDelete = (list) => {
    //     console.log(list)
    // }

    // const handleDeleteClickOpen = () => {
    //     setDeleteOpen(true);
    // };

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    // const handleDeleteClose = () => {
    //     setDeleteOpen(false);
    // };

    const options = [
        {
            value: true,
            label: 'Parent Team',
        },
        {
            value: false,
            label: 'Child Team',
        },
    ]

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4>Teams</h4>
                            <p>
                                Team details.
                            </p>
                        </CardHeader>
                        <CardBody>
                        { currentUser.role_id === 0 ? (<div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add Team </Button> </div> ) : null}

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Team Lead</TableCell>
                                        { currentUser.role_id === 0 ? (<TableCell>Action</TableCell> ) : null}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items && items.map((list, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{list.team_name}</TableCell>
                                            <TableCell>{list.team_lead}</TableCell>
                                            { currentUser.role_id === 0 ? ( <TableCell>
                                                <IconButton aria-label="edit" color="primary" onClick={() => { handleEditClickOpen(); setEditing(list) }} ><EditIcon /></IconButton>
                                                {/* <IconButton aria-label="delete" color="secondary" onClick={() => { handleDeleteClickOpen(); setDelete(list) }} ><DeleteIcon /></IconButton> */}
                                            </TableCell> ) : null }

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Dialog open={addopen} onClose={handleAddClose} >
                                <DialogTitle>Team</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Create New Team
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        style={{ marginBottom: '15px' }}
                                        value={name}
                                        variant="outlined"
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                    />

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Team Lead : </label>
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
                                        helperText="Please select your team lead"
                                    >
                                        {teamleads.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.fullnames}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Team Level : </label>
                                    <TextField
                                        id="outlined-select-isparent"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Select"
                                        value={isparent}
                                        onChange={(event) => {
                                            setIsParent(event.target.value);
                                        }}
                                        helperText="Please select if the team is a parent"
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    {isparent === false ? (
                                        <div>
                                            <label style={{ fontWeight: 'bold', color: 'black' }}> Parent Team : </label>
                                            <TextField
                                                id="outlined-select-isparent"
                                                select
                                                fullWidth
                                                variant="outlined"
                                                label="Select"
                                                value={parentId}
                                                onChange={(event) => {
                                                    setParentId(event.target.value);
                                                }}
                                                helperText="Please select parent team "
                                            >
                                                {items.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.team_name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                    ) : null}

                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                                    {showloader === true ? (
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
                                        <Button color="primary" onClick={(e) => {handleAddClose(); saveTeam(e)}}>Save</Button>
                                    )}
                                </DialogActions>
                            </Dialog>

                            <Dialog open={editopen} onClose={handleEditClose}>
                                <DialogTitle>Team</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Edit Team Details
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        style={{ marginBottom: '15px' }}
                                        id="name"
                                        label="Name"
                                        type="text"
                                        fullWidth
                                        value={name}
                                        variant="outlined"
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                    />

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Team Lead : </label>
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
                                        helperText="Please select your team lead"
                                    >
                                        {teamleads.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.fullnames}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <label style={{ fontWeight: 'bold', color: 'black' }}> Team Level : </label>
                                    <TextField
                                        id="outlined-select-isparent"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Select"
                                        value={isparent}
                                        onChange={(event) => {
                                            setIsParent(event.target.value);
                                        }}
                                        helperText="Please select if the team is a parent"
                                    >
                                        {options.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    {isparent === false ? (
                                        <div>
                                            <label style={{ fontWeight: 'bold', color: 'black' }}> Parent Team : </label>
                                            <TextField
                                                id="outlined-select-isparent"
                                                select
                                                fullWidth
                                                variant="outlined"
                                                label="Select"
                                                value={parentId}
                                                onChange={(event) => {
                                                    setParentId(event.target.value);
                                                }}
                                                helperText="Please select parent team "
                                            >
                                                {items.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.team_name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                    ) : null}

                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                                    {showloader === true ? (
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
                                        <Button color="primary" onClick={(e) => {handleEditClose(); saveEdited(e)}}>Save</Button>
                                    )}
                                </DialogActions>
                            </Dialog>

                            {/* <Dialog
                                open={deleteopen}
                                onClose={handleDeleteClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure you want to delete the team?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please confirm that you want to delete this team.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color="danger" onClick={handleDeleteClose}>Disagree</Button>
                                    <Button color="primary" onClick={handleDeleteClose} autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog> */}

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
