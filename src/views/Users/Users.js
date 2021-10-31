import React, { useState} from "react";
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
import JsonData from "../../data/data.json";
import { editUser } from "../../actions/users";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";


import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
// import classNames from "classnames";

const useStyles = makeStyles(styles);

export default function UsersPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { item } = useSelector(state => state.user)
  const { error } = useSelector(state => state.user);

  const [addopen, setAddOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [deleteopen, setDeleteOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [showloader, setshowloader] = useState(false);  

  // const [selectedUser, setSelectedUser] = useState("");

  const items = JsonData.Users;
  const teams = JsonData.Teams;
  const roles = JsonData.Roles;
  // const statuses = JsonData.Status;

  console.log(items);

  // const teams = [
  //     {
  //       value: 'finance',
  //       label: 'Finance',
  //     },
  //     {
  //       value: 'sales',
  //       label: 'Sales',
  //     },
  //     {
  //       value: 'marketing',
  //       label: 'Marketing',
  //     },
  //     {
  //       value: 'it',
  //       label: 'IT',
  //     }
  // ]

  // const roles = [
  //     {
  //       value: 'admin',
  //       label: 'Admin',
  //     },
  //     {
  //       value: 'teamlead',
  //       label: 'Team Lead',
  //     },
  //     {
  //       value: 'user',
  //       label: 'System User',
  //     }
  // ]

    const statuses = [
        {
          value: 'active',
          label: 'Active',
        },
        {
          value: 'disabled',
          label: 'Disabled',
        },
        {
          value: 'pending',
          label: 'Pending',
        }
    ]

  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleEditClickOpen = () => {
    setEditOpen(true);

  };

  const setEditing = (list) => {

    console.log(list)

    setName(list.fullnames);      
    setTeam(list.teams.id);
    setRole(list.roles.id);
    setStatus(list.status);

  }

  const saveEdited = e => {
    e.preventDefault();
    setshowloader(true);

    dispatch(editUser())
    if (!item && error) {
      setshowloader(false);
      swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          dangerMode: true
      });
  } else {
      window.reload()
  }

  }

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const setDelete = (list) => {
    // setSelectedUser(list);
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

  const handleDelete = (user) => {
    setDeleteOpen(false);

    console.log(user);
  };


  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Users</h4>
                <p>
                  User details.
                </p>
              </CardHeader>
              <CardBody>
              <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add User </Button> </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {items && items.map((list, index) => (
                        <TableRow key={index}>
                          <TableCell>{list.id}</TableCell>
                          <TableCell>{list.fullnames}</TableCell>
                          <TableCell>{list.status}</TableCell>
                          <TableCell>{list.teams.name}</TableCell>
                          <TableCell>{list.roles.role_name}</TableCell>
                          <TableCell>
                          <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                          <IconButton aria-label="edit" color="primary" onClick={() => { handleEditClickOpen(); setEditing(list)}} ><EditIcon/></IconButton>
                          <IconButton aria-label="delete" color="secondary" onClick={() => { handleDeleteClickOpen(); setDelete(list)}} ><DeleteIcon /></IconButton>
                          </TableCell>
                        </TableRow>

                      ))}
                        
                    </TableBody>
                </Table>

                <Dialog open={addopen} onClose={handleAddClose}>
                    <DialogTitle>User</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Register A New User 
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            variant="standard"
                            onChange = {(event) => {
                                setName(event.target.value);
                            }}
                        />

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Role : </label>
                        <TextField
                            id="outlined-select-role"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={role}
                            onChange = {(event) => {
                            setRole(event.target.value);
                            }}
                            helperText="Please select your role"
                        >
                            {roles.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.role_name}
                            </MenuItem>
                            ))}
                        </TextField>

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Team : </label>
                        <TextField
                            id="outlined-select-team"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={team}
                            onChange = {(event) => {
                            setTeam(event.target.value);
                            }}
                            helperText="Please select your team"
                        >
                            {teams.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.team_name}
                            </MenuItem>
                            ))}
                        </TextField>

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Status : </label>
                        <TextField
                            id="outlined-select-status"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={status}
                            onChange = {(event) => {
                            setStatus(event.target.value);
                            }}
                            helperText="Please select your status"
                        >
                            {statuses.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                    <Button color="success" onClick={() => { handleAddClose(); saveEdited()}}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={editopen} onClose={handleEditClose}>
                    <DialogTitle>User</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Edit User Details
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            variant="standard"
                            onChange = {(event) => {
                                setName(event.target.value);
                            }}
                        />

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Role : </label>
                        <TextField
                            id="outlined-select-role"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={role}
                            onChange = {(event) => {
                            setRole(event.target.value);
                            }}
                            helperText="Please select your role"
                        >
                            {roles.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.role_name}
                            </MenuItem>
                            ))}
                        </TextField>

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Team : </label>
                        <TextField
                            id="outlined-select-team"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={team}
                            onChange = {(event) => {
                            setTeam(event.target.value);
                            }}
                            helperText="Please select your team"
                        >
                            {teams.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.team_name}
                            </MenuItem>
                            ))}
                        </TextField>

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Status : </label>
                        <TextField
                            id="outlined-select-status"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={status}
                            onChange = {(event) => {
                            setStatus(event.target.value);
                            }}
                            helperText="Please select your status"
                        >
                            {statuses.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                    { showloader === true ? (
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
                        <Button color="success" onClick={handleEditClose}>Save</Button>
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
                    {"Are you sure you want to delete the user?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm that you want to delete this user.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button color="danger" onClick={handleDeleteClose}>Disagree</Button>
                    <Button color="success" onClick={handleDelete} autoFocus>
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
