import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
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
import { getKpis, getKMonthlyActions } from "actions/kpis";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import axios from "axios";
import { getCategories } from "actions/data";
import { Grid } from "@material-ui/core";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MaterialTable from 'material-table';
import { CardContent } from "@material-ui/core";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function KPIReport() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { items, monthly_data, monthly_data_error } = useSelector(state => state.kpi);
    const { user : currentUser } = useSelector(state => state.auth);
    const { categories }  = useSelector(state => state.data);
    // const { error : category_error, isLoading : category_loading}  = useSelector(state => state.data);

    console.log("categories", categories)
    console.log("monthly kpi", monthly_data, monthly_data_error)

    const [monthlyaction, setMonthlyAction ] = useState("");
    const [monthly_risks, setMonthlyRisks ] = useState("");
    const [monthly_next_actions, setMonthlyNextActions ] = useState("");
    const [idm, setIdM] = useState("");

    useEffect(() => {
        dispatch(getKpis(currentUser.id));
        dispatch(getCategories());
        dispatch(getKMonthlyActions(currentUser.id))
      }, []);

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

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    // const [deleteopen, setDeleteOpen] = useState(false);
    const [kpi, setKPI] = useState("");
    const [uom, setUnitOfMeasure] = useState("");
    const [category, setCategory] = useState("");
    const [showloader, setshowloader] = useState(false);  
    const [id, setId] = useState("");
    const [created_by, setCreatedBy] = useState(currentUser.id);
    const [updated_by, setUpdatedBy] = useState(currentUser.id);
    const [target, setTarget] = useState("");
    const [account, setAccount] = useState("");
    const [ytd_planned, setYTDPlanned] = useState("");
    const [ytd_actual, setYTDActual] = useState("");    const [action, setAction] = useState("");
    const [support_required, setSupportRequired] = useState("");
    const [root_cause, setRootCause] = useState("");

    const handleAddClickOpen = () => {
        setAddOpen(true);
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

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const setEditing = (list) => {
        console.log("edit", list);

        setKPI(list.title);
        setUnitOfMeasure(list.kpi_unit_of_measure);
        setCategory(list.categories.id);
        setId(list.id);
        setAccount(list.account);
        setTarget(list.target);
        setYTDPlanned(list.plannedYTD);
        setYTDActual(list.actualYTD)
        setSupportRequired(list.supportRequired);
        setAction(list.action);
        setRootCause(list.rootCause)
    }

    const saveEdited = async(e) => {
        e.preventDefault();
        setshowloader(true);

        console.log(setUpdatedBy());

        console.log("edit values", id, kpi, uom, category, created_by, updated_by)

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
        const body = JSON.stringify({ 
            title : kpi,
            kpiUnitOfMeasure : uom,
            categoryId : category,
            updatedBy : updated_by,
            id: id, 
            userId: created_by,
            account: account,
            target: target,
            plannedYTD: ytd_planned,
            actualYTD: ytd_actual,
            action: action,
            rootCause: root_cause,
            supportRequired: support_required
        });

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
          value: 'KES M',
          label: 'KES M',
        },
        {
            value: 'TSH M',
            label: 'TSH M',
        },
        {
            value: 'UGX M',
            label: 'UGX M',
        },
        {
            value: 'RWF M',
            label: 'RWF M',
        },
        {
            value: 'USD M',
            label: 'USD M',
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

    const columns = [
        {
          field: 'title',
          title: 'Measure'
        }, 
        {
          field: 'plannedYTD',
          title: 'Planned YTD'
        }, 
        {
          field: 'actualYTD',
          title: 'Actual YTD '
        }, 
        {
          field: 'var',
          title: 'Variance',
          render: (list) => {
            if(list.variance === 'amber') {
                return (<FiberManualRecord style={{color : '#FFC107'}}/>)
            } else if(list.variance === 'green') {
                return (<FiberManualRecord style={{color : '#29A15B'}}/>)
            } else if(list.variance === 'blue') {
                return (<FiberManualRecord style={{color : '#03A9F4'}}/>)
            } else if(list.variance === 'red') {
                return (<FiberManualRecord style={{color : '#F44336'}}/>)
            } else if(list.variance === null || list.variance === undefined) {
                return (<FiberManualRecord style={{color : '#F44336'}}/>)
            } 
          },
          export: false
        },
        {
          field: 'variance',
          title: 'Rag Status',
          export: true,
          hidden: true
        },
        {
         field: 'variance',
         title: 'Rag Status',
         export: true,
         hidden: true,
        //  render: (list) => {
        //     if(list.variance === 'amber') {
        //         return 'Amber';
        //     } else if(list.variance === 'green') {
        //         return 'Green';
        //     } else if(list.variance === 'blue') {
        //         return 'Blue';
        //     } else if(list.variance === 'red') {
        //         return 'Red';
        //     } else if(list.variance === null || list.variance === undefined) {
        //         return 'Red';
        //     } 
        //   },
        }, 
        {
          field: 'rootCause',
          title: 'Root Cause'
        },
        {
          field: 'action',
          title: 'Action'
        }, 
        {
          field: 'supportRequired',
          title: 'Support Required'
          }, 
        {
          field: 'actions',
          title: 'Actions',
          render: (list) => {
            console.log("editing table", list)
              return ( <div> <IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(list) }} ><EditIcon/></IconButton>
                </div>)
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

                let response = await axios.post('/kpiactions/create', body, config)
                    if (response.status == 201) {
                        setshowloader(false);
                        let item = response.data.message
                        console.log("here", item)
                        swal.fire({
                            title: "Success",
                            text: item,
                            icon: "success",
                        }).then(() => dispatch(getKMonthlyActions(currentUser.id)));
    
                    } else {
                        let error = response.data.message
                        setshowloader(false);
                        swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error",
                            dangerMode: true
                        }).then(() => dispatch(getKMonthlyActions(currentUser.id)));
                    }
            } catch (error) {
                let err = error.response.data.message
                setshowloader(false);
                swal.fire({
                    title: "Error",
                    text: err,
                    icon: "error",
                    dangerMode: true
                }).then(() => dispatch(getKMonthlyActions(currentUser.id)));
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

                let response = await axios.post('/kpiactions/update', body, config)
                    if (response.status == 201) {
                        setshowloader(false);
                        let item = response.data.message
                        console.log("here", item)
                        swal.fire({
                            title: "Success",
                            text: item,
                            icon: "success",
                        }).then(() => dispatch(getKMonthlyActions(currentUser.id)));
    
                    } else {
                        let error = response.data.message
                        setshowloader(false);
                        swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error",
                            dangerMode: true
                        }).then(() => dispatch(getKMonthlyActions(currentUser.id)));
                    }
            } catch (error) {
                let err = error.response.data.message
                setshowloader(false);
                swal.fire({
                    title: "Error",
                    text: err,
                    icon: "error",
                    dangerMode: true
                }).then(() => dispatch(getKMonthlyActions(currentUser.id)));
            } 

        } 

    }

  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>KPIs</h4>
              </CardHeader>
              <CardBody>
              <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div> 

              {items !== null ? (
                <MaterialTable
                title="KPIs"
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
                title="KPIs"
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
                            label="Planned YTD "
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
                                    id="ytd_planned"
                                    label="Planned YTD"
                                    type="number"
                                    fullWidth
                                    style={{marginBottom : '15px'}}
                                    value={ytd_planned}
                                    variant="outlined"
                                    onChange = {(event) => {
                                        setYTDPlanned(event.target.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6} lg={6} xl={6} sm={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="ytd_actual"
                                    label="Actual YTD "
                                    type="number"
                                    fullWidth
                                    style={{marginBottom : '15px'}}
                                    value={ytd_actual}
                                    variant="outlined"
                                    onChange = {(event) => {
                                        setYTDActual(event.target.value);
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
