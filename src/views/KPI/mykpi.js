import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
import { makeStyles } from "@material-ui/core/styles";
// import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { getUserObjectives } from "actions/objectives";
import { getCategories, getPillars } from "actions/data";
import { getKpis } from "actions/kpis";
import { LinearProgress } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from "moment";
import { Grid } from "@material-ui/core";
import axios from "axios";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

// const useStyles = makeStyles(styles);

export default function myKpis() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { items, item, error, isLoading } = useSelector(state => state.objective);
    const {  categories, pillars } = useSelector(state => state.data);
    const { user: currentUser } = useSelector(state => state.auth);
    const {  items : kpis } = useSelector(state => state.kpi);

    console.log("sumbua",item)

    useEffect(() => {
        dispatch(getUserObjectives(currentUser.id));
        dispatch(getCategories());
        dispatch(getKpis(currentUser.id));
        dispatch(getPillars());
    }, [])

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [uom, setUnitOfMeasure] = useState("");
    const [category, setCategory] = useState("");
    const [target, setTarget] = useState("");
    const [target_achieved_on_review, setTargetAtReview] = useState("");
    const [showloader, setshowloader] = useState(false);  
    const [id, setId] = useState("");
    const [created_by, setCreatedBy] = useState(currentUser.id);
    const [updated_by, setUpdatedBy] = useState(currentUser.id);
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [kpi_id, setKpiId] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);
    const [target_achieved, setTargetAchieved] = useState("");
    const [root_cause, setRootCause] = useState("");
    const [action, setAction] = useState("");
    const [support_required, setSupportRequired] = useState("");
    const [risk_and_opportunity, setRiskAndOpportunity] = useState(""); 
    const [pillar_id, setPillarId] = useState("");

    // const handleAddClickOpen = () => {
    //     setAddOpen(true);
    // };

    const saveKpi = async (e) => {
        e.preventDefault();
        setshowloader(true);
        
        const config = { headers: { 'Content-Type': 'application/json' } }

        console.log(setCreatedBy)

        const body = JSON.stringify({ user_id, target, start_date, kpi_id, end_date, description, created_by });

        try {

            let response = await axios.post('/objectives/create', body, config)
            if (response.status == 201) {
                setshowloader(false);
                let item = response.data.message
                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                });
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

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {

        setDescription(list.description);
        setKpiId(list.kpi.id);
        setPillarId(list.pillar_id);
        setId(list.id);
        setTarget(list.target);
        setTargetAchieved(list.target_achieved);
        setTargetAtReview(list.target_achieved_on_review);
        setStartDate(list.start_date);
        setEndDate(list.end_date)
        setTargetAchieved(list.target_achieved);
        setSupportRequired(list.supportRequired);
        setAction(list.action);
        setRootCause(list.rootCause)
        setRiskAndOpportunity(list.riskOrOpportunity)
    }

    const saveEdited = async (e) => {
        e.preventDefault();
        setshowloader(true);
        let end_date = moment(end_date).format('YYYY-MM-DD');
        let start_date = moment(start_date).format('YYYY-MM-DD');

        console.log("edit values", id, description, kpi_id, user_id, pillar_id, start_date, end_date,  target, target_achieved, root_cause, risk_and_opportunity, action, support_required, created_by, updated_by, setUpdatedBy(), setUserId, setPillarId)

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
        const body = JSON.stringify({ id, description, kpi_id, user_id, pillar_id, start_date, end_date,  target, target_achieved, root_cause, risk_and_opportunity, action, support_required, created_by, updated_by });

        try {

            let response = await axios.post('/objectives/update', body, config)
            if (response.status == 201) {
                setshowloader(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => dispatch(getUserObjectives(currentUser.id)));

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

    // const handleDeleteClickOpen = () => {
    //     setDeleteOpen(true);
    // };

    // const setDelete = (list) => {
    //     console.log(list)
    // }

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    // const handleDeleteClose = () => {
    //     setDeleteOpen(false);
    // };

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

  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>User Reports</h4>
                <p>
                Reports.
                </p>
              </CardHeader>
              <CardBody>
              {/* <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div> */}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Strategic Objective</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Root Cause and Insight</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Risk/Opportunities</TableCell>
                            <TableCell>Support Required</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items ? ( items.map((list, index) => (
                            <TableRow key={index}>
                                <TableCell>{list.objectives.description}</TableCell>
                                <TableCell>{list.objectives.user_id} </TableCell>
                                <TableCell> <FiberManualRecord style={{color : list.objectives.overallStatus === 'Incomplete' ? 'red' : (list.objectives.overallStatus === 'COMPLETE') ? 'green' : (list.objectives.overallStatus === 'INCOMPLETE') ? 'red'  :'solid 5px black' , marginBottom: '0'}} key={index} /> </TableCell>
                                <TableCell>{list.objectives.rootCause} </TableCell>
                                <TableCell>{list.objectives.action} </TableCell>
                                <TableCell>{list.objectives.riskOrOpportunity} </TableCell>
                                <TableCell>{list.objectives.supportRequired} </TableCell>
                                <TableCell>
                                    <IconButton aria-label="edit" color="primary" onClick={() => { handleEditClickOpen(); setEditing(list.objectives) }} ><EditIcon/></IconButton>
                                {/* <IconButton aria-label="delete" color="secondary" onClick={() => { handleDeleteClickOpen(); setDelete(list) }} ><DeleteIcon /></IconButton> */}
                                </TableCell>
                            </TableRow>
                        ))) : error ? (<TableRow> <TableCell> {error} </TableCell></TableRow>
                        ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }

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
                            value={description}
                            variant="outlined"
                            onChange = {(event) => {
                                setDescription(event.target.value);
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
                            variant="standard"
                            onChange = {(event) => {
                                setTarget(event.target.value);
                            }}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="target_achieved_on_review"
                            label="Target At Review"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={target_achieved_on_review}
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
                            value={target_achieved}
                            variant="standard"
                            onChange = {(event) => {
                                setTargetAchieved(event.target.value);
                            }}
                        />

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
                            id="objective"
                            label="Objective"
                            type="text"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={description}
                            variant="outlined"
                            onChange = {(event) => {
                                setDescription(event.target.value);
                            }}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={6} lg={6} xl={6} sm={12}>                            
                            <label style={{ fontWeight: 'bold', color: 'black'}}> KPI : </label>
                            <TextField
                                id="outlined-select-kpi"
                                select
                                fullWidth
                                variant="outlined"
                                label="Select"
                                value={kpi_id}
                                onChange = {(event) => {
                                setKpiId(event.target.value);
                                }}
                                helperText="Please select your Kpi"
                            >
                                {kpis && kpis.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.title}
                                </MenuItem>
                                ))}
                                </TextField>
                            </Grid>

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
                                    setPillarId(event.target.value);
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
                        </Grid>

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
                                id="target_achieved"
                                label="Target Achieved"
                                type="text"
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

                        <TextField
                            fullWidth
                            label="Risk And Opportunity"
                            id="risk_and_opportunity"
                            multiline
                            rows={2}
                            required
                            variant="outlined"
                            className={classes.textInput}
                            type="text"
                            value={risk_and_opportunity}
                            onChange={(event) => {
                                const value = event.target.value;
                                setRiskAndOpportunity(value)
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
                      ) : (
                        <Button color="primary" onClick={(e) => { handleEditClose(); saveEdited(e) }}>Save</Button>
                      )}
                    </DialogActions>
                </Dialog>

                {/* <Dialog
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
                    <Button color="primary" onClick={handleDeleteClose} autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog> */}

              </CardBody>
            </Card>
          </GridItem>
      </GridContainer>
    </div>
  );
}
