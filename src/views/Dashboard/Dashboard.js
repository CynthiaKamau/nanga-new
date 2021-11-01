import React, { useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import IconButton from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import JsonData from "../../data/data.json";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import CardFooter from "components/Card/CardFooter";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState("");
  const [kpi, setKpi] = useState("");
  const [addopen, setAddOpen] = useState(false);
  const [addopentask, setAddOpenTask] = useState("");
  const [taskdescription, setTaskDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [task_start_date, setTaskStartDate] = useState("");
  const [task_end_date, setTaskEndDate] = useState("");
  const [objective, setObjective] = useState("");
  // const [newuser, setNewUser] = useState(true);

  const categories = JsonData.Categories;
  const kpis = JsonData.KPIS;

  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setAddOpenTask(true);
  };

  const handleAddTaskClose = () => {
    setAddOpenTask(false);
  };

  const handleRedirect = () => {
    history.push('/admin/tasks');
  }

  const newuser = false;

  return (
    <div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.textBold}> THE MISSION </h3>
          <Card>
            <CardBody className={classes.cardGrey}>
              <h4>
                Provide Exceptional Strategic Support to the Group in order to Profitably Grow our Customer Base off a Solid Foundation.
              </h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.textBold}> THE VISION</h3>
          <Card>
            <CardBody className={classes.cardGrey}>
              <h4 >
                Build the most valuable financial services business in our industry in Africa by delivering on the 6X more strategy.
              </h4>
            </CardBody>
          </Card>
        </GridItem>

        <Dialog open={addopen} onClose={handleAddClose}>
          <DialogTitle>Strategic Objective</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create New  Strategic Objective
            </DialogContentText>
            <TextField
              fullWidth
              label="Description"
              id="description"
              multiline
              maxRows={4}
              className={classes.textInput}
              type="text"
              value={description}
              onChange={(event) => {
                const value = event.target.value;
                setDescription(value)
              }}
            />

            <label> Category : </label>
            <TextField
              id="outlined-select-category"
              select
              fullWidth
              variant="outlined"
              label="Select"
              className={classes.textInput}
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              helperText="Please select your category"
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.description}
                </MenuItem>
              ))}
            </TextField>

            <label> KPI : </label>
            <TextField
              id="outlined-select-kpi"
              select
              fullWidth
              variant="outlined"
              label="Select"
              className={classes.textInput}
              value={kpi}
              onChange={(event) => {
                setKpi(event.target.value);
              }}
              helperText="Please select your kpi"
            >
              {kpis.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              autoFocus
              margin="dense"
              id="target"
              label="Target"
              className={classes.textInput}
              type="text"
              fullWidth
              style={{ marginBottom: '15px' }}
              value={target}
              variant="standard"
              onChange={(event) => {
                setTarget(event.target.value);
              }}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                helperText="Set start date"
                format="yyyy/dd/MM"
                fullWidth
                value={start_date}
                onChange={setStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                helperText="Set end date"
                format="yyyy/dd/MM"
                fullWidth
                value={end_date}
                onChange={setEndDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>


          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleAddClose}>Cancel</Button>
            <Button color="primary" onClick={handleAddClose}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={addopentask} onClose={handleAddTaskClose}>
          <DialogTitle>Strategic Initiative</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add New Strategic Initiative
            </DialogContentText>

            <TextField
              fullWidth
              label="Objective"
              id="objective"
              type="text"
              disabled
              value={objective}
              className={classes.textInput}
              onChange={(event) => {
                const value = event.target.value;
                setObjective(value)
              }}
            />
            <TextField
              fullWidth
              label="Description"
              id="taskdescription"
              multiline
              maxRows={4}
              className={classes.textInput}
              type="text"
              value={taskdescription}
              onChange={(event) => {
                const value = event.target.value;
                setTaskDescription(value)
              }}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                helperText="Set start date"
                format="yyyy/dd/MM"
                fullWidth
                value={task_start_date}
                onChange={setTaskStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                helperText="Set end date"
                format="yyyy/dd/MM"
                fullWidth
                value={task_end_date}
                onChange={setTaskEndDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleAddTaskClose}>Cancel</Button>
            <Button color="primary" onClick={handleAddTaskClose}>Save</Button>
          </DialogActions>
        </Dialog>

      </GridContainer>

      {newuser ? (
        <div>

          <GridContainer>

            <Card style={{ textAlign: 'center' }}>
              <GridItem >
                <h2> You have not set any main effort Strategic Objectives </h2>
                <IconButton> <AddCircleOutlineIcon className={classes.iconAdd} onClick={handleAddClickOpen} /> </IconButton>
                <h4>Click here to start</h4>
              </GridItem>
            </Card>

          </GridContainer>

        </div>

      ) : (

        <div>
          <GridContainer>

            <Grid container justify="flex-end">
              <Button color="primary" onClick={handleAddClickOpen}> Create New Objective</Button>
            </Grid>

            <Card className={classes.cardBodyRed} >
              <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.textBold}> 1. Grow Topline Growth </h4>
                <h6 className={classes.textGreen}> 6. Management actions</h6>
              </GridItem>
              <CardBody className={classes.cardBody}>
                <GridItem xs={12} sm={6} md={2}>
                  <Card>
                    <CardBody className={classes.cardBodyRed} >
                      <h3 className={classes.cardTitle}>
                        2 <small>Off Ttack</small>
                      </h3>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                  <Card>
                    <CardBody className={classes.cardBodyRed}>
                      <h3 className={classes.cardTitle}>
                        1 <small>Cancelled</small>
                      </h3>
                    </CardBody>
                  </Card>
                </GridItem >
                <GridItem xs={12} sm={6} md={2}>
                  <Card className={classes.cardBodyRed}>
                    <CardBody>
                      <h3 className={classes.cardTitle}>
                        0 <small>Postponed</small>
                      </h3>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                  <Card className={classes.cardBodyGreen}>
                    <CardBody>
                      <h3 className={classes.cardTitle}>
                        3 <small>Ongoing</small>
                      </h3>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                  <Card>
                    <CardBody className={classes.cardBodyGreen}>
                      <h3 className={classes.cardTitle}>
                        1 <small>Completed</small>
                      </h3>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                  <Card className={classes.cardBodyGreen}>
                    <CardBody>
                      <h3 className={classes.cardTitle}>
                        0 <small>Not Started</small>
                      </h3>
                    </CardBody>
                  </Card>
                </GridItem>
              </CardBody>
              <CardFooter className={classes.cardFooter} >
                <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()} /> </IconButton>
              </CardFooter>
            </Card>
          </GridContainer>
        </div>

      )}
    </div>
  );
}
