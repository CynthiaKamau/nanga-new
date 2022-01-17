import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCategories } from "actions/data";
import { getKpis } from "actions/kpis";
import EditIcon from '@material-ui/icons/Edit';
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import axios from "axios";
import { Grid, IconButton } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from 'material-table';
import { DeleteForever, FiberManualRecord, CompareArrows } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function DataTable() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { items } = useSelector(state => state.kpi);
    const { user : currentUser } = useSelector(state => state.auth);
    const { categories }  = useSelector(state => state.data);
    // const { error : category_error, isLoading : category_loading}  = useSelector(state => state.data);

    console.log("kpi", items)

    console.log()

    useEffect(() => {
        dispatch(getKpis(currentUser.id));
        dispatch(getCategories());
      }, []);

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [deleteopen, setDeleteOpen] = useState(false);
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
    const [ytd_actual, setYTDActual] = useState("");
    const [deleteId, setDeleteId] = useState("");
    // const [action, setAction] = useState("");
    // const [support_required, setSupportRequired] = useState("");
    // const [root_cause, setRootCause] = useState("");

    console.log(setId);

    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const handleEditClickOpen = () => {
        setEditOpen(true);
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
                    console.log("here", item)
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => {
                        setKPI("")
                        setUnitOfMeasure("")
                        setCategory("")
                        setAccount("")
                        setTarget("")
                        dispatch(getKpis(currentUser.id));

                    })
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

    const saveEdited = async(e) => {
        e.preventDefault();
        setshowloader(true);

        console.log("edit values", id, kpi, uom, category, created_by, updated_by)

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
            plannedYTD: ytd_planned,
            actualYTD: ytd_actual,
        });
        console.log("kpi", body);

        try {

            let response = await axios.post('/kpi/update', body, config)
            if (response.status == 200) {
                setshowloader(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => {
                        setKPI("");
                        setUnitOfMeasure("");
                        setCategory("");
                        setId("");
                        setAccount("");
                        setTarget("");
                        setYTDPlanned("");
                        setYTDActual("");
                        dispatch(getKpis(currentUser.id))
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

    const setEditing = (list) => {
        console.log("my kpi",list);
        console.log(setUpdatedBy());

        setKPI(list.title);
        setUnitOfMeasure(list.kpi_unit_of_measure);
        setCategory(list.categories.id);
        setId(list.id);
        setAccount(list.account);
        setTarget(list.target);
        setYTDPlanned(list.plannedYTD);
        setYTDActual(list.actualYTD);
        setUpdatedBy(list.user_id);
        // setSupportRequired(list.supportRequired);
        // setAction(list.action);
        // setRootCause(list.rootCause)
    }

    const handleDeleteClickOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    const setDeleting = (list) => {
        console.log("delete items",list)
        setDeleteId(list.id)
    }

    const deleteKPI = async(e) => {
        e.preventDefault();
        setshowloader(true);

        try {

            let response = await axios.delete(`/kpi/deleteKpiById?kpi_id=${deleteId}`)
            if (response.status == 200) {
                setshowloader(false);
                setDeleteOpen(false);
                console.log("here", response.data)
                let item = response.data.message

                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => dispatch(getKpis(currentUser.id)));
            } else {
                setshowloader(false);
                setDeleteOpen(false);
                let error = response.data.message
                    setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        dangerMode: true
                    }).then(() => dispatch(getKpis(currentUser.id)));
            } 
        } catch(error) {
            setshowloader(false);
            setDeleteOpen(false);
            let err = error.response.data.message
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            }).then(() => dispatch(getKpis(currentUser.id)));
        } 

    }

    const handleAddClose = () => {
        setAddOpen(false);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleInvert = async(list) => {
        setshowloader(true);
        console.log("list", list);

        try {

            let response = await axios.get(`/kpi/invert?kpi_id=${list.id}`)
            if (response.status == 200) {
                setshowloader(false);
                console.log("here", response.data)
                dispatch(getKpis(currentUser.id))
            } else {
                setshowloader(false);
                console.log("here else", response.data)
                dispatch(getKpis(currentUser.id))
            } 
        } catch(e) {
            setshowloader(false);
            console.log("here err", e)
            dispatch(getKpis(currentUser.id))
        } 
    }

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
          value: 'KES  M',
          label: 'KES  M',
        },
        {
            value: 'TSH  M',
            label: 'TSH M',
        },
        {
            value: 'UGX  M',
            label: 'UGX  M',
        },
        {
            value: 'RWF  M',
            label: 'RWF  M',
        },
        {
            value: 'USD  M',
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
            field: 'categories.description',
            title: 'Category'
        },
        {
          field: 'title',
          title: 'Title'
        },
        {
          field: 'kpi_unit_of_measure',
          title: 'Unit Of Measure'
        },
        {
          field: 'account',
          title: 'Account'
        },
        {
            field: 'target',
            title: 'Target'
        },
        {
          field: 'plannedYTD',
          title: 'Planned YTD'
        },
        {
          field: 'actualYTD',
          title: 'Actual YTD'
        },
        {
          field: '',
          title: 'VAR',
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
            }
        }, 
        {
          field: 'actions',
          title: 'Actions',
          render: (list) => {
            return ( <div><IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(list)}}><EditIcon /></IconButton>
            <IconButton aria-label="invert" color="primary" onClick={() => { handleInvert(list) }} ><CompareArrows /></IconButton>
            <IconButton aria-label="delete" style={{color: 'black'}} onClick={() => { setDeleting(list), handleDeleteClickOpen() }} ><DeleteForever /></IconButton>
            </div>)
          }
    
        }
      ];

  return (
    <div style={{ width: '100%' }}>
        <GridContainer>
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
            <Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> 
        </Grid>

        <GridItem xs={12} sm={12} md={12} >
            <Card>
                <CardHeader color="primary">
                    <h4>KPIS </h4>
                </CardHeader>
                <CardBody>
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
                        }}
                    />
                    }
                    
                </CardBody>
            </Card>

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
                        label="Target For The Year"
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

                    <TextField
                            autoFocus
                            margin="dense"
                            id="target"
                            label="Target For The Year"
                            type="number"
                            fullWidth
                            style={{marginBottom : '15px'}}
                            value={target}
                            variant="outlined"
                            onChange = {(event) => {
                                setTarget(event.target.value);
                            }}
                        />

                    <Grid container spacing={2}>
                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="ytd_planned"
                                label="YTD Planned"
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
                                label="YTD Actual"
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

                    {/* <TextField
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
                    /> */}

                    {/* <TextField
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
                    /> */}

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
                        height={100}
                        width={100}
                    />
                    </div>
                    ) :
                    (
                    <Button color="primary" onClick={(e) => { handleEditClose(); saveEdited(e) }}>Save</Button>
                    )}
                </DialogActions>
            </Dialog>

            <Dialog open={deleteopen} onClose={handleDeleteClose}>
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this KPI?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm that you want to delete this KPI.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="danger" onClick={handleDeleteClose}>Disagree</Button>
                { showloader === true ? (
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
                        <Button color="primary" onClick={(e) => { deleteKPI(e)}} > Agree</Button>
                    )}
                </DialogActions>
            </Dialog>

        </GridItem>
      </GridContainer>
    </div>
  );
}