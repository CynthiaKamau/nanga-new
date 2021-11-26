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
import { getMission, getVision } from "actions/data";
import { getStatus, getPillars } from "actions/data";
import { getUsers } from "actions/users";
import { getCategories } from "actions/data";
import { Grid } from "@material-ui/core";
// import CardHeader from "components/Card/CardHeader";
import { LinearProgress } from "@material-ui/core";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(styles);

function Dashboard() {
  const classes = useStyles();
  // const history = useHistory();

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector(state => state.auth);
  const {  mission, vision } = useSelector(state => state.data);
  const { categories }  = useSelector(state => state.data);
  const { items, error, isLoading } = useSelector(state => state.kpi);

  console.log("user", currentUser)

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


  console.log("user mission", mission)
  console.log("user vision", vision)


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
        id : visionId,
        userid : user_id,
        createdBy : user_id,
      });

      try {

        let response = await axios.post('/visions/create', body, config)
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
            userId : user_id,
            updatedBy : user_id,
            description : uservision,
            id : missionId
          });

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
