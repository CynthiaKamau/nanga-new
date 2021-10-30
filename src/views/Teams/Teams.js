import React, {useState} from "react";
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


import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function TeamsPage() {
    const classes = useStyles();

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [deleteopen, setDeleteOpen] = useState(false);
    const [name, setName] = useState("");
    const [teamlead, setTeamLead] = useState("");

    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {
        console.log("here", list)
        setName(list.team_name);
        setTeamLead(list.team_lead)
    }

    const setDelete = (list) => {
        console.log(list)
    }

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

    const items = JsonData.Teams;

    const teamleads = [
        {
          value: '1',
          label: 'John Doe',
        },
        {
          value: '2',
          label: 'Ann Claire',
        },
        {
          value: '3',
          label: 'Patrick Newton',
        }
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
              <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add Team </Button> </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Team Lead</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items && items.map((list, index) => (
                        <TableRow key={index}>
                            <TableCell>{list.team_name}</TableCell>
                            <TableCell>{list.team_lead}</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={(list) => { handleEditClickOpen(); setEditing(list)}} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={(list) => { handleDeleteClickOpen(); setDelete(list)}} ><DeleteIcon /></IconButton>
                            </TableCell>

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
                            style={{marginBottom : '15px'}}
                            value={name}
                            variant="standard"
                            onChange = {(event) => {
                                setName(event.target.value);
                            }}
                        />

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Team Lead : </label>
                        <TextField
                            id="outlined-select-teamlead"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={teamlead}
                            onChange = {(event) => {
                            setTeamLead(event.target.value);
                            }}
                            helperText="Please select your team lead"
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
                    <Button color="success" onClick={handleAddClose}>Save</Button>
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
                            style={{marginBottom : '15px'}}
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

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Team Lead : </label>
                        <TextField
                            id="outlined-select-teamlead"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={teamlead}
                            onChange = {(event) => {
                            setTeamLead(event.target.value);
                            }}
                            helperText="Please select your team lead"
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
                    {"Are you sure you want to delete the team?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm that you want to delete this team.
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
