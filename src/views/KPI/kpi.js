import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
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
import { getKpis } from "actions/kpis";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import { getCategories } from "actions/data";
import { Grid } from "@material-ui/core";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function KPIs() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { items, error, isLoading } = useSelector(state => state.kpi);
    const { user : currentUser } = useSelector(state => state.auth);
    const { categories }  = useSelector(state => state.data);
    // const { error : category_error, isLoading : category_loading}  = useSelector(state => state.data);

    console.log("categories", categories)

    useEffect(() => {
        dispatch(getKpis(currentUser.id));
        dispatch(getCategories());
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
    const [target_achieved, setTargetAchieved] = useState("");
    const [action, setAction] = useState("");
    // const [support_required, setSupportRequired] = useState("");
    // const [root_cause, setRootCause] = useState("");

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
        console.log(list);

        setKPI(list.title);
        setUnitOfMeasure(list.kpi_unit_of_measure);
        setCategory(list.categories.id);
        setId(list.id);
        setAccount(list.account);
        setTarget(list.target);
        setTargetAchieved(list.target_achieved);
        // setSupportRequired(list.supportRequired);
        setAction(list.action);
        // setRootCause(list.rootCause)
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
            createdBy : created_by,
            updatedBy : updated_by,
            id: id, 
            userId: created_by,
            account: account,
            target: target,
            targetAchieved: target_achieved,
            action: action
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

    const [sortModel, setSortModel] = React.useState([
        {
          field: 'commodity',
          sort: 'asc',
        },
      ]);

  return (
    <div>
      <GridContainer>
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
            <Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> 
        </Grid>

        <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>KPIs</h4>
                <p>
                  KPI details.
                </p>
              </CardHeader>
              <CardBody>

                <Table>
                    <TableHead>
                        <TableRow>
                            
                            <TableCell
                                sortModel={sortModel}
                                onSortModelChange={(model) => setSortModel(model)}>
                                     Category</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Unit Of Measure</TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell> YTD Planned </TableCell>
                            <TableCell> YTD Actual </TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { items === null || items === undefined ? (
                            <TableRow> <TableCell> No KPIs available </TableCell></TableRow>
                        ) : items ? ( items.map((list, index) => (
                            <TableRow key={index}>
                                <TableCell>{list.categories.description}</TableCell>
                                <TableCell>{list.title}</TableCell>
                                <TableCell>{list.kpi_unit_of_measure}</TableCell>
                                <TableCell>{list.account}</TableCell>
                                <TableCell>{list.target} </TableCell>
                                <TableCell>{list.target_achieved} </TableCell>
                                <TableCell><IconButton aria-label="edit" className={classes.textGreen} onClick={() => { handleEditClickOpen(); setEditing(list) }} ><EditIcon/></IconButton> </TableCell>
                                {/* <IconButton aria-label="delete" color="secondary" onClick={() => { handleDeleteClickOpen(); setDelete(list) }} ><DeleteIcon /></IconButton> */}
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
                            label="YTD Planned"
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
                                    label="YTD Planned"
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
                                    label="YTD Actual"
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
                        /> */}

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
