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
import { getCategories } from "actions/data";
import { getKpis } from "actions/kpis";
import { LinearProgress } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from "moment";
import { Grid } from "@material-ui/core";
import axios from "axios";

// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

// const useStyles = makeStyles(styles);

export default function myKpis() {
    // const classes = useStyles();
    const dispatch = useDispatch();

    const { items, item, error, isLoading } = useSelector(state => state.objective);
    const {  categories } = useSelector(state => state.data);
    const { user: currentUser } = useSelector(state => state.auth);
    const {  items : kpis } = useSelector(state => state.kpi);

    console.log("sumbua",item)

    useEffect(() => {
        dispatch(getUserObjectives(currentUser.id));
        dispatch(getCategories());
        dispatch(getKpis());
    }, [])

    const [addopen, setAddOpen] = useState(false);
    const [editopen, setEditOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [uom, setUnitOfMeasure] = useState("");
    const [category, setCategory] = useState("");
    const [target, setTarget] = useState("");
    const [target_achieved_on_review, setTargetAtReview] = useState("");
    const [target_achieved, setTargetAchieved] = useState("");
    const [showloader, setshowloader] = useState(false);  
    const [id, setId] = useState("");
    const [created_by, setCreatedBy] = useState(currentUser.id);
    const [updated_by, setUpdatedBy] = useState(currentUser.id);
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [kpi_id, setKpiId] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);

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

        setDescription(list.kpi.title);
        setKpiId(list.kpi.id);
        setId(list.id);
        setTarget(list.target);
        setTargetAchieved(list.target_achieved);
        setTargetAtReview(list.target_achieved_on_review);
        setStartDate(list.start_date);
        setEndDate(list.end_date)
    }

    const saveEdited = async (e) => {
        e.preventDefault();
        setshowloader(true);
        let end_date = moment(end_date).format('YYYY-MM-DD');
        let start_date = moment(start_date).format('YYYY-MM-DD');

        console.log("edit values", id, description, end_date, kpi_id, start_date, target, user_id, target_achieved, target_achieved_on_review, setUpdatedBy(), setUserId)

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
        const body = JSON.stringify({ id, description, kpi_id, user_id, start_date, end_date,  target, target_achieved, target_achieved_on_review, created_by, updated_by });

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
                <h4>User KPIs</h4>
                <p>
                User KPI details.
                </p>
              </CardHeader>
              <CardBody>
              {/* <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div> */}

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>KPI</TableCell>
                            <TableCell>Categories</TableCell>
                            <TableCell>Unit Of Measure</TableCell>
                            <TableCell>Target</TableCell>
                            <TableCell>Target Achieved</TableCell>
                            <TableCell>Target At Review</TableCell>
                            <TableCell>Variance</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items ? ( items.map((list, index) => (
                            <TableRow key={index}>
                                <TableCell>{list.objectives.description}</TableCell>
                                <TableCell>{list.objectives.kpi.categories.description} </TableCell>
                                <TableCell>{list.objectives.kpi.kpi_unit_of_measure}</TableCell>
                                <TableCell>{list.objectives.target} </TableCell>
                                <TableCell>{list.objectives.target_achieved} </TableCell>
                                <TableCell>{list.objectives.target_achieved_on_review} </TableCell>
                                <TableCell></TableCell>
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
                            type="text"
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
                            color="#00BFFF"
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
                            {kpis.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.title}
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
                                    format="yyyy/dd/MM"
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
                                    format="yyyy/dd/MM"
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


                        <TextField
                            autoFocus
                            margin="dense"
                            id="target"
                            label="Target"
                            type="text"
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
                                    id="target_achieved_on_review"
                                    label="Target At Review"
                                    type="text"
                                    fullWidth
                                    style={{marginBottom : '15px'}}
                                    value={target_achieved_on_review}
                                    variant="outlined"
                                    onChange = {(event) => {
                                        setTargetAtReview(event.target.value);
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

                    </DialogContent>
                    <DialogActions>
                    <Button color="danger" onClick={handleEditClose}>Cancel</Button>
                    { showloader === true ? (
                      <div style={{ textAlign: "center", marginTop: 10 }}>
                        <Loader
                            type="Puff"
                            color="#00BFFF"
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
