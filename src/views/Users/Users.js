import React from "react";
// @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
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

// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
// import classNames from "classnames";

// const useStyles = makeStyles(styles);

export default function UsersPage() {
//   const classes = useStyles();

    const [addopen, setAddOpen] = React.useState(false);
    const [editopen, setEditOpen] = React.useState(false);
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [team, setTeam] = React.useState("");
    const [role, setRole] = React.useState("");

    const teams = [
        {
          value: 'finance',
          label: 'Finance',
        },
        {
          value: 'sales',
          label: 'Sales',
        },
        {
          value: 'marketing',
          label: 'Marketing',
        },
        {
          value: 'it',
          label: 'IT',
        }
    ]

    const roles = [
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'teamlead',
          label: 'Team Lead',
        },
        {
          value: 'user',
          label: 'System User',
        }
    ]

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
              <div className="pull-right"><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add User </Button> </div>

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
                        <TableRow key=''>
                            <TableCell>1</TableCell>
                            <TableCell>Jane Doe</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Marketing</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>

                        </TableRow>
                        <TableRow key=''>
                        <TableCell>2</TableCell>
                            <TableCell>Ann Kaggle</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Sales</TableCell>
                            <TableCell>Team Lead</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>

                        </TableRow>
                        <TableRow key=''>
                        <TableCell>3</TableCell>
                            <TableCell>Martin Muthui</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>ICT</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>

                        </TableRow>

                        <TableRow key=''>
                        <TableCell>4</TableCell>
                            <TableCell>Leon Hunter</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Sales</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>

                        </TableRow>

                        <TableRow key=''>
                        <TableCell>5</TableCell>
                            <TableCell>Sam Smith</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Marketing</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>

                        </TableRow>
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
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                    <Button color="success" onClick={handleAddClose}>Save</Button>
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
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                    <Button color="success" onClick={handleEditClose}>Save</Button>
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
                    <Button color="success" onClick={handleDeleteClose} autoFocus>
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
