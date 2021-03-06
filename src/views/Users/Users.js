import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useForm, Controller } from 'react-hook-form';
import Select from "react-select";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
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
import { getUsers } from "../../actions/users";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { Grid } from "@material-ui/core";
import { getTeams} from "actions/teams"
import { getRoles, getPillars } from "actions/data";
import MaterialTable from 'material-table';
// import classNames from "classnames";

const useStyles = makeStyles(styles);

export default function UsersPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const methods = useForm();

  const { items } = useSelector(state => state.user);
  const { user : currentUser, token } = useSelector(state => state.auth);
  const { roles } = useSelector(state => state.data);
  const { items : teams} = useSelector(state => state.team);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTeams());
    dispatch(getRoles());
    dispatch(getPillars());
    dispatch(getUsers())
  }, []);


  const [addopen, setAddOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  // const [deleteopen, setDeleteOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [user_id, SetUserId] = useState("");
  const [showloader, setshowloader] = useState(false);
  const [updated_by, setUpdatedBy] = useState(currentUser.id);
  const [created_by, setCreatedBy] = useState(currentUser.id);
  const [email, setEmail] = useState("");
  const [extension, setExtension] = useState("");
  const [view, setView] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [search_user, setSearchUser] = useState("");
  const [search_email, setSearchEmail] = useState("");
  const [showSearchLoading, setShowSearchLoading] = useState("");
  const [setUserError, setShowUserError] = useState("");
  const [line_manager, setLineManager] = useState("");  
  const [myuser, setMyUser] = useState("");
  const [access_level, setAccessLevel] = useState("");
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
        lineManager : line_manager,
        created_by : created_by,
        accessLevel : access_level
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
        }).then(() => {
          setName("")
          setTeam("")
          setRole("")
          setEmail("")
          setLineManager("")
          setAccessLevel("")
          setCreatedBy(currentUser.id)
          dispatch(getUsers())
        });
        
      } else {

          let error = response.data.message
          setshowloader(false);
          swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              dangerMode: true
          }).then(() => {
            setName("")
            setTeam("")
            setRole("")
            setEmail("")
            setLineManager("")
            setAccessLevel("")
            setCreatedBy(currentUser.id)
            dispatch(getUsers())
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
          }).then(() => {
            setName("")
            setTeam("")
            setRole("")
            setEmail("")
            setLineManager("")
            setAccessLevel("")
            setCreatedBy(currentUser.id)
            dispatch(getUsers())
          });
    }

  }

  const handleEditClickOpen = () => {
    setEditOpen(true);

  };

  const setEditing = (list) => {
    console.log("list here", list)
    setName(list.fullnames);
    setTeam(list.teams.id);
    setRole(list.roles.id);
    setStatus(list.status);
    SetUserId(list.id);
    setEmail(list.email);
    setExtension(list.extension);
    setView(list.view)
    setLineManager(list.lineManager);
    setMyUser(list.lineManagerUser);
    setAccessLevel(list.accessLevel);

  }

  const saveEdited =  async (e) => {
    e.preventDefault();
    setshowloader(true);
    setView(true);

    if(status === "Disabled") {
      setDisabled(true);
    } else { setDisabled(false)}

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    const body = JSON.stringify({ 
        id : user_id,
        full_names : name,
        email : email,
        status : status,
        extension: extension,
        // disabled : disabled,
        team_id : team, 
        accessLevel : access_level,
        role_id : role,
        updated_by_id : updated_by,
        lineManager : line_manager,
        view : view,
        
        });
    console.log("user", body, disabled, setUpdatedBy);

        try {

            let response = await axios.post('/users/update', body, config)
              if (response.status == 201) {
                let item = response.data.message
                setEditOpen(false);
                setshowloader(false);
                // dispatch(getUsers());


                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => {
                  setName("")
                  setTeam("")
                  setRole("")
                  setEmail("")
                  setLineManager("")
                  setAccessLevel("")
                  setCreatedBy(currentUser.id)
                  dispatch(getUsers())
                });

            } else {
              let error = response.data.message
              setEditOpen(false);
              setshowloader(false);

              swal.fire({
                  title: "Error",
                  text: error,
                  icon: "error",
                  dangerMode: true
              });
            }
        } catch (error) {
          setEditOpen(false);
          setshowloader(false);

          let err = error.response.data.message
          swal.fire({
              title: "Error",
              text: err,
              icon: "error",
              dangerMode: true
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

      console.log("email", email)

      const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

      try {
        // let response = await axios.post('/searchldap', body, config);

        let response = await axios.get(`fetchUsertoAdd?mail=${email}&accessToken=${token}`, config)
        console.log("hh", response.data.firstname)

        if (response.data.success === false) {
          setShowSearchLoading(false);
          setSearchUser("");
          setSearchEmail("");
          setName("");
          setEmail("");
          setTeam("");
          setRole("");
          setAccessLevel("");
          setEmail("");
          setLineManager("")
          setShowUserError("User not found!");
          
        } else {

          setShowSearchLoading(false);

          if(response.data.accountname === null || response.data.accountname === undefined) {

            setSearchUser("");
            setSearchEmail("");
            setName("");
            setEmail("");
            setTeam("");
            setRole("");
            setAccessLevel("");
            setEmail("");
            setLineManager("")
            setShowUserError("User not found!");

          } else {
            setSearchUser(response.data.firstname + ' ' + response.data.lastname);
            setSearchEmail(response.data.email);
          }

        }
      } catch (error) {
        setShowSearchLoading(false);
        setSearchUser("");
        setSearchEmail("");
        setName("");
        setEmail("");
        setTeam("");
        setRole("");
        setAccessLevel("");
        setEmail("");
        setLineManager("")
        setShowUserError("User not found!");

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

  const columns = [
    {
      field: 'id',
      title: 'ID'
    },
    {
      field: 'fullnames',
      title: 'Name'
    },
    {
      field: 'status',
      title: 'Status'
    },
    {
      field: 'teams.name',
      title: 'Team'
    },
    {
      field: 'roles.role_name',
      title: 'Role'
    },
    {
      field: 'accessLevel',
      title: 'Access Level'
    },
    {
      field: 'lineManagerUser.fullnames',
      title: 'Line Manager'
    },
    {
      field: '',
      title: 'Action',
      render: (list) => {
        if(currentUser.role_id === 0) {
          return ( <div><IconButton aria-label="edit" className={classes.textGreen} onClick={() => { setEditing(list); handleEditClickOpen();}}><EditIcon /></IconButton>
          </div>)
        }
      }
    }
  ]

  const levels = [
    {
      value: 'Level1',
      title: 'Level 1'
    },
    {
      value: 'Level2',
      title: 'Level 2'
    },
    {
      value: 'Level3',
      title: 'Level 3'
    },
  ]

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
        { currentUser.role_id == 0 ? (
          <div style={{ paddingBottom : '60px'}}>
            <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add User </Button> </div>
          </div>
        ) : null} 

          <Card>
            <CardHeader color="primary">
              <h4>Users</h4>
            </CardHeader>
            <CardBody>
              {items.length !== null ? (
                <MaterialTable
                    title="User  details."
                    data={items}
                    columns={columns}
                    options={{
                      search: true,
                      sorting: true,
                      pageSize: 10,
                      pageSizeOptions: [10,50,100 ],
                    }}
                />
              ) : 

                <MaterialTable
                    title="User  details."
                    data={[]}
                    columns={columns}
                    options={{
                      search: true,
                      sorting: true,
                      pageSize: 10,
                      pageSizeOptions: [10,50,100 ],
                    }}
                />
              }  


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
                    label="Enter AD Email"
                    type="text"
                    fullWidth
                    value={email}
                    variant="outlined"
                    onChange={(event) => {
                      setEmail(event.target.value);
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

                      <label> Line Manager : </label>
                      <Controller
                        control={methods.control}
                        className="basic-single"
                        classNamePrefix="select"
                        styles={{ marginTop : '10px', marginBottom : '10px'}}
                        name="line_manager"
                        render={({ value, ref }) => (
                          <Select
                            inputRef={ref}
                            options={items}
                            className="basic-multi-select"
                            menuPortalTarget={document.body} 
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            value={items.find(c => c.id === value)}
                            onChange={val => setLineManager(val.id)}
                            getOptionLabel={items => items.fullnames}
                            getOptionValue={items => items.id}
                          />
                        )}
                      />

                      {/* <TextField
                        id="outlined-select-type"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        value={line_manager}
                        onChange = {(event) => {
                          setLineManager(event.target.value);
                        }}
                        helperText="Please select your line manager"
                      >
                        {items.length >= 1 && items.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.fullnames}
                          </MenuItem>
                        ))}
                      </TextField> */}

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

                    <label style={{ fontWeight: 'bold', color: 'black' }}> Access Level : </label>
                      <TextField
                        id="outlined-select-level"
                        select
                        fullWidth
                        variant="outlined"
                        label="Select"
                        value={access_level}
                        onChange={(event) => {
                          setAccessLevel(event.target.value);
                        }}
                        helperText="Please select your access level"
                      >
                      {levels.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.title}
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
                            color="#29A15B"
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

                  <label> Line Manager : </label>
                  <Controller
                    control={methods.control}
                    className="basic-single"
                    classNamePrefix="select"
                    styles={{ marginTop : '10px', marginBottom : '10px'}}
                    name="line_manager"
                    render={({ value, ref }) => (
                      <Select
                        inputRef={ref}
                        options={items}
                        className="basic-multi-select"
                        menuPortalTarget={document.body} 
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        defaultValue={myuser}
                        value={items.find(c => c.id === value)}
                        onChange={val => setLineManager(val.id)}
                        getOptionLabel={items => items.fullnames}
                        getOptionValue={items => items.id}
                      />
                    )}
                  />

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

                  <label style={{ fontWeight: 'bold', color: 'black' }}> Access Level : </label>
                    <TextField
                      id="outlined-select-level"
                      select
                      fullWidth
                      variant="outlined"
                      label="Select"
                      value={access_level}
                      onChange={(event) => {
                        setAccessLevel(event.target.value);
                      }}
                      helperText="Please select your access level"
                    >
                    {levels.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.title}
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
                        color="#29A15B"
                        height={150}
                        width={150}
                      />
                    </div>
                  ) :
                  (
                    <Button color="primary" onClick={(e) => { saveEdited(e) }}>Save</Button>
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
