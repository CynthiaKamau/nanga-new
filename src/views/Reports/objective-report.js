import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
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
import { getUserObjectives, getOMonthlyActions } from "actions/objectives";
import { getCategories, getPillars } from "actions/data";
import { getKpis } from "actions/kpis";
import { Grid } from "@material-ui/core";
import axios from "axios";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MaterialTable from 'material-table';
import { CardContent } from "@material-ui/core";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

// const useStyles = makeStyles(styles);

export default function ObjectiveReport() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { items, item, monthly_data, monthly_data_error } = useSelector(state => state.objective);
    const { pillars } = useSelector(state => state.data);
    const { user: currentUser } = useSelector(state => state.auth);
    const {  items : kpis } = useSelector(state => state.kpi);

    console.log("objective",item, setCreatedBy)
    console.log("monthly obj", monthly_data, monthly_data_error)

    const [monthlyaction, setMonthlyAction ] = useState("");
    const [monthly_risks, setMonthlyRisks ] = useState("");
    const [monthly_next_actions, setMonthlyNextActions ] = useState("");
    const [idm, setIdM] = useState("");

    useEffect(() => {
        dispatch(getUserObjectives(currentUser.id));
        dispatch(getCategories());
        dispatch(getKpis(currentUser.id));
        dispatch(getPillars());
        dispatch(getOMonthlyActions(currentUser.id))
    }, [])

    useEffect(() => {
        if(monthly_data.length >= 1) {
            setMonthlyAction(monthly_data[0].action)
            setMonthlyRisks(monthly_data[0].risk_opportunity)
            setMonthlyNextActions(monthly_data[0].nextPeriodAction)
            setIdM(monthly_data[0].id)
        } else {
            setMonthlyAction('Not available')
            setMonthlyRisks('Not available')
            setMonthlyNextActions('Not available')
            setIdM(null)
        }
    }, []);

    const [editopen, setEditOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [target, setTarget] = useState("");
    const [target_achieved_on_review, setTargetAtReview] = useState("");
    const [showloader, setshowloader] = useState(false);  
    const [id, setId] = useState("");
    const [created_by, setCreatedBy] = useState(currentUser.id);
    const [updated_by, setUpdatedBy] = useState(currentUser.id);
    const [year, setYear] = useState("");
    const [kpi_id, setKpiId] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);
    const [target_achieved, setTargetAchieved] = useState("");
    const [root_cause, setRootCause] = useState("");
    const [action, setAction] = useState("");
    const [support_required, setSupportRequired] = useState("");
    const [risk_and_opportunity, setRiskAndOpportunity] = useState(""); 
    const [pillar_id, setPillarId] = useState("")


    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {

        console.log("h", list)

        setDescription(list.description);

        if(list.kpis !== null) {
            let x = [];
            (list.kpis).map(function (i) {
                console.log("i", i.id)
                x.push(i.id);
            });
            setKpiId(x);
            console.log("hapo", x);
        } else {
            setKpiId("");
        }
        setPillarId(list.pillar_id);
        setId(list.id);
        setTarget(list.target);
        setTargetAchieved(list.target_achieved);
        setTargetAtReview(list.target_achieved_on_review);
        setYear(list.year);
        setTargetAchieved(list.target_achieved);
        setSupportRequired(list.supportRequired);
        setAction(list.action);
        setRootCause(list.rootCause)
        setRiskAndOpportunity(list.riskOrOpportunity)
        setUpdatedBy(list.user.id)
    }

    const saveEdited = async (e) => {
        e.preventDefault();
        setshowloader(true);

        console.log("edit values", id, description, kpi_id, user_id, pillar_id, target, target_achieved, root_cause, risk_and_opportunity, action, support_required, created_by, updated_by, target_achieved_on_review, setUpdatedBy(), setUserId, setPillarId)

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
        const body = JSON.stringify({
            id : id,
            description : description,
            kpi_ids : kpi_id,
            user_id : user_id,
            pillar_id : pillar_id,
            year : year,
            target : target,
            target_achieved : target_achieved,
            root_cause : root_cause,
            risk_and_opportunity : risk_and_opportunity,
            action : action,
            support_required : support_required,
            created_by : created_by,
            updated_by :updated_by });

        try {

            let response = await axios.post('/objectives/update', body, config)
            if (response.status == 201) {
                setshowloader(false);
                setEditOpen(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => {
                            setDescription("")
                            setKpiId([])
                            setId("")
                            setPillarId("")
                            setYear("")
                            setTarget("")
                            setTargetAchieved("")
                            setRootCause("")
                            setRiskAndOpportunity("")
                            setAction("")
                            setSupportRequired("")
                            dispatch(getUserObjectives(currentUser.id))
                        }
                    );

            } else {
                let error = response.data.message
                    setshowloader(false);
                    setEditOpen(false);
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
            setEditOpen(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }
    
    }


    const handleEditClose = () => {
        setEditOpen(false);
    };

    const columns = [
        {
          field: 'objectives.description',
          title: 'Strategic Objective'
        },
        {
          field: '',
          title: 'Variance',
          render: (list) => {
            if(list.objectives.overallStatus === 'COMPLETE' || list.objectives.overallStatus === 'Complete') {
                return (<FiberManualRecord style={{color : '#29A15B'}} />)
            }  else if(list.objectives.overallStatus === 'INCOMPLETE' || list.objectives.overallStatus === 'Incomplete' || list.objectives.overallStatus === null ) {
                return (<FiberManualRecord style={{color : '#F44336'}}/>) 
            }
          }
        },
        {
            field: 'var',
            title: 'Variance',
            export: true,
            hidden: true
            
          },
        {
          field: 'objectives.rootCause',
          title: 'Root Cause and Insight'
        },
        {
          field: 'objectives.action',
          title: 'Action'
        },
        {
          field: 'objectives.riskOrOpportunity',
          title: 'Risk/Opportunities'
        },
        {
          field: 'objectives.supportRequired',
          title: 'Support Required'
        },
        {
            field: '',
            title: 'Priorities for the quarter'
          },
        {
          field: '',
          title: 'Action',
          render: (list) => {
            console.log("editing table", list)
            return (<IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(list.objectives) }} ><EditIcon/></IconButton>)
          },
          export: false
        }
    ]

    const saveMonthlyUpdate = async(e)  => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

        if(idm === null || idm == undefined) {

            const body = JSON.stringify({
                actions : monthlyaction,
                nextPeriodActions : monthly_next_actions,
                riskOrOpportunity: monthly_risks,
                createdBy: created_by,
                userId: created_by
            })

            try {

                let response = await axios.post('/objectivesactions/create', body, config)
                    if (response.status == 201) {
                        setshowloader(false);
                        let item = response.data.message
                        console.log("here", item)
                        swal.fire({
                            title: "Success",
                            text: item,
                            icon: "success",
                        }).then(() => dispatch(getOMonthlyActions(currentUser.id)));
    
                    } else {
                        let error = response.data.message
                        setshowloader(false);
                        swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error",
                            dangerMode: true
                        }).then(() => dispatch(getOMonthlyActions(currentUser.id)));
                    }
            } catch (error) {
                let err = error.response.data.message
                setshowloader(false);
                swal.fire({
                    title: "Error",
                    text: err,
                    icon: "error",
                    dangerMode: true
                }).then(() => dispatch(getOMonthlyActions(currentUser.id)));
            } 

        } else {

            const body = JSON.stringify({
                action : monthlyaction,
                nextAction : monthly_next_actions,
                riskOpportunity: monthly_risks,
                updatedBy: created_by,
                userId: created_by,
                id: idm
            })

            console.log("m body", body)

            try {

                let response = await axios.post('/objectivesactions/update', body, config)
                    if (response.status == 201) {
                        setshowloader(false);
                        let item = response.data.message
                        console.log("here", item)
                        swal.fire({
                            title: "Success",
                            text: item,
                            icon: "success",
                        }).then(() => dispatch(getOMonthlyActions(currentUser.id)));
    
                    } else {
                        let error = response.data.message
                        setshowloader(false);
                        swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error",
                            dangerMode: true
                        }).then(() => dispatch(getOMonthlyActions(currentUser.id)));
                    }
            } catch (error) {
                let err = error.response.data.message
                setshowloader(false);
                swal.fire({
                    title: "Error",
                    text: err,
                    icon: "error",
                    dangerMode: true
                }).then(() => dispatch(getOMonthlyActions(currentUser.id)));
            } 

        } 

    }


  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Strategic Objectives</h4>
              </CardHeader>
              <CardBody>
              {/* <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div> */}

                {items !== null ? (
                    <MaterialTable
                    title="Strategic Objective Reports."
                    data={items}
                    columns={columns}
                    options={{
                        search: true,
                        sorting: true,
                        pageSize: 10,
                        pageSizeOptions: [10,50,100 ],
                        exportButton: true
                    }}
                    />
                ) : 

                    <MaterialTable
                    title="Strategic Objective Reports."
                    data={[]}
                    columns={columns}
                    options={{
                        search: true,
                        sorting: true,
                        pageSize: 10,
                        pageSizeOptions: [10,50,100 ],
                        exportButton: true
                    }}
                    />
                }

                <Grid
                    container
                    spacing={2}
                    direction="row"
                    >

                    <Grid item xs={12} md={12} sm={12}>
                        <h4 style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold'}}> Update Your Details</h4>
                    </Grid>

                    <Grid item xs={12} md={4} sm={4}  key="1">
                        <Card style={{ height: '70%'}}>
                            <CardContent>
                            <TextField
                                fullWidth
                                label="Action"
                                id="action"
                                multiline
                                rows={5}
                                required
                                variant="outlined"
                                className={classes.textInput}
                                type="text"
                                value={monthlyaction}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setMonthlyAction(value)
                                }}
                            />    
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4} sm={4}  key="2">   
                        <Card style={{ height: '70%'}}>
                            
                            <CardContent>
                            <TextField
                                fullWidth
                                label="Risk/Opportunities"
                                id="monthly_risks"
                                multiline
                                rows={5}
                                required
                                variant="outlined"
                                className={classes.textInput}
                                type="text"
                                value={monthly_risks}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setMonthlyRisks(value)
                                }}
                            />  
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4} sm={4} key="3"> 
                    <Card style={{ height: '70%'}}>
                        <CardContent>
                        <TextField
                                fullWidth
                                label="Next Periods Actions"
                                id="monthly_next_actions"
                                multiline
                                rows={5}
                                required
                                variant="outlined"
                                className={classes.textInput}
                                type="text"
                                value={monthly_next_actions}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setMonthlyNextActions(value)
                                }}
                            />       
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                
                <Grid container justify="flex-end">
                    <Button color="primary" size="lg" onClick={(e) => { saveMonthlyUpdate(e)}}> Save </Button> 
                </Grid>

                <Dialog open={editopen} onClose={handleEditClose}>
                    <DialogTitle>Strategic Objective</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Edit Strategic Objective 
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
                            <FormControl
                                fullWidth
                                className={classes.selectFormControl}
                            >
                                <InputLabel
                                htmlFor="multiple-select"
                                className={classes.selectLabel}
                                >
                                Select KPI
                                </InputLabel>
                                <Select
                                multiple
                                variant="outlined"
                                value={kpi_id}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setKpiId(value)
                                }}
                                MenuProps={{ className: classes.selectMenu }}
                                classes={{ select: classes.select }}
                                inputProps={{
                                    name: "multipleSelect",
                                    id: "multiple-select",
                                }}
                                >
                                    {kpis && kpis.map((option) => (
                                    <MenuItem key={option.id} value={option.id}
                                        classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelectedMultiple,
                                        }}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
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
                        <Button color="primary" onClick={(e) => { saveEdited(e) }}>Save</Button>
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
