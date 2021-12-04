import React, { useEffect, useState,  } from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { getBehaviours, getFreedoms, getConstraints } from "actions/bfc";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardHeader from "components/Card/CardHeader";
import { CardContent } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "components/Card/Card.js";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "components/CustomButtons/Button.js";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import IconButton from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(styles);

export default function BFC() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth);
    const { behaviours, behaviours_error, isLoading, freedoms, freedoms_error, constraints, constrains_error} = useSelector(state => state.bfc);

    const [addBopen, setAddBOpen] = useState(false);
    const [addFopen, setAddFOpen] = useState(false);
    const [addCopen, setAddCOpen] = useState(false);
    const [editBopen, setEditBOpen] = useState(false);
    const [editFopen, setEditFOpen] = useState(false);
    const [editCopen, setEditCOpen] = useState(false);
    const [behaviour_description, setBehaviour] = useState("");
    const [freedom_description, setFreedom] = useState("");
    const [constraint_description, setConstraint] = useState("");
    const [showloader, setshowloader] = useState(false); 
    const [created_by, setCreatedBy] = useState("");
    const [updated_by, setUpdatedBy] = useState("");
    const [behaviourId, setBehaviourId] = useState("");
    const [freedomId, setFreedomId] = useState("");
    const [constaraintId, setConstraintId] = useState("");

    console.log("beh", behaviours, updated_by);


    useEffect(() => {
        dispatch(getBehaviours(currentUser.id));
        dispatch(getFreedoms(currentUser.id));
        dispatch(getConstraints(currentUser.id))
        setCreatedBy(currentUser.id)
        setUpdatedBy(currentUser.id)
    }, []);

    const handleAddBehaviourClickOpen = () => {
        setAddBOpen(true);
    };

    const handleAddBehaviourClose = () => {
        setAddBOpen(false);
    };

    const handleEditBehaviourOpen = () => {
        setEditBOpen(true);
    };

    const handleEditBehaviourClose = () => {
        setEditBOpen(false);
    };

    const handleAddFreedomsClickOpen = () => {
        setAddFOpen(true);
    };

    const handleAddFreedomClose = () => {
        setAddFOpen(false);
    };

    const handleEditFreedomOpen = () => {
        setEditFOpen(true);
    };

    const handleEditFreedomClose = () => {
        setEditCOpen(false);
    };

    const handleAddConstraintsClickOpen = () => {
        setAddCOpen(true);
    }

    const handleAddConstraintClose = () => {
        setAddCOpen(false);
    };

    const handleEditConstraintOpen = () => {
        setEditCOpen(true)
    }

    const handleEditConstraintClose = () => {
        setEditCOpen(false)
    }

    const handleBehaviourSave = async(e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        const body = JSON.stringify({ 
            createdBy: created_by,
            description: behaviour_description,
            userId: created_by
        });

        try {

            let response = await axios.post('/behaviours/create', body, config)
                if (response.status == 201) {
                    setshowloader(false);
                    setAddBOpen(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => dispatch(getBehaviours(currentUser.id)));
    
                } else {
                    let error = response.data.message
                    setshowloader(false);
                    setAddBOpen(false);
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
            setAddBOpen(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }

    }

    const handleFreedomSave = async(e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        const body = JSON.stringify({ 
            createdBy: created_by,
            description: behaviour_description,
            userId: created_by
        });

        try {

            let response = await axios.post('/freedoms/create', body, config)
                if (response.status == 201) {
                    setshowloader(false);
                    setAddFOpen(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => dispatch(getFreedoms(currentUser.id)));
    
                } else {
                    let error = response.data.message
                    setshowloader(false);
                    setAddFOpen(false);
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
            setAddFOpen(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }

    }

    const handleConstraintSave = async(e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        const body = JSON.stringify({ 
            createdBy: created_by,
            description: behaviour_description,
            userId: created_by
        });

        try {

            let response = await axios.post('/constraints/create', body, config)
                if (response.status == 201) {
                    setshowloader(false);
                    setAddCOpen(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => dispatch(getConstraints(currentUser.id)));
    
                } else {
                    let error = response.data.message
                    setshowloader(false);
                    setAddCOpen(false);
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
            setAddCOpen(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }

    }

    const setEditingBehaviour = (list) => {
        setBehaviour(list.currentDescription)
        setCreatedBy(list.createdBy)
        setBehaviourId(list.id)
    }

    const editbehaviour = async (e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        const body = JSON.stringify({ 
            updatedBy: created_by,
            description: behaviour_description,
            userId: created_by,
            id : behaviourId
        });

        try {

            let response = await axios.post('/behaviours/update', body, config)
                if (response.status == 201) {
                    setshowloader(false);
                    setEditBOpen(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => dispatch(getBehaviours(currentUser.id)));
    
                } else {
                    let error = response.data.message
                    setshowloader(false);
                    setEditBOpen(false);
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
            setEditBOpen(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }

    }

    const setEditingFreedom = (list)  => {
        setFreedom(list.currentDescription)
        setCreatedBy(list.createdBy)
        setFreedomId(list.id)
        
    }

    const editFreedom = async (e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        const body = JSON.stringify({ 
            updatedBy: created_by,
            description: freedom_description,
            userId: created_by,
            id : freedomId
        });

        try {

            let response = await axios.post('/freedoms/update', body, config)
                if (response.status == 201) {
                    setshowloader(false);
                    setEditFOpen(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => dispatch(getFreedoms(currentUser.id)));
    
                } else {
                    let error = response.data.message
                    setshowloader(false);
                    setEditFOpen(false);
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
            setEditFOpen(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            });
        }

    }

    const setEditingConstraint = (list)  => {
        setConstraint(list.currentDescription)
        setCreatedBy(list.createdBy)
        setConstraintId(list.id)
    }

    const editConstraint = async (e) => {
        e.preventDefault();
        setshowloader(true);

        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        const body = JSON.stringify({ 
            updatedBy: created_by,
            description: constraint_description,
            userId: created_by,
            id : constaraintId
        });

        try {

            let response = await axios.post('/constraints/update', body, config)
                if (response.status == 201) {
                    setshowloader(false);
                    setEditCOpen(false);
                    let item = response.data.message
                    swal.fire({
                        title: "Success",
                        text: item,
                        icon: "success",
                    }).then(() => dispatch(getConstraints(currentUser.id)));
    
                } else {
                    let error = response.data.message
                    setshowloader(false);
                    setEditCOpen(false);
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
            setEditCOpen(false);
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
            <Grid
            container
            spacing={2}
            direction="row"
            >
                <Grid item xs={4} key="1">
                <Card>
                    <h4 style={{color: 'black', textAlign:'center'}}> Behaviours </h4>
                    <Grid container justify="flex-end" style={{ marginTop: '5px', paddingRight: '5px' }}>
                        <Button color="primary" onClick={handleAddBehaviourClickOpen}> Add</Button>
                    </Grid>

                    <CardHeader
                    title="Behaviours"
                    subheader=""
                    />
                    <CardContent>
                    <Table className={classes.tableBorder}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {behaviours ? ( behaviours.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.currentDescription}</TableCell>
                                    <TableCell> <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditBehaviourOpen(); setEditingBehaviour(list) }} ><EditIcon /></IconButton></TableCell>
                                </TableRow>
                            ))) : behaviours_error ? (<TableRow> <TableCell> {behaviours_error} </TableCell></TableRow> 
                            ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }
                        </TableBody>
                    </Table>      
                    </CardContent>
                </Card>
                </Grid>

                <Grid item xs={4} key="2">   
                <Card>
                    <h4 style={{color: 'black', textAlign:'center'}}> Freedoms </h4>          
                    <Grid container justify="flex-end" style={{marginTop: '5px', paddingRight: '5px' }}>
                        <Button color="primary" onClick={handleAddFreedomsClickOpen}> Add</Button>
                    </Grid> 
                    <CardHeader
                    title="Freedoms"
                    subheader=""
                    />
                    <CardContent>
                    <Table className={classes.tableBorder}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {freedoms ? ( freedoms.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.currentDescription}</TableCell>
                                    <TableCell> <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditFreedomOpen(); setEditingFreedom(list) }} ><EditIcon /></IconButton></TableCell>
                                </TableRow>
                            ))) : freedoms_error ? (<TableRow> <TableCell> {freedoms_error} </TableCell></TableRow> 
                            ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }
                        </TableBody>
                    </Table> 
                    </CardContent>
                </Card>
                </Grid>

                <Grid item xs={4} key="3"> 
                <Card>
                    <h4 style={{color: 'black', textAlign:'center'}}> Constraints</h4>
                    <Grid container justify="flex-end" style={{marginTop: '5px', paddingRight: '5px' }}>
                        <Button color="primary" onClick={handleAddConstraintsClickOpen}> Add</Button>
                    </Grid> 
                    <CardHeader
                    title="Constraints"
                    subheader=""
                    />
                    <CardContent>
                    <Table className={classes.tableBorder}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {constraints ? ( constraints.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.currentDescription}</TableCell>
                                    <TableCell> <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditConstraintOpen(); setEditingConstraint(list) }} ><EditIcon /></IconButton></TableCell>
                                </TableRow>
                            ))) : constrains_error ? (<TableRow> <TableCell> {constrains_error} </TableCell></TableRow> 
                            ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }
                        </TableBody>
                    </Table>      
                    </CardContent>
                </Card>
                </Grid>
            </Grid>

            {/* Add Modals */}
            <Dialog open={addBopen} onClose={handleAddBehaviourClose}>
                <DialogTitle>Add Behaviour</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create New Behaviour
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="behaviour_description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={behaviour_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setBehaviour(value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleAddBehaviourClose}>Cancel</Button>
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
                            <Button color="primary" onClick={handleBehaviourSave}>Save</Button>
                        )}
                </DialogActions>
            </Dialog>

            <Dialog open={addFopen} onClose={handleAddFreedomClose}>
                <DialogTitle>Add Freedom</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create New Freedom
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="freedom_description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={freedom_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setFreedom(value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleAddFreedomClose}>Cancel</Button>
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
                            <Button color="primary" onClick={handleFreedomSave}>Save</Button>
                        )}
                </DialogActions>
            </Dialog>

            <Dialog open={addCopen} onClose={handleAddConstraintClose}>
                <DialogTitle>Add Constraints</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create New Constraints
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="constraint_description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={constraint_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setConstraint(value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleAddConstraintClose}>Cancel</Button>
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
                            <Button color="primary" onClick={handleConstraintSave}>Save</Button>
                        )}
                </DialogActions>
            </Dialog>

            {/* Edit Modals */}
            <Dialog open={editBopen} onClose={handleEditBehaviourClose}>
                <DialogTitle>Edit Behaviour</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update Behaviour
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="behaviour_description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={behaviour_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setBehaviour(value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleEditBehaviourClose}>Cancel</Button>
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
                            <Button color="primary" onClick={editbehaviour}>Save</Button>
                        )}
                </DialogActions>
            </Dialog>

            <Dialog open={editFopen} onClose={handleEditFreedomClose}>
                <DialogTitle>Edit Freedom</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update Freedom
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="freedom_description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={freedom_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setFreedom(value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleEditFreedomClose}>Cancel</Button>
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
                            <Button color="primary" onClick={editFreedom}>Save</Button>
                        )}
                </DialogActions>
            </Dialog>

            <Dialog open={editCopen} onClose={handleEditConstraintClose}>
                <DialogTitle>Edit Constraints</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update Constraints
                    </DialogContentText>
                    <TextField
                        fullWidth
                        label="Description"
                        id="constraint_description"
                        multiline
                        rows={4}
                        variant="outlined"
                        className={classes.textInput}
                        type="text"
                        value={constraint_description}
                        onChange={(event) => {
                            const value = event.target.value;
                            setConstraint(value)
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color="danger" onClick={handleEditConstraintClose}>Cancel</Button>
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
                            <Button color="primary" onClick={editConstraint}>Save</Button>
                        )}
                </DialogActions>
            </Dialog>

        </div>
    )

}