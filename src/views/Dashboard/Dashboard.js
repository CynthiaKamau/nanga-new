import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
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
// import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getMission, getVision, getStatus, getPillars , getTaskCount, getObjectivesCount, getStrategicIntent1, getStrategicIntent2 } from "actions/data";
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
import { getKpiCount } from "actions/data";
// import Avatar from "../../assets/img/default-avatar.png";

// // Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);


const useStyles = makeStyles(styles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector(state => state.auth);
  const { task_count, objective_count, kpi_count, strategic_intent1 } = useSelector(state => state.data);
  const { categories }  = useSelector(state => state.data);
  const { items, error, isLoading } = useSelector(state => state.kpi);
  const { items : objectives } = useSelector(state => state.objective);
  const { behaviours, behaviours_error, freedoms, freedoms_error, constraints, constrains_error} = useSelector(state => state.bfc);

  console.log("strategic_intent1", strategic_intent1, setUserId, user_id)

  console.log("kpi count", kpi_count)

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
    dispatch(getKpiCount(currentUser.id))
    dispatch(getStrategicIntent1(currentUser.id))
    dispatch(getStrategicIntent2(currentUser.id))
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
      type: 'pie',
    },
    colors: ['blue', 'amber', 'red', 'green'],
    title: {
      text: 'KPI Breakdown'
    },
    series: [{
      data: kpi_count
    }],
    tooltip: {
      pointFormat: '{name}: <br>{point.percentage:.1f} %, Total: {point.y}'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %, Total: {point.y}',
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
      pointFormat: '{name}: <br>{point.percentage:.1f} %, Total: {point.y}'

    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %, Total: {point.y}',
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
      pointFormat: '{point.name}: <br>{point.percentage:.1f} %, Total: {point.y}'

    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>:<br>{point.percentage:.1f} %, Total: {point.y}',
              style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
          }
      }
    },
  }
  
  const [addopen, setAddOpen] = useState(false);
  // const [editopenmission, setEditMissionOpen] = useState(false);
  // const [editopenvision, setEditVisionOpen] = useState(false);
  // const [editopensil1, setEditSIL1Open] = useState(false);
  // const [editopensil2, setEditSIL2Open ] = useState(false);
  const [user_id, setUserId] = useState(currentUser.id);
  const [showloader, setshowloader] = useState(false); 
  const [created_by, setCreatedBy] = useState("");
  // const [usermission, setUserMission] = useState("");
  // const [uservision, setUserVision] = useState("");
  // const [ missionId, setMissionId] = useState("");
  // const [ visionId, setVisionId] = useState("");
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
  // const [userstrategicintent1, setStrategicIntent1] = useState("");
  // const [userstrategicintent2, setStrategicIntent2] = useState("");
  // const [strategic_intent1_id, setStrategicIntent1Id] = useState("");
  // const [strategic_intent2_id, setStrategicIntent2Id] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log("task_count", task_count)
  console.log("obj count", objective_count)


  // const handleAddClickOpen = () => {
  //   setAddOpen(true);
  // };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // const handleRedirect = () => {
  //   history.push('/admin/tasks');
  // }

  // const handleEditMissionClose = () => {
  //   setEditMissionOpen(false);
  // };

  // const handleEditVisionClose = () => {
  //   setEditVisionOpen(false);
  // };

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

  // const handleEditMissionClickOpen = () => {
  //   setEditMissionOpen(true);
  // };

  // const handleEditVisionClickOpen = () => {
  //   setEditVisionOpen(true);
  // };

  // const handleEditSIL1Close = () => {
  //   setEditSIL1Open(false);
  // }

  // const handleEditSIL2Close = () => {
  //   setEditSIL2Open(false);
  // }

  // const setEditingMission = (mission) => {

  //   console.log("her",mission)

  //   if(mission[0] === null || mission[0] === undefined) {
  //     setUserMission('');
  //     setMissionId(null);
  //   } else {
  //     setUserMission(mission[0].description)
  //     setMissionId(mission[0].id)
  //   }
  
  // }

  // const setEditingVision = (vision) => {
  //   console.log("vision here", vision)
  //   if(vision[0] === null || vision[0] === undefined) {
  //     setUserVision('');
  //     setVisionId(null);
  //   } else {
  //     setUserVision(vision[0].description)
  //     setVisionId(vision[0].id)
  //   }
  // }

  // const setEditingStrategicIntent1 = (strategic_intent1) => {
  //   console.log("strategic_intent1 here", strategic_intent1)
  //   if(strategic_intent1[0] === null || strategic_intent1[0] === undefined) {
  //     setStrategicIntent1('');
  //     setStrategicIntent1Id(null);
  //   } else {
  //     setStrategicIntent1(strategic_intent1[0].description)
  //     setStrategicIntent1Id(strategic_intent1[0].id)
  //   }
  // }

  // const setEditingStrategicIntent2 = (strategic_intent2) => {
  //   console.log("strategic_intent2 here", strategic_intent2)
  //   if(strategic_intent2[0] === null || strategic_intent2[0] === undefined) {
  //     setStrategicIntent2('');
  //     setStrategicIntent2Id(null);
  //   } else {
  //     setStrategicIntent2(strategic_intent2[0].description)
  //     setStrategicIntent2Id(strategic_intent2[0].id)
  //   }
  // }

  // const editStrategicIntent1 = async (e) => {
  //   e.preventDefault();
  //   setshowloader(true);

  //   const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

  //   if(strategic_intent1_id === null) {

  //     const body = JSON.stringify({
  //       description : userstrategicintent1,
  //       userid : user_id,
  //       createdBy : user_id,
  //     });

  //     try {

  //       let response = await axios.post('', body, config)
  //       if (response.status == 201) {

  //         let res = response.data.message;
  //         setshowloader(false);
  //         setEditSIL1Open(false);

  //         swal.fire({
  //           title: "Success",
  //           text: res,
  //           icon: "success",
  //         }).then(() => dispatch(getStrategicIntent1(currentUser.id)));

  //     } else {
  //       setshowloader(false);
  //       setEditSIL1Open(false);
  //       let err = response.data.message;

  //       swal.fire({
  //         title: "Error",
  //         text: err,
  //         icon: "error",
  //         dangerMode: true
  //       });
  //     }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditSIL1Open(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   } else {  
  //     try {

  //         const body = JSON.stringify({
  //           userid : user_id,
  //           updatedBy : user_id,
  //           description : userstrategicintent1,
  //           id : strategic_intent1_id
  //         });

  //         let response = await axios.post('', body, config)
  //         console.log("level 1 resp", response.data)
  //         if (response.status == 200) {
  //           setshowloader(false);
  //           setEditSIL1Open(false);

  //           let resp = response.data.message;
  //             swal.fire({
  //               title: "Success",
  //               text: resp,
  //               icon: "success",
  //             }).then(() => dispatch(getStrategicIntent1(currentUser.id)));

  //         } else {
  //           setshowloader(false);
  //           setEditSIL1Open(false);

  //           let err = response.data.message;

  //           swal.fire({
  //             title: "Error",
  //             text: err,
  //             icon: "error",
  //             dangerMode: true
  //           });
  //         }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditSIL1Open(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   }
  // }  

  // const editStrategicIntent2 = async (e) => {
  //   e.preventDefault();
  //   setshowloader(true);

  //   const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

  //   if(strategic_intent2_id === null) {

  //     const body = JSON.stringify({
  //       description : userstrategicintent2,
  //       userid : user_id,
  //       createdBy : user_id,
  //     });

  //     try {

  //       let response = await axios.post('', body, config)
  //       if (response.status == 202) {

  //         let res = response.data.message;
  //         setshowloader(false);
  //         setEditSIL2Open(false);

  //         swal.fire({
  //           title: "Success",
  //           text: res,
  //           icon: "success",
  //         }).then(() => dispatch(getStrategicIntent2(currentUser.id)));

  //     } else {
  //       setshowloader(false);
  //       setEditSIL2Open(false);
  //       let err = response.data.message;

  //       swal.fire({
  //         title: "Error",
  //         text: err,
  //         icon: "error",
  //         dangerMode: true
  //       });
  //     }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditSIL2Open(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   } else {  
  //     try {

  //         const body = JSON.stringify({
  //           userid : user_id,
  //           updatedBy : user_id,
  //           description : userstrategicintent2,
  //           id : strategic_intent2_id
  //         });

  //         let response = await axios.post('', body, config)
  //         console.log("level 2 resp", response.data)
  //         if (response.status == 200) {
  //           setshowloader(false);
  //           setEditSIL2Open(false);

  //           let resp = response.data.message;
  //             swal.fire({
  //               title: "Success",
  //               text: resp,
  //               icon: "success",
  //             }).then(() => dispatch(getStrategicIntent2(currentUser.id)));

  //         } else {
  //           setshowloader(false);
  //           setEditSIL2Open(false);

  //           let err = response.data.message;

  //           swal.fire({
  //             title: "Error",
  //             text: err,
  //             icon: "error",
  //             dangerMode: true
  //           });
  //         }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditSIL2Open(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   }
  // }  

  // const editMission = async (e) => {
  //   e.preventDefault();
  //   setshowloader(true);

  //   const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

  //   if(missionId === null) {

  //     const body = JSON.stringify({
  //       userid : user_id,
  //       createdBy : user_id,
  //       description : usermission,
  //     });

  //     console.log("mission", body)

  //     try {

  //         let response = await axios.post('/missions/create', body, config)
  //         if (response.status == 201) {

  //           let res = response.data.message;
  //           setshowloader(false);
  //           setEditMissionOpen(false);

  //             swal.fire({
  //               title: "Success",
  //               text: res,
  //               icon: "success",
  //             }).then(() => dispatch(getMission(currentUser.id)));

  //         } else {
  //           setshowloader(false);
  //           setEditMissionOpen(false);
  //           let err = response.data.message;

  //           swal.fire({
  //             title: "Error",
  //             text: err,
  //             icon: "error",
  //             dangerMode: true
  //           });
  //         }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditMissionOpen(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   } else {

  //     const body = JSON.stringify({
  //       userId : user_id,
  //       updatedBy : user_id,
  //       description : usermission,
  //       id : missionId
  //     });

  //   console.log("mission", body)

  //     try {
  //         let response = await axios.post('/missions/update', body, config)
  //         if (response.status == 201) {

  //           let res = response.data.message;
  //           setshowloader(false);
  //           setEditMissionOpen(false);

  //             swal.fire({
  //               title: "Success",
  //               text: res,
  //               icon: "success",
  //             }).then(() => dispatch(getMission(currentUser.id)));

  //         } else {
  //           setshowloader(false);
  //           setEditMissionOpen(false);
  //           let err = response.data.message;

  //           swal.fire({
  //             title: "Error",
  //             text: err,
  //             icon: "error",
  //             dangerMode: true
  //           });
  //         }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditMissionOpen(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   }

  // }

  // const editVision = async (e) => {
  //   e.preventDefault();
  //   setshowloader(true);

  //   const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

  //   if(visionId === null) {

  //     const body = JSON.stringify({
  //       description : uservision,
  //       userid : user_id,
  //       createdBy : user_id,
  //     });

  //     try {

  //       let response = await axios.post('/vision/create', body, config)
  //       if (response.status == 201) {

  //         let res = response.data.message;
  //         setshowloader(false);
  //         setEditVisionOpen(false);

  //         swal.fire({
  //           title: "Success",
  //           text: res,
  //           icon: "success",
  //         }).then(() => dispatch(getVision(currentUser.id)));

  //     } else {
  //       setshowloader(false);
  //       setEditVisionOpen(false);
  //       let err = response.data.message;

  //       swal.fire({
  //         title: "Error",
  //         text: err,
  //         icon: "error",
  //         dangerMode: true
  //       });
  //     }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditVisionOpen(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   } else {  
  //     try {

  //         const body = JSON.stringify({
  //           userid : user_id,
  //           updatedBy : user_id,
  //           description : uservision,
  //           id : visionId
  //         });

  //         let response = await axios.post('vision/update', body, config)
  //         console.log("vision resp", response.data)
  //         if (response.status == 200) {
  //           setshowloader(false);
  //           setEditVisionOpen(false);

  //           let resp = response.data.message;
  //             swal.fire({
  //               title: "Success",
  //               text: resp,
  //               icon: "success",
  //             }).then(() => dispatch(getVision(currentUser.id)));

  //         } else {
  //           setshowloader(false);
  //           setEditVisionOpen(false);

  //           let err = response.data.message;

  //           swal.fire({
  //             title: "Error",
  //             text: err,
  //             icon: "error",
  //             dangerMode: true
  //           });
  //         }

  //     } catch (error) {
  //         setshowloader(false);
  //         setEditVisionOpen(false);

  //         let err = error.response.data.message;
  //         swal.fire({
  //           title: "Error",
  //           text: err,
  //           icon: "error",
  //           dangerMode: true
  //         });
  //     }

  //   }
  // }  


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

  const kpiRouteChange = () => {
    if(currentUser.role_id === 0) {
      history.push('/admin/kpis')
    } else {
      history.push('/user/kpis')
    }
  }

  const bfcRouteChange = () => {
    if(currentUser.role_id === 0) {
      history.push('/admin/kpis')
    } else {
      history.push('/user/bfc')
    }
  }

  const objectivesRouteChange = () => {
    if(currentUser.role_id === 0) {
      history.push('/admin/strategic-objectives')
    } else {
      history.push('/user/strategic-objectives')
    }
  }

  return (
    <div>

      <GridContainer >

      <Grid container spacing={2} style={{marginRight : '10px', marginLeft : '10px'}}>
        <h3 className={classes.textBold}> MISSION: ONE LEVEL UP</h3>

        <Card className={classes.cardGrey} style={{margin: '0px'}}>
          <CardBody >
            {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
            <h4>Not available.</h4>
            ) : strategic_intent1 ? (
            <h4 > {strategic_intent1[0].level_up_one}</h4>
            ) : null}
          </CardBody>

        </Card>
      </Grid>


      <Grid container spacing={2} style={{marginRight : '10px', marginLeft : '10px', marginBottom: '20px'}}>
        <h3 className={classes.textBold}> PERSONAL MISSION </h3>
          <Card className={classes.cardGrey} style={{margin: '0px'}}>
            <CardBody>
              {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
              <h4>Not available.</h4>
              ) : strategic_intent1 ? (
              <h4 > {strategic_intent1[0].strategic_intent}</h4>
              ) : null}
            </CardBody>
          </Card>
      </Grid>

        {/* add KPI */}
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

        {/* edit KPI */}
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

        {/* edit Mission */}
        {/* <Dialog open={editopenmission} onClose={handleEditMissionClose} disableEnforceFocus>
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
        </Dialog> */}

        {/* edit Vision */}
        {/* <Dialog open={editopenvision} onClose={handleEditVisionClose} >
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
        </Dialog> */}

        {/* edit Strategic Level 1 */}
        {/* <Dialog open={editopensil1} onClose={handleEditSIL1Close} >
          <DialogTitle>Strategic Intent Level 1</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit Strategic Intent Level 1
            </DialogContentText>

            <TextField
              id="outlined-multiline-static"
              fullWidth
              autoFocus
              label="Strategic Level 1"
              type="text"
              margin="dense"
              multiline
              variant="outlined"
              rows={4}
              value={userstrategicintent1}
              className={classes.textInput}
              onChange={(event) => {
                setStrategicIntent1(event.target.value);
            }}
            />

            <TextField
              id="outlined-multiline-static"
              fullWidth
              autoFocus
              label="Strategic Level 2"
              type="text"
              margin="dense"
              multiline
              variant="outlined"
              rows={4}
              value={userstrategicintent2}
              className={classes.textInput}
              onChange={(event) => {
                setStrategicIntent2(event.target.value);
            }}
            />

          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleEditSIL1Close}>Cancel</Button>
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
                <Button color="primary" onClick={(e) => { editStrategicIntent1(e); }}>Save</Button>
              )}
          </DialogActions>
        </Dialog> */}

        {/* edit Strategic Level 2 */}
        {/* <Dialog open={editopensil2} onClose={handleEditSIL2Close} >
          <DialogTitle>Strategic Intent Level 2</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit Strategic Intent Level 2
            </DialogContentText>

            <TextField
              id="outlined-multiline-static"
              fullWidth
              autoFocus
              label="Strategic Level 2"
              type="text"
              margin="dense"
              multiline
              variant="outlined"
              rows={4}
              value={userstrategicintent2}
              className={classes.textInput}
              onChange={(event) => {
                setStrategicIntent2(event.target.value);
            }}
            />

          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleEditSIL2Close}>Cancel</Button>
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
                <Button color="primary" onClick={(e) => { editStrategicIntent2(e); }}>Save</Button>
              )}
          </DialogActions>
        </Dialog> */}

      </GridContainer>

      { items && items.length >= 1 ? (

        <div>
          <GridContainer spacing={2}>

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
                <TabPanel value={value} index={0} dir={theme.direction} style={{ height: '70vh' }} >
                    {items ? (
                      <GridItem container justify="flex-end"  >

                        <Card>
                          {/* <GridItem container justify="flex-end">
                            <Button color="primary" onClick={handleAddClickOpen}> Create New KPI</Button>
                          </GridItem> */}

                          <CardBody>
                            <Table>
                              <TableHead style={{backgroundColor : '#29A15B'}}>
                                  <TableRow>
                                      <TableCell>Category</TableCell>
                                      <TableCell>KPI</TableCell>
                                      <TableCell>Unit</TableCell>
                                      <TableCell>Target</TableCell>
                                      <TableCell>Planned YTD  </TableCell>
                                      <TableCell>Actual YTD </TableCell>
                                      <TableCell> Variance </TableCell>
                                  
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  { items === null || items === undefined ? (
                                      <TableRow> 
                                        <TableCell> No KPIs available </TableCell>
                                        <TableCell> <Button color="primary" onClick={kpiRouteChange}> Add KPIS </Button> </TableCell>
                                      </TableRow>
                                  ) : items ? ( items.map((list, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{list.categories.description} </TableCell>
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
                  { objectives === null || objectives === undefined || objectives.length === 0  ? (
                      <Card style={{ textAlign: 'center' }}>
                        <GridItem >
                          <h2> You have not set any Objectives </h2>
                          <IconButton> <AddCircleOutlineIcon className={classes.iconAdd} onClick={objectivesRouteChange} /> </IconButton>
                          <h4>Click here to start</h4>
                        </GridItem>
                      </Card>
                  ) :
                  objectives ? ( objectives.map((list, index) => (
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
                <TabPanel value={value} index={2} dir={theme.direction} style={{ height: '70vh', width: '100%'}}>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    >
                      {strategic_intent1.length > 0 ? (
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12} sm={12} key="1">
                              <Card style={{width: '100%'}}>
                                <h4 style={{color: 'black', textAlign: 'center', justifyContent: 'center'}}> Strategic Intent Level 1 </h4>
                                  {/* <IconButton  style={{float: 'right'}} aria-label="edit" color="primary" onClick={() => { setEditingStrategicIntent1(strategic_intent1) }} ><EditIcon style={{ color : '#000000'}}/></IconButton> */}
                                  {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
                                    <h4 style={{color: 'black', textAlign: 'center'}} >Not available.</h4>
                                  ) : strategic_intent1 ? (
                                    <h4 style={{color: 'black', textAlign: 'center', justifyContent: 'center'}} > {strategic_intent1[0].level_up_one}</h4>
                                  ) : null}
                              </Card>
                            </Grid>

                            <Grid item xs={12} md={12} sm={12} key="2"> 
                              {/* <IconButton  style={{float: 'right'}} aria-label="edit" color="primary" onClick={() => { setEditingStrategicIntent1(strategic_intent1) }} ><EditIcon style={{ color : '#000000'}}/></IconButton>          */}
                                <Card style={{width: '100%'}}>
                                  <h4 style={{color: 'black', textAlign:'center'}}> Strategic Intent Level 2 </h4> 
                                    {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
                                      <h4 style={{color: 'black', textAlign: 'center'}} > Not available.</h4>
                                    ) : strategic_intent1 ? (
                                      <h4  style={{color: 'black', textAlign: 'center', justifyContent: 'center'}} > {strategic_intent1[0].level_up_two}</h4>
                                    ) : null}
                                </Card>
                            </Grid>

                          </Grid>

                        ) : (
                          <GridItem container justify="flex-end">
                            <Button color="primary" onClick={bfcRouteChange}> Create New Leadership Traits</Button>
                          </GridItem>
                        )
                      }
                      
                  </Grid>

                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    style={{ paddingBottom: '20px'}}
                  >
                      <Grid item xs={12} md={4} sm={4} key="1">
                        <Card style={{ height: '100%'}} >
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
                                    <div>
                                      <TableRow> <TableCell> No behaviours available </TableCell></TableRow>
                                      <TableRow style={{ textAlign: 'center'}}> <TableCell> <Button color="primary" onClick={bfcRouteChange}> Add Behavours </Button> </TableCell></TableRow>
                                    </div>
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
                                  { freedoms === null || freedoms === undefined || freedoms.length === 0  ? (
                                    <div>
                                      <TableRow> <TableCell> No freedoms available </TableCell></TableRow>
                                      <TableRow> <TableCell> <Button color="primary" onClick={bfcRouteChange}> Add Freedoms </Button> </TableCell></TableRow>
                                    </div>
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
                                    <div>
                                      <TableRow> <TableCell> No constraints available </TableCell></TableRow>
                                      <TableRow> <TableCell> <Button color="primary" onClick={bfcRouteChange}> Add Constraints </Button> </TableCell></TableRow>
                                    </div>
                                  ) : constraints ? ( constraints.map((list, index) => (
                                      <TableRow key={index}><TableCell>{list.currentDescription}</TableCell></TableRow>
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

            <Box sx={{ bgcolor: 'background.paper', marginTop: '20px' }} width="98%" height="50%">
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
                {/* <h2> You have not set any KPIS </h2> */}
                <IconButton> <AddCircleOutlineIcon className={classes.iconAdd} onClick={bfcRouteChange} /> </IconButton>
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
