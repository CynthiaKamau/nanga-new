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
import { getMission, getVision, getTaskCount, getObjectivesCount, getUserById, getStrategicIntent1, getKpiCount } from "actions/data";
import CardHeader from "components/Card/CardHeader";
import { CardContent } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { LinearProgress } from "@material-ui/core";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { getBehaviours, getFreedoms, getConstraints } from "actions/bfc";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
// import Avatar from "../../assets/img/default-avatar.png";


const useStyles = makeStyles(styles);

export default function UserDashboard() {
  const classes = useStyles();
  const theme = useTheme();

  // const history = useHistory();

  const dispatch = useDispatch();

  const { items : objectives } = useSelector(state => state.objective);
  const {  mission, vision, spec_user, task_count, objective_count, kpi_count } = useSelector(state => state.data);
  const { items, error, isLoading } = useSelector(state => state.kpi);
  const { behaviours, behaviours_error, freedoms, freedoms_error, constraints, constrains_error, strategic_intent1} = useSelector(state => state.bfc);

  // const {  categories } = useSelector(state => state.data);

  const str = window.location.pathname;
  const chars = str.slice(25, 1000);

  console.log("id",chars)

  const [editopenmission, setEditMissionOpen] = useState(false);
  const [showloader, setshowloader] = useState(false); 
  const [show_tasks, setShowTasks] = useState(false);
  const [setIndex, setSelectedIndex] = useState("");
  const [err, setError] = useState("");
  const [obj_tasks, setObjTasks] = useState("");
  const [ objectiveId, setObjectiveId] = useState("");
  const [usermission, setUserMission] = useState("");
  const [value, setValue] = React.useState(0);


  useEffect(() => {

    if(chars) {
        dispatch(getUserObjectives(chars));
        dispatch(getCategories());
        dispatch(getKpis(chars));
        dispatch(getMission(chars));
        dispatch(getVision(chars));
        dispatch(getUserById(chars));
        dispatch(getBehaviours(chars));
        dispatch(getFreedoms(chars));
        dispatch(getConstraints(chars));
        dispatch(getTaskCount(chars));
        dispatch(getObjectivesCount(chars));
        dispatch(getKpiCount(chars))
        dispatch(getStrategicIntent1(chars))
    }
    
  }, [chars])

  console.log("here", items)


  // const [newuser, setNewUser] = useState(true);

  // const categories = JsonData.Categories;
  // const kpis = JsonData.KPIS;
  const kpi_options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    colors: ['blue', 'amber', 'red', 'green'],
    title: {
      text: 'KPI Breakdown'
    },
    series: [{
      data: kpi_count
    }],
    tooltip: {
      pointFormat: '{name}: <br>{point.percentage:.1f} %<br>Total: {point.y}'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Total: {point.y}',
          }
      }
    },
  }

  const obj_options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Objectives Breakdown'
    },
    series: [{
      data: objective_count
    }],
    tooltip: {
      pointFormat: '{name}: <br>{point.percentage:.1f} %<br>Total: {point.y}'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Total: {point.y}',
              style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
          }
      }
    },
  }

  const mas_options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'MAS Breakdown'
    },
    series: [{
      colorByPoint: true,
      data: task_count
    }],
    tooltip: {
      pointFormat: '{point.name}: <br>{point.percentage:.1f} %<br>Total: {point.y}'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %<br>Total: {point.y}',
              style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
          }
      }
    },
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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

      {spec_user === undefined || spec_user === null || spec_user.length === 0 ? ( <h4> </h4>) : spec_user ? (
        <div> <h4 className={classes.textBold} style={{display : 'inline-block'}}> {spec_user.fullnames} | </h4>  <h6 style={{display : 'inline-block'}}> {spec_user.roles.role_name}</h6> </div> ) : null}

      <Grid container spacing={2} style={{marginRight : '10px', marginLeft : '10px'}}>
        <h3 className={classes.textBold}> THE VISION</h3>

        <Card className={classes.cardGrey} style={{margin: '0px'}}>
          <CardBody >
            {vision === undefined || vision === null || vision.length === 0 ? (
              <h4> No vision found. </h4>
            ) : vision ? (
              <h4 > {vision[0].description}</h4>
            ) : null}
          </CardBody>

        </Card>
      </Grid>

      <Grid container spacing={2} style={{marginRight : '10px', marginLeft : '10px', marginBottom : '20px'}}>
        <h3 className={classes.textBold}> PERSONAL MISSION </h3>
          <Card className={classes.cardGrey} style={{margin: '0px'}}>
            <CardBody>
              { mission === undefined || mission === null|| mission.length === 0 ? (
                <h4>Please update your mission</h4>
              ) : mission ? (
                <h4>{mission[0].description}</h4>
              ) : null}
            </CardBody>
          </Card>
      </Grid>  

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
                      color="#29A15B"
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


            <Box sx={{ bgcolor: 'background.paper' }} width="98%" style={{ height: '80vh', paddingBottom : '70px' }}>
              <AppBar color="green" position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="inherit"
                  variant="fullWidth"
                  TabIndicatorProps={{style: {background:'#29A15B'}}}
                  aria-label="full width tabs example"
                >
                  <Tab label="KPIS" {...a11yProps(0)} />
                  <Tab label="STRATEGIC OBJECTIVES" {...a11yProps(1)} />
                  <Tab label="LEADERSHIP TRAITS" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction} style={{ height: '70vh' }}>
                    {items ? (
                      <GridItem container justify="flex-end"  >

                        <Card>

                          <CardBody>
                            <Table>
                              <TableHead style={{backgroundColor : '#29A15B'}}>
                                  <TableRow>
                                      <TableCell>KPI</TableCell>
                                      <TableCell>Unit</TableCell>
                                      <TableCell>Target</TableCell>
                                      <TableCell>YTD Plan</TableCell>
                                      <TableCell> YTD Actual</TableCell>
                                      <TableCell> Variance </TableCell>
                                  
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  { items === null || items === undefined ? (
                                      <TableRow> <TableCell> No KPIs available </TableCell></TableRow>
                                  ) : items ? ( items.map((list, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{list.title} </TableCell>
                                          <TableCell>{list.kpi_unit_of_measure} </TableCell>
                                          <TableCell>{list.target} </TableCell>
                                          <TableCell>{list.plannedYTD}</TableCell>
                                          <TableCell>{list.actualYTD}</TableCell>
                                          { list.variance === 'amber' ? (
                                              <TableCell> <FiberManualRecord style={{color : '#FFC107'}}/> </TableCell>)
                                          : list.variance === 'green' ? (<TableCell> <FiberManualRecord style={{color : '#29A15B'}}/> </TableCell>)
                                          : list.variance === 'blue' ? (<TableCell> <FiberManualRecord style={{color : '#03A9F4'}}/> </TableCell>)
                                          : list.variance === 'red' ? (<TableCell> <FiberManualRecord style={{color : '#F44336'}}/> </TableCell>)
                                          : list.variance === null || list.variance === undefined  ? (<TableCell> <FiberManualRecord style={{color : '#F44336'}}/> </TableCell>)
                                          : null }
              
                                      </TableRow>
                                  ))) : error ? (<TableRow> <TableCell> {error} </TableCell></TableRow> 
                                  ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }

                              </TableBody>
                            </Table>
                          </CardBody>
                        </Card>

                    </GridItem>
                    ) : null }
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} style={{ overflowY: 'scroll', height: '70vh'}}>
                  {objectives ? ( objectives.map((list, index) => (
                    <GridItem container justify="flex-end" key={index}  >

                      <Card style={{borderLeft : list.objectives.overallStatus === 'Incomplete' ? 'solid 5px red' : (list.objectives.overallStatus === 'COMPLETE' || list.objectives.overallStatus === 'Complete') ? 'solid 5px green' : (list.objectives.overallStatus === 'INCOMPLETE' || list.objectives.overallStatus === 'Incomplete' || list.objectives.overallStatus === '' || list.objectives.overallStatus === null ) ? 'solid 5px red'  :'solid 5px black' , marginBottom: '0'}} key={index} >
                        <GridItem xs={12} sm={12} md={12}>
                          <h4 className={classes.textBold}> {list.objectives.description} </h4>
                          <h6 className={classes.textGreen}> {list.totalTasks} Management actions</h6>

                          <Grid item xs={6} md={8}>
                              <div style={{ display: 'inline' }}>
                                  <h6> KPIS : </h6>
                              
                                  {list.objectives.kpis && list.objectives.kpis.map((detail, index) => ( 
                                      <div key={index} style={{ marginLeft: '50px'}}>
                                          { detail.title === null || detail.title === undefined ? (
                                              <h6> KPI Not Found</h6>
                                          ) : detail.title ? (
                                              <h6>{detail.title}</h6>
                                          ) : <h6> KPI Not Found</h6>}
                                      </div>    
                                  ))}

                                  {list.objectives.kpis === null ? (<h6 style={{ marginLeft: '50px'}}> KPI Not Found</h6>) : null}
                              </div>
                          </Grid>

                        </GridItem>
                        <CardBody className={classes.cardBody}>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                        <h4 className={classes.cardTitle}>
                                        {list.offtrack} <small>Off Ttack</small>
                                        </h4>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                            <h4 className={classes.cardTitle}>
                                            {list.cancelled}  <small>Cancelled</small>
                                            </h4>
                                    </CardBody>
                                </Card>
                            </GridItem >
                            {/* <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyYellow}>
                                    <CardBody>
                                        <h3 className={classes.cardTitle}>
                                        {list.postPoned} <small>Postponed</small>
                                        </h4>
                                    </CardBody>
                                </Card>
                            </GridItem> */}
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyOrange}>
                                    <CardBody>
                                        <h4 className={classes.cardTitle}>
                                        {list.onGoing} <small>Ongoing</small>
                                        </h4>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card  className={classes.cardBodyGreen}>
                                    <CardBody>
                                        <h4 className={classes.cardTitle}>
                                        {list.done} <small>Completed</small>
                                        </h4>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={2}>
                                <Card className={classes.cardBodyRed}>
                                    <CardBody>
                                        <h4 className={classes.cardTitle}>
                                        {list.notStarted} <small>Not Started</small>
                                        </h4>
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
                                            <TableCell>Start Date</TableCell>
                                            <TableCell>Due Date</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Resources</TableCell>
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
                                                <TableCell>
                                                  {list.assignedTasks.map((detail, index) => (
                                                      <div key={index} style={{ display: 'inline' }}>
                                                          {/* { detail.assignee.userPicture === null || detail.assignee.userPicture === undefined ? (
                                                              <img key={index} src={Avatar} alt={detail.assignee.fullnames}  style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%'}} />

                                                          ) : detail.assignee.userPicture != null ? (
                                                              <img key={index} src={detail.assignee.userPicture}
                                                              alt={detail.assignee.fullnames}  style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%'}} />
                                                          ) : null} */}

                                                            { detail.assignee.fullnames === null || detail.assignee.fullnames === undefined ? (
                                                                <p>None </p>

                                                            ) : detail.assignee.fullnames != null ? (
                                                                <p>{detail.assignee.fullnames}, </p>
                                                            ) : null}
                                                      </div>
                                                    
                                                  ))}
                                                </TableCell>
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
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} style={{ height: '70vh' }} >

                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    >
                      <Grid item xs={12} md={12} sm={12} key="1">
                        <Card>
                          <h4 style={{color: 'black', textAlign: 'center', justifyContent: 'center'}}> Strategic Intent Level 1 </h4>
                            {/* <IconButton  style={{float: 'right'}} aria-label="edit" color="primary" onClick={() => { setEditingStrategicIntent1(strategic_intent1) }} ><EditIcon style={{ color : '#000000'}}/></IconButton> */}
                            {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
                              <h4 style={{color: 'black', textAlign: 'center'}} >Not available.</h4>
                            ) : strategic_intent1 ? (
                              <h4 style={{color: 'black', textAlign: 'center'}} > {strategic_intent1[0].level_up_one}</h4>
                            ) : null}
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={12} sm={12} key="2"> 
                        {/* <IconButton  style={{float: 'right'}} aria-label="edit" color="primary" onClick={() => { setEditingStrategicIntent1(strategic_intent1) }} ><EditIcon style={{ color : '#000000'}}/></IconButton>          */}
                          <Card>
                            <h4 style={{color: 'black', textAlign:'center'}}> Strategic Intent Level 2 </h4> 
                              {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
                                <h4 style={{color: 'black', textAlign: 'center'}} > Not available.</h4>
                              ) : strategic_intent1 ? (
                                <h4  style={{color: 'black', textAlign: 'center'}} > {strategic_intent1[0].level_up_two}</h4>
                              ) : null}
                          </Card>
                      </Grid>
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    style={{ paddingBottom: '20px'}}
                  >
                      <Grid item xs={12} md={4} sm={4} key="1">
                        <Card style={{ height: '100%'}}>
                          <h4 style={{color: 'black', textAlign:'center'}}> Behaviours </h4>
                          <CardHeader
                            title=""
                            subheader=""
                          />
                          <CardContent>
                            <Table className={classes.tableBorder}>
                              {/* <TableHead className={classes.tableHeader}>
                                  <TableRow>
                                      <TableCell>Description</TableCell>
                                  </TableRow>
                              </TableHead> */}
                              <TableBody>
                                  { behaviours === null || behaviours === undefined || behaviours.length === 0 ? (
                                      <TableRow> <TableCell> No behaviours available </TableCell></TableRow>
                                  ) : behaviours ? ( behaviours.map((list, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{list.currentDescription}</TableCell>
                                      </TableRow>
                                  ))) : behaviours_error ? (<TableRow> <TableCell> {behaviours_error} </TableCell></TableRow> ) : null }
                              </TableBody>
                            </Table>      
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={4} sm={4} key="2">              
                        <Card style={{ height: '100%'}}>
                          <h4 style={{color: 'black', textAlign:'center'}}> Freedoms </h4>          
                          <CardHeader
                            title=""
                            subheader=""
                          />
                          <CardContent>
                            <Table className={classes.tableBorder}>
                              {/* <TableHead className={classes.tableHeader}>
                                  <TableRow>
                                      <TableCell>Description</TableCell>
                                  </TableRow>
                              </TableHead> */}
                              <TableBody>
                                  { freedoms === null || freedoms === undefined || freedoms.length === 0 ? (
                                      <TableRow> <TableCell> No freedoms available </TableCell></TableRow>
                                  ) : freedoms ? ( freedoms.map((list, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{list.currentDescription}</TableCell>
                                      </TableRow>
                                  ))) : freedoms_error ? (<TableRow> <TableCell> {freedoms_error} </TableCell></TableRow>) : null }
                              </TableBody>
                            </Table>      
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={4} sm={4} key="3"> 
                        <Card style={{ height: '100%'}}>
                          <h4 style={{color: 'black', textAlign:'center'}}> Constraints</h4>
                          <CardHeader
                            title=""
                            subheader=""
                          />
                          <CardContent>
                            <Table className={classes.tableBorder}>
                              {/* <TableHead className={classes.tableHeader}>
                                  <TableRow>
                                      <TableCell>Description</TableCell>
                                  </TableRow>
                              </TableHead> */}
                              <TableBody>
                                  { constraints === null || constraints === undefined || constraints.length === 0 ? (
                                      <TableRow> <TableCell> No constraints available </TableCell></TableRow>
                                  ) : constraints ? ( constraints.map((list, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{list.currentDescription}</TableCell>
                                      </TableRow>
                                  ))) : constrains_error ? (<TableRow> <TableCell> {constrains_error} </TableCell></TableRow>) : null }
                              </TableBody>
                            </Table>      
                          </CardContent>
                        </Card>
                      </Grid>

                  </Grid>
                </TabPanel>
              </SwipeableViews>
            </Box>

            <Box sx={{ bgcolor: 'background.paper', marginTop: '20px' }} width="98%">
            <h4 style={{ fontWeight: 'bold', textAlign: 'center'}}> Analytics </h4>

              <Grid container spacing={2} direction="row" >
                
                <Grid item xs={4} key="1">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={kpi_options}
                  />                
                </Grid>

                <Grid item xs={4} key="2">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={obj_options}
                  />                
                </Grid>

                <Grid item xs={4} key="3">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={mas_options}
                  />  
                </Grid>
              </Grid>   
            </Box> 

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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}