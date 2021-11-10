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
import JsonData from "../../data/data.json";
import { getKpis, editKpi, addKpi } from "actions/kpis";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { LinearProgress } from "@material-ui/core";


import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function KPIs() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { items, item , error, isLoading } = useSelector(state => state.kpi);
    const { user : currentUser } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getKpis());
      }, []);

    const categories = JsonData.Categories;

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


    const handleAddClickOpen = () => {
        setAddOpen(true);
    };

    const saveKpi = e => {
        e.preventDefault();
        setshowloader(true);
        console.log(setCreatedBy())

        console.log("save values", kpi, uom, category, created_by)
    
        dispatch(addKpi(kpi, uom, category,created_by ))
        if (error) {
          setshowloader(false);
          swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              dangerMode: true
          });
        } else if(item) {
            setshowloader(false);
            swal.fire({
                title: "Success",
                text: item,
                icon: "success",
                dangerMode: false
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
    }

    const saveEdited = e => {
        e.preventDefault();
        setshowloader(true);

        console.log(setUpdatedBy());

        console.log("edit values", id, kpi, uom, category, created_by, updated_by)
    
        dispatch(editKpi(id, kpi, uom, category, created_by, updated_by ))
        if (error) {
            console.log("error", error)
          setshowloader(false);
          swal.fire({
              title: "Error",
              text: error,
              icon: "error",
          });
        } else if(item) {
            setshowloader(false);
            swal.fire({
                title: "Success",
                text: item.message,
                icon: "success",
                dangerMode: false
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
        }
    ]

  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>KPIs</h4>
                <p>
                  KPI details.
                </p>
              </CardHeader>
              <CardBody>
              { currentUser.role_id === 0 ? (<div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div> ) : null }

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>KPI</TableCell>
                            <TableCell>Unit Of Measure</TableCell>
                            <TableCell>Categories</TableCell>
                            { currentUser.role_id=== 0 ? ( <TableCell>Action</TableCell> ) : null }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items ? ( items.map((list, index) => (
                            <TableRow key={index}>
                                <TableCell>{list.title}</TableCell>
                                <TableCell>{list.kpi_unit_of_measure}</TableCell>
                                <TableCell>{list.categories.description} </TableCell>
                                { currentUser.role_id=== 0 ? ( <TableCell>
                                <IconButton aria-label="edit" color="primary" onClick={() => { handleEditClickOpen(); setEditing(list) }} ><EditIcon/></IconButton>
                                {/* <IconButton aria-label="delete" color="secondary" onClick={() => { handleDeleteClickOpen(); setDelete(list) }} ><DeleteIcon /></IconButton> */}
                                </TableCell> ) : null }
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
