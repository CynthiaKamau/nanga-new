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
import JsonData from "../../data/data.json";
import { getUsers, editUser } from "../../actions/users";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { Grid } from "@material-ui/core";
// import classNames from "classnames";

const useStyles = makeStyles(styles);

export default function UsersPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { items , item, error } = useSelector(state => state.user);
  const { user : currentUser } = useSelector(state => state.auth);

  console.log("here error", error)
  console.log("here item", item)

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const teams = JsonData.Teams;
  const roles = JsonData.Roles;

  const [addopen, setAddOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  // const [deleteopen, setDeleteOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [user_id, SetUserId] = useState("");
  const [showloader, setshowloader] = useState(false);
  const [updated_by, setUpdated_by] = useState(currentUser.id);
  const [created_by, setCreatedBy] = useState(currentUser.id);
  const [email, setEmail] = useState("");
  const [extension, setExtension] = useState("");
  const [view, setView] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [search_user, setSearchUser] = useState("");
  const [search_email, setSearchEmail] = useState("");
  const [showSearchLoading, setShowSearchLoading] = useState("");
  const [setUserError, setShowUserError] = useState("");
  
  // const [selectedUser, setSelectedUser] = useState("");

  // const statuses = JsonData.Status;

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

  const saveUser = async (e) => {
    e.preventDefault();
    setshowloader(true);

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
    const body = JSON.stringify({
        full_name : search_user ,
        team : team,
        role : role,
        email : search_email,
        extension : 0,
        view : true,
        created_by : created_by
    });

    console.log("save user", search_user,status, created_by, team, role, search_email, setCreatedBy )

    try {

      let response = await axios.post('/users', body, config)
      if (response.status == 201) {
        let item = response.data.message
        setshowloader(false);
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

    setName(list.fullnames);
    setTeam(list.teams.id);
    setRole(list.roles.id);
    setStatus(list.status);
    SetUserId(list.id);
    setEmail(list.email);
    setExtension(list.extension);
    setView(list.view)

  }

  const saveEdited = e => {
    e.preventDefault();
    setshowloader(true);
    setView(true);

    if(status === "Disabled") {
      setDisabled(true);
    } else { setDisabled(false)}
    console.log("edit user", user_id, name, status, team, role, updated_by, setUpdated_by, view, extension, email, disabled)

    dispatch(editUser(user_id, name, status, team, role, updated_by, view, extension, email, disabled))
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

  // const handleDeleteClickOpen = () => {
  //   setDeleteOpen(true);
  // };

  // const setDelete = (list) => {
  //   // setSelectedUser(list);
  //   console.log(list)
  // }

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSearchUser = async (e) => {
    if (e.key === "Enter") {

      setShowSearchLoading(true)

      console.log("name", name)

      const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
      let body = JSON.stringify({ username : name});

      try {
        let response = await axios.post('/searchldap', body, config);

        if (response.data.success === false) {
          setShowSearchLoading(false);
          setShowUserError("User not found!")
        } else {

          setShowSearchLoading(false);

          if(response.data.accountname === null) {

            setSearchUser(false)
            setShowUserError("User not found!");

          } else {
            setSearchUser(response.data.firstname + ' ' + response.data.lastname);
            setSearchEmail(response.data.email);
          }

        }
      } catch (error) {
        setShowSearchLoading(false);
          swal.fire({
              title: "Error",
              text: "User not found!",
              icon: "error",
              dangerMode: true
          });
          console.log(error.message)
      }
    }
  }



  // const handleDeleteClose = () => {
  //   setDeleteOpen(false);
  // };

  // const handleDelete = (user) => {
  //   setDeleteOpen(false);

  //   console.log(user);
  // };


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
              { currentUser.role_id === 0 ? (<div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add User </Button> </div> ) : null }

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>Role</TableCell>
                    { currentUser.role_id=== 0 ? (<TableCell>Action</TableCell> ) : null}
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
                      { currentUser.role_id=== 0 ? ( <TableCell>
                        <IconButton aria-label="edit" color="primary" onClick={() => { handleEditClickOpen(); setEditing(list) }} ><EditIcon /></IconButton>
                        {/* <IconButton aria-label="delete" color="secondary" onClick={() => { handleDeleteClickOpen(); setDelete(list) }} ><DeleteIcon /></IconButton> */}
                      </TableCell> ) : null }
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
                    label="Enter AD Username"
                    type="text"
                    fullWidth
                    value={name}
                    variant="outlined"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    onKeyDown={(e) => {handleSearchUser(e)}}
                  />

                  {showSearchLoading ? (
                    <Grid container justify="flex-center"> <CircularProgress /> </Grid>
                  ) : null}

                  { search_user ? (
                    <div>

                      <label style={{ fontWeight: 'bold', color: 'black' }}> Names : </label>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={search_user}
                        variant="outlined"
                      />  

                      <label style={{ fontWeight: 'bold', color: 'black' }}> Email : </label>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="text"
                        fullWidth
                        value={search_email}
                        variant="outlined"
                      />  

                      <label style={{ fontWeight: 'bold', color: 'black' }}> Role : </label>
                      <TextField
                        id="outlined-select-role"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        value={role}
                        onChange={(event) => {
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

                      <label style={{ fontWeight: 'bold', color: 'black' }}> Team : </label>
                      <TextField
                        id="outlined-select-team"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        value={team}
                        onChange={(event) => {
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
                      helperText="Please select your status"
                    >
                      {statuses.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                  </div>
                  ) 
                  : search_user === false ? (<h6 style={{ color : 'red'}}> {setUserError} </h6>
                    ): null}
                  
                </DialogContent>
                <DialogActions>

                  { search_user ? (
                    <div>
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
                      <Button color="primary" onClick={(e) => { handleAddClose(); saveUser(e) }}>Save</Button>
                    )}
 
                    </div>
                  ) : null}

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
                    variant="outlined"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />

                  <label style={{ fontWeight: 'bold', color: 'black' }}> Role : </label>
                  <TextField
                    id="outlined-select-role"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={role}
                    onChange={(event) => {
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

                  <label style={{ fontWeight: 'bold', color: 'black' }}> Team : </label>
                  <TextField
                    id="outlined-select-team"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={team}
                    onChange={(event) => {
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
                    <Button color="primary" onClick={(e) => { handleEditClose(); saveEdited(e) }}>Save</Button>
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
                  {"Are you sure you want to delete the user?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Please confirm that you want to delete this user.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button color="danger" onClick={handleDeleteClose}>Disagree</Button>
                  <Button color="primary" onClick={handleDelete} autoFocus>
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
