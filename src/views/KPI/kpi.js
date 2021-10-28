import React, { useState } from "react";
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

// const useStyles = makeStyles(styles);

export default function Teams() {
//   const classes = useStyles();

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [deleteopen, setDeleteOpen] = useState(false);
    const [kpi, setKPI] = useState("");
    const [uom, setUnitOfMeasure] = useState("");
    const [target, setTarget] = useState("");
    const [targetAtReview, setTargetAtReview] = useState("");
    const [targetAchieved, setTargetAchieved] = useState("");

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

    const uoms = [
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
                <h4>KPIs</h4>
                <p>
                  KPI details.
                </p>
              </CardHeader>
              <CardBody>
              <div className="pull-right"><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>KPI</TableCell>
                            <TableCell>Unit Of Measure</TableCell>
                            <TableCell>Target</TableCell>
                            <TableCell>Target At Review</TableCell>
                            <TableCell>Achieved</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key=''>
                            <TableCell>Testing KPI</TableCell>
                            <TableCell>%</TableCell>
                            <TableCell>30</TableCell>
                            <TableCell>25</TableCell>
                            <TableCell>24</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                        <TableRow key=''>
                            <TableCell>Testing KPI</TableCell>
                            <TableCell>%</TableCell>
                            <TableCell>30</TableCell>
                            <TableCell>25</TableCell>
                            <TableCell>24</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>

                        </TableRow>
                        <TableRow key=''>
                            <TableCell>Testing KPI</TableCell>
                            <TableCell>%</TableCell>
                            <TableCell>30</TableCell>
                            <TableCell>25</TableCell>
                            <TableCell>24</TableCell>
                            <TableCell>
                            <IconButton aria-label="view" color="error" onClick={handleAddClickOpen} ><ControlPointIcon /></IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={handleEditClickOpen} ><EditIcon/></IconButton>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClickOpen} ><DeleteIcon /></IconButton>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>

                <Dialog open={addopen} onClose={handleAddClose}>
                    <DialogTitle>KPI</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Create New KPI 
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="kpi"
                            label="KPI"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={kpi}
                            variant="standard"
                            onChange = {(event) => {
                                setKPI(event.target.value);
                            }}
                        />

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Unit Of Measure : </label>
                        <TextField
                            id="outlined-select-uom"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={uom}
                            onChange = {(event) => {
                            setUnitOfMeasure(event.target.value);
                            }}
                            helperText="Please select your team lead"
                        >
                            {uoms.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="target"
                            label="Target"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={target}
                            variant="standard"
                            onChange = {(event) => {
                                setTarget(event.target.value);
                            }}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="target_at_review"
                            label="Target At Review"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={targetAtReview}
                            variant="standard"
                            onChange = {(event) => {
                                setTargetAtReview(event.target.value);
                            }}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="target_achieved"
                            label="Target Achieved"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={targetAchieved}
                            variant="standard"
                            onChange = {(event) => {
                                setTargetAchieved(event.target.value);
                            }}
                        />

                    </DialogContent>
                    <DialogActions>
                    <Button color="danger" onClick={handleAddClose}>Cancel</Button>
                    <Button color="success" onClick={handleAddClose}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={editopen} onClose={handleEditClose}>
                    <DialogTitle>KPI</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Edit KPI 
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="kpi"
                            label="KPI"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={kpi}
                            variant="standard"
                            onChange = {(event) => {
                                setKPI(event.target.value);
                            }}
                        />

                        <label style={{ fontWeight: 'bold', color: 'black'}}> Unit Of Measure : </label>
                        <TextField
                            id="outlined-select-uom"
                            select
                            fullWidth
                            variant="outlined"
                            label="Select"
                            value={uom}
                            onChange = {(event) => {
                            setUnitOfMeasure(event.target.value);
                            }}
                            helperText="Please select your team lead"
                        >
                            {uoms.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="target"
                            label="Target"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={target}
                            variant="standard"
                            onChange = {(event) => {
                                setTarget(event.target.value);
                            }}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="target_at_review"
                            label="Target At Review"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={targetAtReview}
                            variant="standard"
                            onChange = {(event) => {
                                setTargetAtReview(event.target.value);
                            }}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="target_achieved"
                            label="Target Achieved"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={targetAchieved}
                            variant="standard"
                            onChange = {(event) => {
                                setTargetAchieved(event.target.value);
                            }}
                        />

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
                        Please confirm that you want to delete this KPI.
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
