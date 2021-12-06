import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router";
// import { Redirect } from "react-router";
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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
// import JsonData from "../../data/data.json";
import { getUserObjectives } from "actions/objectives";
import { getKpis } from "actions/kpis";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getMission, getVision, getStatus, getPillars , getTaskCount, getObjectivesCount } from "actions/data";
import { getUsers } from "actions/users";
import { getCategories } from "actions/data";
import { Grid } from "@material-ui/core";
// import CardHeader from "components/Card/CardHeader";
import { LinearProgress } from "@material-ui/core";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpandLess } from "@material-ui/icons";
import CardFooter from "components/Card/CardFooter";
import moment from "moment";
import CardHeader from "components/Card/CardHeader";
import { CardContent } from "@material-ui/core";
import { getBehaviours, getFreedoms, getConstraints } from "actions/bfc";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';

// // Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);


const useStyles = makeStyles(styles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  // const history = useHistory();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector(state => state.auth);
  const {  mission, vision, task_count, objective_count } = useSelector(state => state.data);
  const { categories }  = useSelector(state => state.data);
  const { items, error, isLoading } = useSelector(state => state.kpi);
  const { items : objectives } = useSelector(state => state.objective);
  const { behaviours, behaviours_error, freedoms, freedoms_error, constraints, constrains_error} = useSelector(state => state.bfc);

  console.log("user", currentUser)

  useEffect(() => {
    dispatch(getUserObjectives(currentUser.id));
    dispatch(getMission(currentUser.id));
    dispatch(getVision(currentUser.id));
    dispatch(getKpis(currentUser.id));
    setUserId(currentUser.id);
    dispatch(getStatus());
    dispatch(getPillars());
    setCreatedBy(currentUser.id);
    dispatch(getUsers())
    dispatch(getCategories());
    dispatch(getUserObjectives(currentUser.id));
    dispatch(getBehaviours(currentUser.id));
    dispatch(getFreedoms(currentUser.id));
    dispatch(getConstraints(currentUser.id))
    dispatch(getTaskCount(currentUser.id));
    dispatch(getObjectivesCount(currentUser.id))
  }, [])

  const uoms = [
    {
      value: '%',
      label: '%',
    },
    {
    value: '<%',
    label: '<%',
    },
    {
    value: '%>',
    label: '%>',
    },
    {
      value: 'numeric',
      label: 'numeric',
    },
    {
      value: 'KES',
      label: 'KES',
    },
    {
        value: 'TSH',
        label: 'TSH',
    },
    {
        value: 'UGX',
        label: 'UGX',
    },
    {
        value: 'RWF',
        label: 'RWF',
    },
    {
        value: 'USD',
        label: 'USD',
    }
  ]

  const accounts = [
    {
        value: 'Revenue',
        label: 'Revenue',
    },
    {
        value: 'Expense',
        label: 'Expense',
    }
  ]

  const kpi_options = {
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
    }]
  }

  const obj_options = {
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
      data: task_count
    }]
  }
  
  const [addopen, setAddOpen] = useState(false);
  const [editopenmission, setEditMissionOpen] = useState(false);
  const [editopenvision, setEditVisionOpen] = useState(false);
  const [user_id, setUserId] = useState(currentUser.id);
  const [showloader, setshowloader] = useState(false); 
  const [created_by, setCreatedBy] = useState("");
  const [usermission, setUserMission] = useState("");
  const [uservision, setUserVision] = useState("");
  const [ missionId, setMissionId] = useState("");
  const [ visionId, setVisionId] = useState("");
  const [kpi, setKPI] = useState("");
  const [uom, setUnitOfMeasure] = useState("");
  const [target, setTarget] = useState("");
  const [editopen, setEditOpen] = useState(false);
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [target_achieved, setTargetAchieved] = useState("");
  const [action, setAction] = useState("");
  const [support_required, setSupportRequired] = useState("");
  const [root_cause, setRootCause] = useState("");
  const [updated_by, setUpdatedBy] = useState(currentUser.id);
  const [value, setValue] = React.useState(0);
  const [show_tasks, setShowTasks] = useState(false);
  const [setIndex, setSelectedIndex] = useState("");
  const [err, setError] = useState("");
  const [obj_tasks, setObjTasks] = useState("");
  const [ objectiveId, setObjectiveId] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log("task_count", task_count)
  console.log("obj count", objective_count)


  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // const handleRedirect = () => {
  //   history.push('/admin/tasks');
  // }

  const handleEditMissionClose = () => {
    setEditMissionOpen(false);
  };

  const handleEditVisionClose = () => {
    setEditVisionOpen(false);
  };

  const saveKpi = async (e) => {
    e.preventDefault();
    setshowloader(true);
    console.log(setCreatedBy())

    console.log("save values", kpi, uom, category, created_by)

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
    const body = JSON.stringify({ 
        title : kpi,
        kpiUnitofMeasure : uom,
        categoryId : category,
        createdBy : created_by,
        account : account,
        target : target,
        userId : created_by
    });

    try {

        let response = await axios.post('/kpi/create', body, config)
            if (response.status == 201) {
                getKpis();
                setshowloader(false);
                let item = response.data.message
                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => dispatch(getKpis(currentUser.id)));

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

  const handleEditMissionClickOpen = () => {
    setEditMissionOpen(true);
  };

  const handleEditVisionClickOpen = () => {
    setEditVisionOpen(true);
  };

  const setEditingMission = (mission) => {

    console.log("her",mission)

    if(mission[0] === null || mission[0] === undefined) {
      setUserMission('');
      setMissionId(null);
    } else {
      setUserMission(mission[0].description)
      setMissionId(mission[0].id)
    }
  
  }

  const setEditingVision = (vision) => {
    console.log("vision here", vision)
    if(mission[0] === null || mission[0] === undefined) {
      setUserVision('');
      setVisionId(null);
    } else {
      setUserVision(vision[0].description)
      setVisionId(vision[0].id)
    }
  }

  const editMission = async (e) => {
    e.preventDefault();
    setshowloader(true);

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    if(missionId === null) {

      const body = JSON.stringify({
        userid : user_id,
        createdBy : user_id,
        description : usermission,
      });

      console.log("mission", body)

      try {

          let response = await axios.post('/missions/create', body, config)
          if (response.status == 201) {

            let res = response.data.message;
            setshowloader(false);
            setEditMissionOpen(false);

              swal.fire({
                title: "Success",
                text: res,
                icon: "success",
              }).then(() => dispatch(getMission(currentUser.id)));

          } else {
            setshowloader(false);
            setEditMissionOpen(false);
            let err = response.data.message;

            swal.fire({
              title: "Error",
              text: err,
              icon: "error",
              dangerMode: true
            });
          }

      } catch (error) {
          setshowloader(false);
          setEditMissionOpen(false);

          let err = error.response.data.message;
          swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            dangerMode: true
          });
      }

    } else {

      const body = JSON.stringify({
        userId : user_id,
        updatedBy : user_id,
        description : usermission,
        id : missionId
      });

    console.log("mission", body)

      try {
          let response = await axios.post('/missions/update', body, config)
          if (response.status == 201) {

            let res = response.data.message;
            setshowloader(false);
            setEditMissionOpen(false);

              swal.fire({
                title: "Success",
                text: res,
                icon: "success",
              }).then(() => dispatch(getMission(currentUser.id)));

          } else {
            setshowloader(false);
            setEditMissionOpen(false);
            let err = response.data.message;

            swal.fire({
              title: "Error",
              text: err,
              icon: "error",
              dangerMode: true
            });
          }

      } catch (error) {
          setshowloader(false);
          setEditMissionOpen(false);

          let err = error.response.data.message;
          swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            dangerMode: true
          });
      }

    }

  }

  const editVision = async (e) => {
    e.preventDefault();
    setshowloader(true);

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    if(visionId === null) {

      const body = JSON.stringify({
        description : uservision,
        userid : user_id,
        createdBy : user_id,
      });

      try {

        let response = await axios.post('/vision/create', body, config)
        if (response.status == 201) {

          let res = response.data.message;
          setshowloader(false);
          setEditVisionOpen(false);

          swal.fire({
            title: "Success",
            text: res,
            icon: "success",
          }).then(() => dispatch(getVision(currentUser.id)));

      } else {
        setshowloader(false);
        setEditVisionOpen(false);
        let err = response.data.message;

        swal.fire({
          title: "Error",
          text: err,
          icon: "error",
          dangerMode: true
        });
      }

      } catch (error) {
          setshowloader(false);
          setEditVisionOpen(false);

          let err = error.response.data.message;
          swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            dangerMode: true
          });
      }

    } else {  
      try {

          const body = JSON.stringify({
            userid : user_id,
            updatedBy : user_id,
            description : uservision,
            id : visionId
          });

          let response = await axios.post('vision/update', body, config)
          console.log("vision resp", response.data)
          if (response.status == 200) {
            setshowloader(false);
            setEditVisionOpen(false);

            let resp = response.data.message;
              swal.fire({
                title: "Success",
                text: resp,
                icon: "success",
              }).then(() => dispatch(getVision(currentUser.id)));

          } else {
            setshowloader(false);
            setEditVisionOpen(false);

            let err = response.data.message;

            swal.fire({
              title: "Error",
              text: err,
              icon: "error",
              dangerMode: true
            });
          }

      } catch (error) {
          setshowloader(false);
          setEditVisionOpen(false);

          let err = error.response.data.message;
          swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            dangerMode: true
          });
      }

    }
  }  

  // const handleEditClickOpen = () => {
  //   setEditOpen(true);
  // };

  // const setEditing = (list) => {
  //     console.log(list);

  //     setKPI(list.title);
  //     setUnitOfMeasure(list.kpi_unit_of_measure);
  //     setCategory(list.categories.id);
  //     setId(list.id);
  //     setAccount(list.account);
  //     setTarget(list.target);
  //     setTargetAchieved(list.target_achieved);
  //     setSupportRequired(list.supportRequired);
  //     setAction(list.action);
  //     setRootCause(list.rootCause)
  // }

  const saveEdited = async(e) => {
    e.preventDefault();
    setshowloader(true);

    console.log(setUpdatedBy());

    console.log("edit values", id, kpi, uom, category, created_by, updated_by, setId)

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    const body = JSON.stringify({ 
        title : kpi,
        kpiUnitOfMeasure : uom,
        categoryId : category,
        createdBy : created_by,
        updatedBy : updated_by,
        id: id, 
        userId: created_by,
        account: account,
        target: target,
        targetAchieved: target_achieved,
        action: action,
        rootCause: root_cause,
        supportRequired: support_required
    });
    console.log("kpi", body);

    try {

        let response = await axios.post('/kpi/update', body, config)
        if (response.status == 201) {
            setshowloader(false);
                let item = response.data.message
                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => dispatch(getKpis(currentUser.id)));
                
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
            <Grid container justify="flex-end" className={classes.cardGrey}>
              <IconButton aria-label="edit" color="primary" onClick={() => { handleEditVisionClickOpen(); setEditingVision(vision) }} ><EditIcon style={{ color : '#000000'}}/></IconButton>
            </Grid>
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
          <h3 className={classes.textBold}> PERSONAL MISSION </h3>
          <Card>
            <Grid container justify="flex-end" className={classes.cardGrey}>
              <IconButton aria-label="edit" color="primary" onClick={() => { handleEditMissionClickOpen(); setEditingMission(mission) }} ><EditIcon style={{ color : '#000000'}}/></IconButton>
            </Grid>

            <CardBody className={classes.cardGrey}>
              { mission === undefined || mission === null|| mission.length === 0 ? (
                <h4>Please update your mission</h4>
              ) : mission ? (
                <h4>{mission[0].description}</h4>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>

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
                    label="Title"
                    type="text"
                    fullWidth
                    style={{marginBottom : '15px'}}
                    value={kpi}
                    variant="outlined"
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
                    helperText="Please select your unit of measure"
                >
                    {uoms.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>

                <label style={{ fontWeight: 'bold', color: 'black'}}> Category : </label>
                <TextField
                    id="outlined-select-category"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={category}
                    onChange = {(event) => {
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

                <TextField
                    autoFocus
                    margin="dense"
                    id="target"
                    label="Target"
                    type="number"
                    fullWidth
                    style={{marginBottom : '15px'}}
                    value={target}
                    variant="outlined"
                    onChange = {(event) => {
                        setTarget(event.target.value);
                    }}
                />

                <label style={{ fontWeight: 'bold', color: 'black'}}> Account : </label>
                <TextField
                    id="outlined-select-account"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={account}
                    onChange = {(event) => {
                    setAccount(event.target.value);
                    }}
                    helperText="Please select your account"
                >
                    {accounts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>

            </DialogContent>
            <DialogActions>
            <Button color="danger" onClick={handleAddClose}>Cancel</Button>
            { showloader === true ? (
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
                <Button color="primary" onClick={(e) => { handleAddClose(); saveKpi(e)}}>Save</Button>
              )}                        
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
                    variant="outlined"
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
                    helperText="Please select your unit of measure"
                >
                    {uoms.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>

                <label style={{ fontWeight: 'bold', color: 'black'}}> Category : </label>
                <TextField
                    id="outlined-select-category"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={category}
                    onChange = {(event) => {
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

                <Grid container spacing={2}>
                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="target"
                            label="Target"
                            type="number"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={target}
                            variant="outlined"
                            onChange = {(event) => {
                                setTarget(event.target.value);
                            }}
                        />
                    </Grid>

                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="target"
                            label="Target Achieved"
                            type="number"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={target_achieved}
                            variant="outlined"
                            onChange = {(event) => {
                                setTargetAchieved(event.target.value);
                            }}
                        />
                    </Grid>
                </Grid>

                <TextField
                    fullWidth
                    label="Root Cause"
                    id="root_cause"
                    multiline
                    rows={2}
                    required
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={root_cause}
                    onChange={(event) => {
                        const value = event.target.value;
                        setRootCause(value)
                    }}
                />

                <TextField
                    fullWidth
                    label="Support Required"
                    id="support_required"
                    multiline
                    rows={2}
                    required
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={support_required}
                    onChange={(event) => {
                        const value = event.target.value;
                        setSupportRequired(value)
                    }}
                />

                <TextField
                    fullWidth
                    label="Action"
                    id="action"
                    multiline
                    rows={2}
                    required
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={action}
                    onChange={(event) => {
                        const value = event.target.value;
                        setAction(value)
                    }}
                />

                <label style={{ fontWeight: 'bold', color: 'black'}}> Account : </label>
                <TextField
                    id="outlined-select-account"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={account}
                    onChange = {(event) => {
                    setAccount(event.target.value);
                    }}
                    helperText="Please select your account"
                >
                    {accounts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>

            </DialogContent>
            <DialogActions>
            <Button color="danger" onClick={handleEditClose}>Cancel</Button>
            { showloader === true ? (
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
                <Button color="primary" onClick={(e) => { handleEditClose(); saveEdited(e) }}>Save</Button>
              )}
            </DialogActions>
        </Dialog>

        <Dialog open={editopenmission} onClose={handleEditMissionClose} disableEnforceFocus>
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
                      height={100}
                      width={100}
                  />
              </div>
              ) :
              (
                <Button color="primary" onClick={(e) => { editMission(e) }}>Save</Button>
              )}

          </DialogActions>
        </Dialog>

        <Dialog open={editopenvision} onClose={handleEditVisionClose} >
          <DialogTitle>Vision</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit Vision
            </DialogContentText>

            <TextField
              id="outlined-multiline-static"
              fullWidth
              autoFocus
              label="Vision"
              type="text"
              margin="dense"
              multiline
              variant="outlined"
              rows={4}
              value={uservision}
              className={classes.textInput}
              onChange={(event) => {
                setUserVision(event.target.value);
            }}
            />

          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleEditVisionClose}>Cancel</Button>
            { showloader === true  ? (
              <div style={{ textAlign: "center", marginTop: 10 }}>
                  <Loader
                      type="Puff"
                      color="#29A15B"
                      height={100}
                      width={100}
                  />
              </div>
              ) :
              (
                <Button color="primary" onClick={(e) => { editVision(e); }}>Save</Button>
              )}
          </DialogActions>
        </Dialog>

      </GridContainer>

      { items && items.length >= 1 ? (

        <div>
          <GridContainer>

            <GridItem container justify="flex-end">
              <Button color="primary" onClick={handleAddClickOpen}> Create New KPI</Button>
            </GridItem>

            <Box sx={{ bgcolor: 'background.paper' }} width="100%">
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
                  <Tab label="OBJECTIVES" {...a11yProps(1)} />
                  <Tab label="BFC" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
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
                                          <TableCell>{list.target_achieved}</TableCell>
                                          <TableCell>{list.target_achieved}</TableCell>
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
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {objectives ? ( objectives.map((list, index) => (
                    <GridItem container justify="flex-end" key={index}  >

                      <Card style={{borderLeft : list.objectives.overallStatus === 'Incomplete' ? 'solid 5px red' : (list.objectives.overallStatus === 'COMPLETE' || list.objectives.overallStatus === 'Complete') ? 'solid 5px green' : (list.objectives.overallStatus === 'INCOMPLETE') ? 'solid 5px red'  :'solid 5px black' , marginBottom: '0'}} key={index} >
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
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                  >
                      <Grid item xs={4} key="1">
                        <Card>
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

                      <Grid item xs={4} key="2">              
                        <Card>
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
                                  { freedoms === null || freedoms === undefined || freedoms.length === 0  ? (
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

                      <Grid item xs={4} key="3"> 
                        <Card>
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

            <Box sx={{ bgcolor: 'background.paper', marginTop: '20px' }} width="100%">
            <h4 style={{ fontWeight: 'bold', textAlign: 'center'}}> Analytics </h4>

              <Grid container spacing={2} direction="row" >
                
                <Grid item xs={5} key="1">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={kpi_options}
                  />                
                </Grid>

                <Grid item xs={5} key="2">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={obj_options}
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
                <h2> You have not set any KPIS </h2>
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

export default withRouter(Dashboard);
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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));


