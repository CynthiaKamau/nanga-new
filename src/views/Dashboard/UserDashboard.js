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
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(styles);

export default function UserDashboard() {
  const classes = useStyles();
  // const history = useHistory();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.objective);
  // const {  categories } = useSelector(state => state.data);

  const str = window.location.pathname;
  const chars = str.slice(25, 1000);

console.log("here", chars);
console.log("here", currentUser);


  useEffect(() => {

    if(chars) {
        dispatch(getUserObjectives(chars));
        dispatch(getCategories());
        dispatch(getKpis());
    }
    
  }, [chars])

  const [editopenmission, setEditMissionOpen] = useState(false);
  const [showloader, setshowloader] = useState(false); 
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

  const handleEditMissionClose = () => {
    setEditMissionOpen(false);
  };

  // const handleRedirect = () => {
  //   history.push('/admin/tasks');
  // }

  const handleEditMissionClickOpen = () => {
    setEditMissionOpen(true);
  };

  const setEditingMission = () => {
    setMission()
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
              <h4 >
                Build the most valuable financial services business in our industry in Africa by delivering on the 6X more strategy.
              </h4>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.textBold}> MISSION </h3>
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

      </GridContainer>

      { items && items.length >= 1 ? (
        
        <div>
          <GridContainer>

            {items ? ( items.map((list, index) => (
              <GridItem container justify="flex-end" key={index}  >

                <Card className={classes.cardBodyRed} key={index} style={{ marginBottom: '0'}} >
                  <GridItem xs={12} sm={12} md={12}>
                    <h4 className={classes.textBold}> {list.description} </h4>
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
