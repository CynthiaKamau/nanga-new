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
import { getMission, getVision } from "actions/data";
import { getStatus, getPillars } from "actions/data";
import { getUsers } from "actions/users";
import { getCategories } from "actions/data";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  // const history = useHistory();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.objective);
  const {  mission, vision } = useSelector(state => state.data);
  const {  items : kpis } = useSelector(state => state.kpi);
  const { statuses, pillars } = useSelector(state => state.data);
  const { items : sysusers} = useSelector(state => state.user)
  const { categories }  = useSelector(state => state.data);

  console.log("kpis", kpis)

  useEffect(() => {
    dispatch(getUserObjectives(currentUser.id));
    dispatch(getMission(currentUser.id));
    dispatch(getVision());
    dispatch(getKpis(currentUser.id));
    setUserId(currentUser.id);
    dispatch(getStatus());
    dispatch(getPillars());
    setCreatedBy(currentUser.id);
    dispatch(getUsers())
    dispatch(getCategories());

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

  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [kpi_id, setKpi] = useState("");
  const [addopen, setAddOpen] = useState(false);
  const [addopentask, setAddOpenTask] = useState("");
  const [addopenindividualtask, setAddOpenIndividualTask] = useState(false);
   const [editopenindividualtask, setEditOpenIndividualTask] = useState(false);
  const [editopenmission, setEditMissionOpen] = useState(false);
  const [editopenvision, setEditVisionOpen] = useState(false);
  const [task_description, setTaskDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [task_start_date, setTaskStartDate] = useState("");
  const [task_end_date, setTaskEndDate] = useState("");
  const [task_status, setTaskStatus] = useState("");
  const [user_id, setUserId] = useState(currentUser.id);
  const [showloader, setshowloader] = useState(false); 
  const [created_by, setCreatedBy] = useState("");
  const [usermission, setUserMission] = useState("");
  const [uservision, setUserVision] = useState("");
  const [show_tasks, setShowTasks] = useState(false);
  const [setIndex, setSelectedIndex] = useState("");
  const [err, setError] = useState("");
  const [obj_tasks, setObjTasks] = useState("");
  const [ objectiveId, setObjectiveId] = useState("");
  const [ missionId, setMissionId] = useState("");
  const [ visionId, setVisionId] = useState("");
  // const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [updated_by, setUpdatedBy] = useState(currentUser.id);
  const [ task_objective_id, setTaskObjectiveId] = useState("");
  const [ pillar_id, setPillar] = useState("");
  const [assignee_id, setAssigneeId] = useState("");
  const [kpi_title, setKPITitle] = useState("");
  const [kpi_uom, setKpiUnitOfMeasure] = useState("");
  const [kpi_category, setKpiCategory] = useState("");
  const [kpi_target, setKpiTarget] = useState("");
  const [kpi_account, setKpiAccount] = useState("");
  const [null_kpis, setNullKpis] = useState(true);


  if(kpis === null || kpis === undefined) {
    kpis === [];
  }
  
  useEffect(() => {
    if(kpis && kpis.length >= 1) {
      setNullKpis(false);
    }
  }, [kpis]);

  console.log(null_kpis);

  // const [newuser, setNewUser] = useState(true);

  // const categories = JsonData.Categories;
  // const kpis = JsonData.KPIS;

  console.log("user mission", mission)
  console.log("user vision", vision)


  const handleAddClickOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setAddOpenTask(false);
  };

  const handleAddTaskClose = () => {
    setAddOpenTask(false);
  };

  const handleAddTaskOpen = () => {
    setAddOpenTask(true);
    setAddOpen(false);
  }

  // const handleRedirect = () => {
  //   history.push('/admin/tasks');
  // }

  const handleAddIndividualTaskOpen = () => {
    setAddOpenIndividualTask(true);
  }

  const handleAddIndividualTaskClose = () => {
      setAddOpenIndividualTask(false);
  }

  const handleEditIndividualTaskOpen = () => {
    setEditOpenIndividualTask(true);
  }

  const handleEditIndividualTaskClose = () => {
      setEditOpenIndividualTask(false);
  }

  const handleEditMissionClose = () => {
    setEditMissionOpen(false);
  };

  const handleEditVisionClose = () => {
    setEditVisionOpen(false);
  };

  const saveObjective = async (e) => {
    e.preventDefault();
    setshowloader(true);
    // setAddOpen(false);
    // setAddOpenTask(false);

    let end_date = moment(end_date).format('YYYY-MM-DD');
    let start_date = moment(start_date).format('YYYY-MM-DD');

    console.log("save objective", description, end_date, kpi_id, start_date, target, user_id, created_by, pillar_id);

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    let body = {description, end_date, kpi_id, start_date, target, user_id, created_by, pillar_id};

    //add if else clause here

    if(null_kpis === true) {

      try {

        let kpi_body = JSON.stringify({ 
          title : kpi_title,
          kpiUnitofMeasure : kpi_uom,
          categoryId : kpi_category,
          createdBy : created_by,
          account : kpi_account,
          target : kpi_target,
          userId : created_by
        });

        console.log("kpi body", kpi_body);

        let response = await axios.post('/kpi/create', kpi_body, config);
      
        if (response.data.status !== 201) {
          error(response.data)
          setshowloader(false);
          setAddOpenTask(false);

          let error = response.data.message;

          swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              dangerMode: true
          });

        } else {    
          
          let obj_body = ({
            description : description ,
            end_date : end_date,
            kpi_id : response.data.data.id,
            start_date : start_date,
            target : target,
            user_id : target,
            created_by : target,
            pillar_id : target
          });

          let response0 = await axios.post('/objectives/create', obj_body, config);
      
          if (response0.data.status !== 201) {
            error(response0.data)
            setshowloader(false);
            setAddOpenTask(false);

            let error = response0.data.message;

            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });

          } else {
            setshowloader(false);
            setAddOpenTask(false);

            console.log("objective ", response0.data)

            let task_end_date = moment(task_end_date).format('YYYY-MM-DD');
            let task_start_date = moment(task_start_date).format('YYYY-MM-DD');

            let task = {
              description: task_description,
              start_date: task_start_date,
              end_date: task_end_date,
              user_id: user_id,
              created_by: created_by,
              objective_id: response0.data.data.id
            }

            console.log("task", task)

            let response1 = await axios.post('/tasks/create', task, config);

            if (response1.data.success === false) {
              setshowloader(false);

              let error = response.data.message;

              swal.fire({
                  title: "Error",
                  text: error,
                  icon: "error",
                  dangerMode: true
              });

            } else {

              console.log("task add", response1.data.data)

              const body = JSON.stringify({
                task_id : response1.data.data.id ,
                assigner_id : created_by,
                user_ids : [assignee_id]
              })
    
              console.log(body, setAssigneeId)
    
              try {
    
                let response2 = await axios.post('/assignedtasks/update', body, config)
                if (response2.status == 201) {
                  setshowloader(false);
                  swal.fire({
                    title: "Success",
                    text: "Objective and task added successfully!",
                    icon: "success",
                    dangerMode: false
                  }).then(() => dispatch(getUserObjectives(currentUser.id)));
                  
                } else {
          
                    let error = response2.data.message
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

          }
        } 
      } catch (error) {
        console.log(error);
        setshowloader(false);
        setAddOpenTask(false);

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
        let response = await axios.post('/objectives/create', body, config);
      
          if (response.data.status !== 201) {
            error(response.data)
            setshowloader(false);
            setAddOpenTask(false);

            let error = response.data.message;

            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });

          } else {
            setshowloader(false);
            setAddOpenTask(false);

            console.log("objective ", response.data)

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

              let error = response.data.message;

              swal.fire({
                  title: "Error",
                  text: error,
                  icon: "error",
                  dangerMode: true
              });

            } else {

              console.log("task add", response1.data.data)

              const body = JSON.stringify({
                task_id : response1.data.data.id ,
                assigner_id : created_by,
                user_ids : [assignee_id]
              })
    
              console.log(body, setAssigneeId)
    
              try {
    
                let response2 = await axios.post('/assignedtasks/update', body, config)
                if (response2.status == 201) {
                  setshowloader(false);
                  swal.fire({
                    title: "Success",
                    text: "Objective and task added successfully!",
                    icon: "success",
                    dangerMode: false
                  }).then(() => dispatch(getUserObjectives(currentUser.id)));
                  
                } else {
          
                    let error = response2.data.message
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

          }
      } catch (error) {
        console.log(error);
        setshowloader(false);
        setAddOpenTask(false);

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
    setUserVision(vision[0].description)
    setVisionId(vision[0].id)
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

    const body = JSON.stringify({
        description : uservision,
        id : visionId
      });

    console.log("vision", body)

    try {

        let response = await axios.post('vision/update', body, config)
        if (response.status == 201) {
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

  const setShowObjectivesTask = (id) => {

    setObjectiveId(id);
      console.log("obj id", objectiveId)

      axios.get(`/tasks/fetchTasksbyObjectiveId?objective_id=${id}`)
          .then(response => setObjTasks(response.data))
          .catch(error => setError("No tasks found", console.log(error))
          )

  }

  const saveIndividualTask = async (e) => {
    e.preventDefault();

    if ( user_id == "", created_by == "", task_description == "", task_start_date == "", task_end_date == "" ) {
      return false;
    }

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
    objective_id: objectiveId
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
      setshowloader(false);
        swal.fire({
            title: "Success",
            text: "Task added successfully!",
            icon: "success",
            dangerMode: false
        });
    }
  }

  const setEditingIndividualTask = (list) => {
    console.log(list);

    setTaskDescription(list.description)
    setTaskStatus(list.status);
    setTaskStartDate(list.start_date);
    setTaskEndDate(list.end_date);
    setTaskObjectiveId(list.objective_id);
    setUserId(list.user_id);
    setId(list.id)
  }

  const saveEditedIndividualTask = async (e) => {
      e.preventDefault();
      setshowloader(true);

      console.log("edit values",  task_description, task_end_date, task_start_date, task_objective_id, user_id, created_by, updated_by, id, task_status, setUpdatedBy)

      const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
      const body = JSON.stringify({
        "id": id,
        "description": task_description,
        "user_id": user_id,
        "objective_id": task_objective_id,
        "start_date": task_start_date,
        "end_date": task_end_date,
        "status": task_status,
        "created_by": created_by,
        "updated_by": updated_by
      });

      console.log("task", body);

      try {

          let response = await axios.post('/tasks/update', body, config)
          if (response.status == 201) {
              setshowloader(false);
              setEditOpenIndividualTask(false);

              let item = response.data.message
              swal.fire({
                  title: "Success",
                  text: item,
                  icon: "success",
              })

          } else {
              let error = response.data.message
                  setshowloader(false);
                  setEditOpenIndividualTask(false);

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
          setEditOpenIndividualTask(false);

          swal.fire({
              title: "Error",
              text: err,
              icon: "error",
              dangerMode: true
          });
      }

  }


  return (
    <div>

      <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
          <h3 className={classes.textBold}> THE VISION</h3>
          <Card>
            <Grid container justify="flex-end" className={classes.cardGrey}>
            { currentUser.role_id === 0 ? (<IconButton aria-label="edit" color="primary" onClick={() => { handleEditVisionClickOpen(); setEditingVision(vision) }} ><EditIcon style={{ color : '#000000'}}/></IconButton>) : null}
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
            <DialogTitle>Strategic Objective</DialogTitle>
            <DialogContent>

            {

              kpis.length === 0 || kpis === undefined ? (

                <div>
                <DialogContent>
                  <h4>Create New  KPI </h4>
                </DialogContent>

                <TextField
                    autoFocus
                    margin="dense"
                    id="kpi"
                    label="KPI Title"
                    type="text"
                    fullWidth
                    style={{marginBottom : '15px'}}
                    value={kpi_title}
                    variant="outlined"
                    onChange = {(event) => {
                        setKPITitle(event.target.value);
                    }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6} lg={6} xl={6} sm={12}>
                    <label style={{ fontWeight: 'bold', color: 'black'}}>KPI Unit Of Measure : </label>
                      <TextField
                          id="outlined-select-uom"
                          select
                          fullWidth
                          variant="outlined"
                          label="Select"
                          value={kpi_uom}
                          onChange = {(event) => {
                          setKpiUnitOfMeasure(event.target.value);
                          }}
                          helperText="Please select your unit of measure"
                      >
                          {uoms.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                              {option.label}
                          </MenuItem>
                          ))}
                      </TextField>
                  </Grid>

                  <Grid item xs={6} lg={6} xl={6} sm={12}>
                    <label style={{ fontWeight: 'bold', color: 'black'}}> KPI Category : </label>
                      <TextField
                          id="outlined-select-category"
                          select
                          fullWidth
                          variant="outlined"
                          label="Select"
                          value={kpi_category}
                          onChange = {(event) => {
                          setKpiCategory(event.target.value);
                          }}
                          helperText="Please select your category"
                      >
                          {categories.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                              {option.description}
                          </MenuItem>
                          ))}
                      </TextField>
                  </Grid>
                </Grid>

                <TextField
                    autoFocus
                    margin="dense"
                    id="target"
                    label="KPI Target"
                    type="number"
                    fullWidth
                    style={{marginBottom : '15px'}}
                    value={kpi_target}
                    variant="outlined"
                    onChange = {(event) => {
                        setKpiTarget(event.target.value);
                    }}
                />

                <label style={{ fontWeight: 'bold', color: 'black'}}> KPI Account : </label>
                  <TextField
                      id="outlined-select-account"
                      select
                      fullWidth
                      variant="outlined"
                      label="Select"
                      value={kpi_account}
                      onChange = {(event) => {
                      setKpiAccount(event.target.value);
                      }}
                      helperText="Please select your account"
                  >
                      {accounts.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          {option.label}
                      </MenuItem>
                      ))}
                  </TextField>
                </div>
              ) : null
            } 

            <DialogContent dividers>
              <h4> Create New  Strategic Objective </h4>
            </DialogContent>
              
              <TextField
                id="outlined-multiline-static"
                required
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

              <Grid container spacing={2}>
                <Grid item xs={6} lg={6} xl={6} sm={12}>
                  <label> Pillar : </label>
                  <TextField
                    id="outlined-select-pillar"
                    select
                    required
                    fullWidth
                    variant="outlined"
                    label="Select"
                    className={classes.textInput}
                    value={pillar_id}
                    onChange={(event) => {
                      setPillar(event.target.value);
                      // setUomValue()
                    }}
                    helperText="Please select your pillar"
                  >
                    {pillars && pillars.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6} lg={6} xl={6} sm={12}>
                  { kpis.length >= 1 ? (
                    <div>
                      <label> KPI : </label>
                      <TextField
                        id="outlined-select-kpi"
                        select
                        required
                        fullWidth
                        variant="outlined"
                        label="Select"
                        className={classes.textInput}
                        value={kpi_id}
                        onChange={(event) => {
                          setKpi(event.target.value);
                          // setUomValue()
                        }}
                        helperText="Please select your kpi"
                      >
                        {kpis && kpis.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  ) : null}
                </Grid>

              </Grid>

              <Grid item xs={6} lg={6} xl={6} sm={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  helperText="Target is required"
                  required
                  id="target"
                  label="Target"
                  variant="outlined"
                  className={classes.textInput}
                  type="number"
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
                      required
                      format="yyyy/MM/dd"
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
                      required
                      format="yyyy/MM/dd"
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
                        color="#29A15B"
                        height={150}
                        width={150}
                    />
                </div>
                ) :
                (
                <Button color="primary" onClick={() => {handleAddTaskOpen();}}>Save</Button>
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

            <label style={{ fontWeight: 'bold', color: 'black' }}> User : </label>
              <TextField
                  id="outlined-select-user"
                  select
                  fullWidth
                  variant="outlined"
                  label="Select"
                  value={assignee_id}
                  onChange={(event) => {
                      setAssigneeId(event.target.value);
                  }}
                  helperText="Please select a user"
                  >
                  {sysusers.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                          {option.fullnames}
                      </MenuItem>
                  ))}
              </TextField>

            <Grid container spacing={2}>
              <Grid item xs={6} lg={6} xl={6} sm={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  helperText="Set start date"
                  format="yyyy/MM/dd"
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
                  format="yyyy/MM/dd"
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
                      color="#29A15B"
                      height={100}
                      width={100}
                  />
              </div>
              ) :
              (
                <Button color="primary" onClick={(e) => { saveObjective(e); }}>Save</Button>
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

        <Dialog open={addopenindividualtask} onClose={handleAddIndividualTaskClose}>
            <DialogTitle>Strategic Initiative</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add New Strategic Initiative
                </DialogContentText>

                <TextField
                    fullWidth
                    label="Description"
                    id="task_description"
                    multiline
                    rows={4}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={task_description}
                    onChange={(event) => {
                        const value = event.target.value;
                        setTaskDescription(value)
                    }}
                />

                <label style={{ fontWeight: 'bold', color: 'black' }}> User : </label>
                  <TextField
                      id="outlined-select-user"
                      select
                      fullWidth
                      variant="outlined"
                      label="Select"
                      value={assignee_id}
                      onChange={(event) => {
                          setAssigneeId(event.target.value);
                      }}
                      helperText="Please select a user"
                    >
                    {sysusers.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.fullnames}
                        </MenuItem>
                    ))}
                  </TextField>

                <Grid container spacing={2}>
                    <Grid item xs={6} lg={6} xl={6} sm={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                helperText="Set start date"
                                format="yyyy/MM/dd"
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
                                format="yyyy/MM/dd"
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
                            color="#29A15B"
                            height={150}
                            width={150}
                        />
                    </div>
                ) : (
                    <Button color="primary" onClick={(e) => { handleAddIndividualTaskClose(); saveIndividualTask(e) }}>Save</Button>
                )}
            </DialogActions>

        </Dialog>

        <Dialog open={editopenindividualtask} onClose={handleEditIndividualTaskClose}>
            <DialogTitle>Strategic Intitative</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit Strategic Intitative Details
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    style={{ marginBottom: '15px' }}
                    value={task_description}
                    variant="outlined"
                    onChange={(event) => {
                        setTaskDescription(event.target.value);
                    }}
                />

            <Grid container spacing={2}>
                <Grid item xs={6} lg={6} xl={6} sm={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            helperText="Set start date"
                            format="yyyy/MM/dd"
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
                            helperText="Set due date"
                            format="yyyy/MM/dd"
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

                <label style={{ fontWeight: 'bold', color: 'black' }}> Status : </label>
                <TextField
                    id="outlined-select-status"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={task_status}
                    onChange={(event) => {
                        setTaskStatus(event.target.value);
                    }}
                    helperText="Please select the status"
                >
                    {statuses.map((option) => (
                        <MenuItem key={option.status} value={option.status}>
                            {option.status}
                        </MenuItem>
                    ))}
                </TextField>

            </DialogContent>
            <DialogActions>
                <Button color="danger" onClick={handleEditIndividualTaskClose}>Cancel</Button>
                <Button color="primary" onClick={(e) => { saveEditedIndividualTask(e) }}>Save</Button>
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

                <Card style={{borderLeft : list.objectives.overallStatus === 'Incomplete' ? 'solid 5px red' : (list.objectives.overallStatus === 'COMPLETE') ? 'solid 5px green' : (list.objectives.overallStatus === 'INCOMPLETE') ? 'solid 5px red'  :'solid 5px black' , marginBottom: '0'}} key={index} >
                  <GridItem xs={12} sm={12} md={12}>
                    <h3 className={classes.textBold}> {list.objectives.description} </h3>
                    <h6 className={classes.textGreen}> {list.totalTasks} Management actions</h6>

                    <h6 > KPIS : {list.objectives.kpi.title} </h6>

                    <h6 > STATUS : {list.objectives.overallStatus} </h6>

                  </GridItem>
                  <CardBody className={classes.cardBody}>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyRed}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>{list.offtrack} <small>Off Track</small></h3>
                              </CardBody>
                          </Card>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyRed}>
                              <CardBody>
                                <h3 className={classes.cardTitle}>{list.cancelled} <small>Cancelled</small></h3>
                              </CardBody>
                          </Card>
                      </GridItem >
                      {/* <GridItem xs={12} sm={6} md={2}>
                          <Card className={classes.cardBodyRed}>
                              <CardBody>
                                  <h4 className={classes.cardTitle}>
                                  {list.postPoned} <small>Postponed</small>
                                  </h4>
                              </CardBody>
                          </Card>
                      </GridItem> */}
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
                          <Card className={classes.cardBodyRed}>
                              <CardBody>
                                  <h3 className={classes.cardTitle}>
                                      {list.notStarted}<small> Not Started</small>
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
                                      <TableCell>Start Date</TableCell>
                                      <TableCell>Due Date</TableCell>
                                      <TableCell>Status</TableCell>
                                      <TableCell>Action</TableCell>
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
                                          <TableCell> <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditIndividualTaskOpen(); setEditingIndividualTask(list) }} ><EditIcon /></IconButton></TableCell>
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
