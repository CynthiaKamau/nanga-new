import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
import { ExpandLess } from "@material-ui/icons";import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
// import { useHistory } from "react-router";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import JsonData from "../../data/data.json";
import { getUserObjectives } from "actions/objectives";
import { getKpis } from "actions/kpis";
import { getCategories } from "actions/data";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import moment from "moment";
import CardFooter from "components/Card/CardFooter";
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  // const history = useHistory();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.objective);
  // const {  categories } = useSelector(state => state.data);
  const {  items : kpis } = useSelector(state => state.kpi);

  useEffect(() => {
    dispatch(getUserObjectives(currentUser.id));
    dispatch(getCategories());
    dispatch(getKpis());
    setUserId(currentUser.id);
    setCreatedBy(currentUser.id);
  }, [])

  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [kpi_id, setKpi] = useState("");
  const [addopen, setAddOpen] = useState(false);
  const [addopentask, setAddOpenTask] = useState("");
  const [addopenindividualtask, setAddOpenIndividualTask] = useState(false);
  const [editopenmission, setEditMissionOpen] = useState(false);
  const [task_description, setTaskDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [task_start_date, setTaskStartDate] = useState("");
  const [task_end_date, setTaskEndDate] = useState("");
  const [user_id, setUserId] = useState("");
  const [showloader, setshowloader] = useState(false); 
  const [created_by, setCreatedBy] = useState("");
  const [mission, setMission] = useState("");
  const [show_tasks, setShowTasks] = useState(false);
  const [setIndex, setSelectedIndex] = useState("");
  const [err, setError] = useState("");
  const [obj_tasks, setObjTasks] = useState("");
  const [ objectiveId, setObjectiveId] = useState("");

  // const [newuser, setNewUser] = useState(true);

  // const categories = JsonData.Categories;
  // const kpis = JsonData.KPIS;

  console.log("user mission", mission)

  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const saveObjective = async () => {
    // e.preventDefault();
    setshowloader(true);

    let end_date = moment(end_date).format('YYYY-MM-DD');
    let start_date = moment(start_date).format('YYYY-MM-DD');

    console.log("save objective", description, end_date, kpi_id, start_date, target, user_id, created_by);

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    let body = {description, end_date, kpi_id, start_date, target, user_id, created_by};

    try {
      let response = await axios.post('/objectives/create', body, config);
    
        if (response.data.success === false) {
          setshowloader(false);
          swal.fire({
              title: "Error",
              text: "An error occurred, please try again!",
              icon: "error",
              dangerMode: true
          });

          console.log(response)
        } else {
          setshowloader(false);

          console.log("objective id", response.data.data.id)

          let task_end_date = moment(task_end_date).format('YYYY-MM-DD');
          let task_start_date = moment(task_start_date).format('YYYY-MM-DD');

          let task = {
            description: task_description,
            start_date: task_start_date,
            end_date: task_end_date,
            user_id: user_id,
            created_by: created_by,
            objective_id: response.data.data.id
          }

          console.log("task", task)

          let response1 = await axios.post('/tasks/create', task, config);

          if (response1.data.success === false) {
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: "An error occurred, please try again!",
                icon: "error",
                dangerMode: true
            });

          console.log(response1)
          } else {
            console.log("task", response1.data.data)

            swal.fire({
              title: "Success",
              text: "Objective and task added successfully!",
              icon: "success",
              dangerMode: false
          });

          }

        }
    } catch (error) {
      console.log(error);
    }


    // dispatch(addUserObjective(description, end_date, kpi_id, start_date, target, user_id))
    // if (error) {
    //     setshowloader(false);
    //     swal.fire({
    //         title: "Error",
    //         text: error,
    //         icon: "error",
    //         dangerMode: true
    //     });
    // } else if (item) {
    //     location.reload()
    // }

  }

  const handleAddClose = () => {
    setAddOpen(false);
    setAddOpenTask(false);
  };

  const handleAddTaskClose = () => {
    setAddOpenTask(false);
  };

  const handleEditMissionClose = () => {
    setEditMissionOpen(false);
  };

  // const handleRedirect = () => {
  //   history.push('/admin/tasks');
  // }

  const handleAddIndividualTaskOpen = () => {
    setAddOpenIndividualTask(true);
  }

  const handleAddIndividualTaskClose = () => {
      setAddOpenIndividualTask(false);
  }

  const handleEditMissionClickOpen = () => {
    setEditMissionOpen(true);
  };

  const saveIndividualTask = async (e) => {
    e.preventDefault();
    setshowloader(true);

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    let task_end_date = moment(task_end_date).format('YYYY-MM-DD');
    let task_start_date = moment(task_start_date).format('YYYY-MM-DD');

    let task = {
    description: task_description,
    start_date: task_start_date,
    end_date: task_end_date,
    user_id: user_id,
    created_by: created_by,
    objective_id: 17
    }

    console.log("individual task", task)

    let response = await axios.post('/tasks/create', task, config);

    console.log("resp", response)

    if (response.data.success === false) {
        setshowloader(false);
        swal.fire({
            title: "Error",
            text: "An error occurred, please try again!",
            icon: "error",
            dangerMode: true
        });

    } else {

        swal.fire({
            title: "Success",
            text: "Task added successfully!",
            icon: "success",
            dangerMode: false
        });
    }
  }

  const setEditingMission = () => {
    setMission()
  }

  const editMission = () => {

  }

  const setShowObjectivesTask = (id) => {

    setObjectiveId(id);
      console.log("obj id", objectiveId)

      axios.get(`/tasks/fetchTasksbyObjectiveId?objective_id=${id}`)
          .then(response => setObjTasks(response.data))
          .catch(error => setError("No tasks found", console.log(error))
          )

  }

  return (
    <div>

      <GridContainer>

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

        <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.textBold}> PERSONAL MISSION </h3>
          <Card>
            <Grid container justify="flex-end" className={classes.cardGrey}>
              <IconButton aria-label="edit" color="primary" onClick={() => { handleEditMissionClickOpen(); setEditingMission() }} ><EditIcon style={{ color : '#000000'}}/></IconButton>
            </Grid>

            <CardBody className={classes.cardGrey}>
              <h4>
                Provide Exceptional Strategic Support to the Group in order to Profitably Grow our Customer Base off a Solid Foundation.
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
                id="outlined-multiline-static"
                fullWidth
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                className={classes.textInput}
                type="text"
                value={description}
                onChange={(event) => {
                  const value = event.target.value;
                  setDescription(value)
                }}
              />

            <Grid item xs={6} lg={6} xl={6} sm={12}>
              <label> KPI : </label>
              <TextField
                id="outlined-select-kpi"
                select
                fullWidth
                variant="outlined"
                label="Select"
                className={classes.textInput}
                value={kpi_id}
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
            </Grid>

            <Grid item xs={6} lg={6} xl={6} sm={12}>
              <TextField
                autoFocus
                margin="dense"
                id="target"
                label="Target"
                variant="outlined"
                className={classes.textInput}
                type="text"
                fullWidth
                style={{ marginBottom: '15px' }}
                value={target}
                onChange={(event) => {
                  setTarget(event.target.value);
                }}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} lg={6} xl={6} sm={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    helperText="Set start date"
                    format="yyyy/dd/MM"
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
                    format="yyyy/dd/MM"
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
                      color="#00BFFF"
                      height={150}
                      width={150}
                  />
              </div>
              ) :
              (
              <Button color="primary" onClick={() => {handleAddClose();}}>Save</Button>
              )}
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
              multiline
              rows={4}
              variant="outlined"
              disabled
              value={description}
              className={classes.textInput}
            />

            <Grid item xs={6} lg={6} xl={6} sm={12}>
              <TextField
                fullWidth
                label="Description"
                id="taskdescription"
                multiline
                maxRows={4}
                variant="outlined"
                className={classes.textInput}
                type="text"
                value={task_description}
                onChange={(event) => {
                  const value = event.target.value;
                  setTaskDescription(value)
                }}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} lg={6} xl={6} sm={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  helperText="Set start date"
                  format="yyyy/dd/MM"
                  fullWidth
                  inputVariant="outlined"
                  value={task_start_date}
                  onChange={setTaskStartDate}
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
                  format="yyyy/dd/MM"
                  fullWidth
                  inputVariant="outlined"
                  value={task_end_date}
                  onChange={setTaskEndDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleAddTaskClose}>Cancel</Button>
            { showloader === true  ? (
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
                <Button color="primary" onClick={(e) => { handleAddTaskClose(); saveObjective(e); }}>Save</Button>
              )}
          </DialogActions>
        </Dialog>

        <Dialog open={editopenmission} onClose={handleEditMissionClose}>
          <DialogTitle>Personal Mission</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit Personal Mission
            </DialogContentText>

            <TextField
              id="outlined-multiline-static"
              fullWidth
              label="Mission"
              type="text"
              multiline
              variant="outlined"
              rows={4}
              value={mission}
              className={classes.textInput}
              onChange={(event) => {
                setMission(event.target.value);
            }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleEditMissionClose}>Cancel</Button>
            { showloader === true  ? (
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
                <Button color="primary" onClick={(e) => { handleEditMissionClose(); editMission(e); }}>Save</Button>
              )}
          </DialogActions>
        </Dialog>

        <Dialog open={addopenindividualtask} onClose={handleAddIndividualTaskClose}>
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
                    variant="outlined"
                    disabled
                    value={description}
                    className={classes.textInput}
                />
                <TextField
                    fullWidth
                    label="Description"
                    id="task_description"
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={task_description}
                    onChange={(event) => {
                        const value = event.target.value;
                        setTaskDescription(value)
                    }}
                />

                <Grid container spacing={2}>
                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set start date"
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={task_start_date}
                                onChange={setTaskStartDate}
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
                                format="yyyy/dd/MM"
                                fullWidth
                                inputVariant="outlined"
                                value={task_end_date}
                                onChange={setTaskEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button color="danger" onClick={handleAddIndividualTaskClose}>Cancel</Button>
                {showloader === true ? (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={150}
                            width={150}
                        />
                    </div>
                ) : (
                    <Button color="primary" onClick={(e) => { handleAddIndividualTaskClose(); saveIndividualTask(e) }}>Save</Button>
                )}
            </DialogActions>
        </Dialog>

      </GridContainer>

      { items && items.length >= 1 ? (
        
        <div>
          <GridContainer>

            <GridItem container justify="flex-end">
              <Button color="primary" onClick={handleAddClickOpen}> Create New Objective</Button>
            </GridItem>

            {items ? ( items.map((list, index) => (
              <GridItem container justify="flex-end" key={index}  >

                <Card className={classes.cardBodyRed} key={index} style={{ marginBottom: '0'}} >
                  <GridItem xs={12} sm={12} md={12}>
                    <h4 className={classes.textBold}> {list.description} </h4>
                    <h6 className={classes.textGreen}> 6. Management actions</h6>
                  </GridItem>
                  <CardBody className={classes.cardBody}>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyRed}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                      2 <small>Off Ttack</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyPurple}>
                              <CardBody>
                                      <h3 className={classes.cardTitle}>
                                          1 <small>Cancelled</small>
                                      </h3>
                              </CardBody>
                          </Card>
                      </GridItem >
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyYellow}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                      0 <small>Postponed</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyOrange}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                      3 <small>Ongoing</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card  className={classes.cardBodyGreen}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                      1 <small>Completed</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyBlack}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                      0 <small>Not Started</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                  </CardBody>
                  <CardFooter className={classes.cardFooter} >
                    { show_tasks === false ? (
                        <IconButton onClick={() => { setShowTasks(true); setSelectedIndex(index); setShowObjectivesTask(list.id)}} > <ExpandMoreIcon className={classes.iconBottom} /> </IconButton>
                    ) : show_tasks === true ? ( <IconButton> <ExpandLess className={classes.iconBottom} onClick={() => setShowTasks(false)} /> </IconButton> 
                    ) : null}
                  </CardFooter>
                </Card>

                {/* tasks card */}
                { show_tasks === true && setIndex === index ? (
                      
                  <Card style={{ width: "95%", margin: '0', marginLeft: '5%'}} >
                      <CardBody>
                          <h3 className={classes.textBold}>Management Actions </h3>
                          <Table>
                              <TableHead className={classes.tableHeader}>
                                  <TableRow >
                                      <TableCell>Management Action</TableCell>
                                      <TableCell>Resource</TableCell>
                                      <TableCell>Due Date</TableCell>
                                      <TableCell>Status</TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {/* <TableRow key=''>
                                      <TableCell>Task One</TableCell>
                                      <TableCell>John Doe</TableCell>
                                      <TableCell>2021-10-01</TableCell>
                                      <TableCell>Pending</TableCell>
                                  </TableRow> */}
                                  { obj_tasks ? obj_tasks.length === 0 ? (<TableRow> <TableCell> No tasks available </TableCell></TableRow>)
                                  : (obj_tasks.map((list, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{list.description}</TableCell>
                                          <TableCell>{moment(list.start_date).format('YYYY-MM-DD')}</TableCell>
                                          <TableCell>{moment(list.end_date).format('YYYY-MM-DD')}</TableCell>
                                          <TableCell>{list.status}</TableCell>
                                      </TableRow>
                                  ))) : err ? (<TableRow> <TableCell> {err} </TableCell></TableRow>) 
                                  : null }
                              </TableBody>
                          </Table>
                      </CardBody>
                      <CardFooter>
                          <Grid container justify="center">
                              <Button simple onClick={() => {setShowTasks(false); handleAddIndividualTaskOpen() }}><p style={{ color: '#388e3c' }}> Add New Task</p> </Button>
                          </Grid>
                      </CardFooter>
                  </Card>

                ) : null }
            </GridItem>
            ))) : null }
          </GridContainer>
        </div>

      ) : (

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
        
      )}
    </div>
  );
}
