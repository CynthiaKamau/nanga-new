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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpandLess } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { Backup } from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import { getUserObjectives } from "actions/objectives";
import { getKpis } from "actions/kpis";
import { getCategories } from "actions/data";
// import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import moment from "moment";
import CardFooter from "components/Card/CardFooter";
// import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getMission, getVision } from "actions/data";

const useStyles = makeStyles(styles);

export default function UserDashboard() {
  const classes = useStyles();
  // const history = useHistory();

  const dispatch = useDispatch();

  const { items } = useSelector(state => state.objective);
  const {  mission, vision } = useSelector(state => state.data);

  // const {  categories } = useSelector(state => state.data);

  const str = window.location.pathname;
  const chars = str.slice(25, 1000);


  useEffect(() => {

    if(chars) {
        dispatch(getUserObjectives(chars));
        dispatch(getCategories());
        dispatch(getKpis());
        dispatch(getMission(chars));
        dispatch(getVision());
    }
    
  }, [chars])

  const [editopenmission, setEditMissionOpen] = useState(false);
  const [showloader, setshowloader] = useState(false); 
  const [show_tasks, setShowTasks] = useState(false);
  const [setIndex, setSelectedIndex] = useState("");
  const [err, setError] = useState("");
  const [obj_tasks, setObjTasks] = useState("");
  const [ objectiveId, setObjectiveId] = useState("");
  const [usermission, setUserMission] = useState("");


  // const [newuser, setNewUser] = useState(true);

  // const categories = JsonData.Categories;
  // const kpis = JsonData.KPIS;

  console.log("user mission", mission)

  const handleEditMissionClose = () => {
    setEditMissionOpen(false);
    setEditingMission
  };

  // const handleRedirect = () => {
  //   history.push('/admin/tasks');
  // }

  // const handleEditMissionClickOpen = () => {
  //   setEditMissionOpen(true);
  // };

  const setEditingMission = () => {
    setUserMission();
  }

  const editMission = () => {

    setshowloader();
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
              {vision === undefined || vision === null || vision.length === 0 ? (
                <h4> </h4>
              ) : vision ? (
                <h4 > {vision[0].description}</h4>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.textBold}> MISSION </h3>
          <Card>
            <Grid container justify="flex-end" className={classes.cardGrey}>
              {/* <IconButton aria-label="edit" color="primary" onClick={() => { handleEditMissionClickOpen(); setEditingMission() }} ><EditIcon style={{ color : '#000000'}}/></IconButton> */}
            </Grid>

            <CardBody className={classes.cardGrey}>
              { mission === undefined || mission === null || mission.length === 0 ? (
                <h4>Please update the mission</h4>
              ) : mission ? (
                <h4>{mission[0].description}</h4>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>

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
              value={usermission}
              className={classes.textInput}
              onChange={(event) => {
                setUserMission(event.target.value);
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

      </GridContainer>

      { items && items.length >= 1 ? (
        
        <div>
          <GridContainer>

            {items ? ( items.map((list, index) => (
              <GridItem container justify="flex-end" key={index}  >

                <Card className={classes.cardBodyRed} key={index} style={{ marginBottom: '0'}} >
                  <GridItem xs={12} sm={12} md={12}>
                    <h4 className={classes.textBold}> {list.objectives.description} </h4>
                  </GridItem>
                  <CardBody className={classes.cardBody}>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyRed}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                  {list.offtrack} <small>Off Ttack</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyPurple}>
                              <CardBody>
                                      <h3 className={classes.cardTitle}>
                                      {list.cancelled}  <small>Cancelled</small>
                                      </h3>
                              </CardBody>
                          </Card>
                      </GridItem >
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyYellow}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                  {list.postPoned} <small>Postponed</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyOrange}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                  {list.onGoing} <small>Ongoing</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card  className={classes.cardBodyGreen}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                  {list.done} <small>Completed</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyBlack}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                  {list.notStarted} <small>Not Started</small>
                                  </h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                  </CardBody>
                  <CardFooter className={classes.cardFooter} >
                    { show_tasks === false ? (
                        <IconButton onClick={() => { setShowTasks(true); setSelectedIndex(index); setShowObjectivesTask(list.objectives.id)}} > <ExpandMoreIcon className={classes.iconBottom} /> </IconButton>
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
                <h2> There no main effort Strategic Objectives </h2>
                <IconButton> <Backup className={classes.iconAdd} /> </IconButton>
              </GridItem>
            </Card>

          </GridContainer>

        </div>
        
      )}
    </div>
  );
}
