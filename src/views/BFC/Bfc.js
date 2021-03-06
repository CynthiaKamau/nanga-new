import React, { useEffect, useState,  } from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { getBehaviours, getFreedoms, getConstraints } from "actions/bfc";
import { getStrategicIntent1 } from "actions/data";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardHeader from "components/Card/CardHeader";
import { CardContent } from "@material-ui/core";
import { Grid, IconButton } from "@material-ui/core";
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
import { DeleteForever} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(styles);

export default function BFC() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth);
    const { behaviours, behaviours_error, freedoms, freedoms_error, constraints, constrains_error} = useSelector(state => state.bfc);
    const { strategic_intent1 } = useSelector(state => state.data);

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
    const [behaviourDeleteId, setBehaviourDeleteId] = useState("");
    const [freedomDeleteId, setFreedomDeleteId] = useState("");
    const [constaraintDeleteId, setConstraintDeleteId] = useState("");
    const [userstrategicintent0, setStrategicIntent0] = useState("");
    const [userstrategicintent1, setStrategicIntent1] = useState("");
    const [userstrategicintent2, setStrategicIntent2] = useState("");
    const [strategic_intent1_id, setStrategicIntent1Id] = useState("");
    const [user_id, setUserId] = useState(currentUser.id);
    const [editopensil1, setEditSIL1Open] = useState(false);
    const [deletebehaviouropen, setDeleteBehaviourOpen] = useState(false);
    const [deletefreedomsopen, setDeleteFreedomsOpen] = useState(false);
    const [deleteconstraintsopen, setDeleteConstraintsOpen] = useState(false);

    // const [strategic_intent2_id, setStrategicIntent2Id] = useState("");

    console.log("beh", behaviours, updated_by, setUserId);
    
    useEffect(() => {
        dispatch(getBehaviours(currentUser.id));
        dispatch(getFreedoms(currentUser.id));
        dispatch(getConstraints(currentUser.id))
        setCreatedBy(currentUser.id)
        setUpdatedBy(currentUser.id)
        dispatch(getStrategicIntent1(currentUser.id))
    }, []);

    console.log("constraints", constraints)


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
                    }).then(() => {
                        setBehaviour("");
                        setCreatedBy(currentUser.id)
                        dispatch(getBehaviours(currentUser.id))
                    }) 
    
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
            description: freedom_description,
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
                    }).then(() =>  {
                        setFreedom("");
                        setCreatedBy(currentUser.id)
                        dispatch(getFreedoms(currentUser.id))
                    });
    
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
            description: constraint_description,
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
                    }).then(() => {
                        setConstraint("")
                        setCreatedBy(currentUser.id)
                        dispatch(getConstraints(currentUser.id))
                    });
    
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
                    }).then(() => {
                        setBehaviour("");
                        dispatch(getBehaviours(currentUser.id))
                    });
    
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
                    }).then(() => {
                        setFreedom("");
                        dispatch(getFreedoms(currentUser.id))
                    });
    
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
                    }).then(() => {
                        setConstraint("")
                        dispatch(getConstraints(currentUser.id))
                    });
    
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

    const handleEditSIL1Close = () => {
        setEditSIL1Open(false);
    }

    const handleEditSIL1Open = () => {
        setEditSIL1Open(true);
    }
    
    const setEditingStrategicIntent1 = (strategic_intent1) => {
        console.log("strategic_intent1 here", strategic_intent1)
        console.log("strategic_intent1 here here", strategic_intent1[0])
        if(strategic_intent1.length < 1 ||strategic_intent1 === undefined || strategic_intent1 === null ) {
          setStrategicIntent1('');
          setStrategicIntent2('');
          setStrategicIntent0('');
          setStrategicIntent1Id(null);
        } else {
          setStrategicIntent1(strategic_intent1[0].level_up_one)
          setStrategicIntent2(strategic_intent1[0].level_up_two)
          setStrategicIntent0(strategic_intent1[0].strategic_intent)
          setStrategicIntent1Id(strategic_intent1[0].id)
        }
      }

    const editStrategicIntent1 = async (e) => {
        e.preventDefault();
        setshowloader(true);
    
        const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }
    
        if(strategic_intent1_id === null) {
    
          const body = JSON.stringify({
            levelUpTwo : userstrategicintent2,
            levelUpOne : userstrategicintent1,
            userId : user_id,
            createdBy : user_id,
            strategicIntent : userstrategicintent0
          });
    
          try {
    
            let response = await axios.post('/strategicintent/create', body, config)
            if (response.status == 201) {
    
              let res = response.data.message;
              setshowloader(false);
              setEditSIL1Open(false);
    
              swal.fire({
                title: "Success",
                text: res,
                icon: "success",
              }).then(() => {
                setStrategicIntent1("")
                setStrategicIntent2("")
                setStrategicIntent0("")
                setCreatedBy(currentUser.id)
                dispatch(getStrategicIntent1(currentUser.id))

            })
              
    
          } else {
            setshowloader(false);
            setEditSIL1Open(false);
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
              setEditSIL1Open(false);
    
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
                id : strategic_intent1_id,
                level_up_one : userstrategicintent1,
                level_up_two : userstrategicintent2,
                strategic_intent : userstrategicintent0
              });
    
              let response = await axios.post('/strategicintent/update', body, config)
              console.log("level 1 resp", response.data)
              if (response.status == 201) {
                setshowloader(false);
                setEditSIL1Open(false);
    
                let resp = response.data.message;
                  swal.fire({
                    title: "Success",
                    text: resp,
                    icon: "success",
                  }).then(() =>  {
                    setStrategicIntent1("")
                    setStrategicIntent2("")
                    setStrategicIntent0("")
                    dispatch(getStrategicIntent1(currentUser.id))
                  })
    
              } else {
                setshowloader(false);
                setEditSIL1Open(false);
    
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
              setEditSIL1Open(false);
    
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
    
    const handleDeleteBehaviourClickOpen = () => {
        setDeleteBehaviourOpen(true);
    };

    const handleDeleteBehaviourClose = () => {
        setDeleteBehaviourOpen(false);
    };

    const handleDeleteConstraintsClickOpen = () => {
        setDeleteConstraintsOpen(true);
    };

    const handleDeleteConstraintsClose = () => {
        setDeleteConstraintsOpen(false);
    };

    const handleDeleteFreedomsClickOpen = () => {
        setDeleteFreedomsOpen(true);
    };

    const handleDeleteFreedomsClose = () => {
        setDeleteFreedomsOpen(false);
    };

    const setDeletingBehaviour =(list) => {
        setBehaviourDeleteId(list.id)
    }

    const deleteBehaviour = async(e) => {
        e.preventDefault();
        setshowloader(true);

        try {

            let response = await axios.delete(`/behaviours/deleteBehaviourById?behaviour_id=${behaviourDeleteId}`)
            if (response.status == 200) {
                setshowloader(false);
                setDeleteBehaviourOpen(false);
                console.log("here", response.data)
                let item = response.data.message

                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => dispatch(getBehaviours(currentUser.id)));
            } else {
                setshowloader(false);
                setDeleteBehaviourOpen(false);
                let error = response.data.message
                    setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        dangerMode: true
                    }).then(() => dispatch(getBehaviours(currentUser.id)));
            } 
        } catch(error) {
            setshowloader(false);
            setDeleteBehaviourOpen(false);
            let err = error.response.data.message
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            }).then(() => dispatch(getBehaviours(currentUser.id)));
        } 

    }

    const setDeletingFreedoms =(list) => {
        setFreedomDeleteId(list.id)
    }

    const deleteFreedoms = async(e) => {
        e.preventDefault();
        setshowloader(true);

        try {

            let response = await axios.delete(`/freedoms/deleteFreedomById?freedom_id=${freedomDeleteId}`)
            if (response.status == 200) {
                setshowloader(false);
                setDeleteFreedomsOpen(false);
                console.log("here", response.data)
                let item = response.data.message

                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => dispatch(getFreedoms(currentUser.id)));
            } else {
                setshowloader(false);
                setDeleteFreedomsOpen(false);
                let error = response.data.message
                    setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        dangerMode: true
                    }).then(() => dispatch(getFreedoms(currentUser.id)));
            } 
        } catch(error) {
            setshowloader(false);
            setDeleteFreedomsOpen(false);
            let err = error.response.data.message
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            }).then(() => dispatch(getFreedoms(currentUser.id)));
        } 

    }

    const setDeletingConstraints =(list) => {
        setConstraintDeleteId(list.id)
    }

    const deleteConstraints = async(e) => {
        e.preventDefault();
        setshowloader(true);

        try {

            let response = await axios.delete(`/constraints/deleteConstraintsById?constraints_id=${constaraintDeleteId}`)
            if (response.status == 200) {
                setshowloader(false);
                setDeleteConstraintsOpen(false);
                console.log("here", response.data)
                let item = response.data.message

                swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => dispatch(getConstraints(currentUser.id)));
            } else {
                setshowloader(false);
                setDeleteConstraintsOpen(false);
                let error = response.data.message
                    setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: error,
                        icon: "error",
                        dangerMode: true
                    }).then(() => dispatch(getConstraints(currentUser.id)));
            } 
        } catch(error) {
            setshowloader(false);
            setDeleteConstraintsOpen(false);
            let err = error.response.data.message
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: err,
                icon: "error",
                dangerMode: true
            }).then(() => dispatch(getConstraints(currentUser.id)));
        } 

    }
   
    return (
        <div>

            <Grid
            container
            spacing={2}
            direction="row"
            >
                <Grid item xs={12} md={12} sm={12} key="2" style={{margin: '0', padding: '0px'}}>     
                <IconButton  style={{float: 'right'}} aria-label="edit" color="primary" onClick={() => { handleEditSIL1Open(); setEditingStrategicIntent1(strategic_intent1) }} ><EditIcon style={{ color : '#000000'}}/></IconButton>


                <Card>
                    <h4 style={{color: 'black', textAlign:'center'}}> Mission: Two Levels Up </h4>          
                    <CardBody >
                        {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
                        <h4> Not available.</h4>
                        ) : strategic_intent1 ? (
                        <h4 > {strategic_intent1[0].level_up_two}</h4>
                        ) : null}
                    </CardBody>
                </Card>
                </Grid>

                <Grid item xs={12} md={12} sm={12} key="1" style={{margin: '0', padding: '0px'}}>
                <Card>
                    <h4 style={{color: 'black', textAlign:'center'}}> Mission: One Level Up </h4>

                    <CardBody >
                        {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
                        <h4>Not available.</h4>
                        ) : strategic_intent1 ? (
                        <h4 > {strategic_intent1[0].level_up_one}</h4>
                        ) : null}
                    </CardBody>

                    </Card>
                </Grid>

                <Grid item xs={12} md={12} sm={12} key="0" style={{margin: '0px', padding: '0px'}}>
                    <Card>
                    <h4 style={{color: 'black', textAlign:'center'}}> MY MISSION </h4>

                    <CardBody >
                        {strategic_intent1 === undefined || strategic_intent1 === null || strategic_intent1.length === 0 ? (
                        <h4>Not available.</h4>
                        ) : strategic_intent1 ? (
                        <h4 > {strategic_intent1[0].strategic_intent}</h4>
                        ) : null}
                    </CardBody>

                    </Card>
                </Grid>

            </Grid>

            <Grid
            container
            spacing={2}
            direction="row"
            >
                <Grid item xs={12} md={4} sm={4}  key="1">
                <Card style={{ height: '100%'}}>
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
                            { behaviours === null || behaviours === undefined || behaviours === undefined || behaviours.length === 0 ? (
                                <TableRow> <TableCell> No behaviours available </TableCell></TableRow>
                            ) : behaviours ? ( behaviours.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.currentDescription}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditBehaviourOpen(); setEditingBehaviour(list) }} ><EditIcon /></IconButton>
                                        <IconButton aria-label="delete" style={{color: 'black'}} onClick={() => { handleDeleteBehaviourClickOpen(); setDeletingBehaviour(list)  }} ><DeleteForever /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))) : behaviours_error ? (<TableRow> <TableCell> {behaviours_error} </TableCell></TableRow> ) : null }
                        </TableBody>
                    </Table>      
                    </CardContent>
                </Card>
                </Grid>

                <Grid item xs={12} md={4} sm={4}  key="2">   
                <Card style={{ height: '100%'}}>
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
                            { freedoms === null || freedoms === undefined || freedoms.length === 0 ? (
                                    <TableRow> <TableCell> No freedoms available </TableCell></TableRow>
                            ) :freedoms ? ( freedoms.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.currentDescription}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditFreedomOpen(); setEditingFreedom(list) }} ><EditIcon /></IconButton>
                                        <IconButton aria-label="delete" style={{color: 'black'}} onClick={() => { handleDeleteFreedomsClickOpen(); setDeletingFreedoms(list)  }} ><DeleteForever /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))) : freedoms_error ? (<TableRow> <TableCell> {freedoms_error} </TableCell></TableRow>) : null }
                        </TableBody>
                    </Table> 
                    </CardContent>
                </Card>
                </Grid>

                <Grid item xs={12} md={4} sm={4} key="3"> 
                <Card style={{ height: '100%'}}>
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
                            {  constraints === null || constraints === undefined || constraints.length === 0 ? (
                                 <TableRow> <TableCell> No constraints available </TableCell></TableRow>
                            ) : constraints ? ( constraints.map((list, index) => (
                                <TableRow key={index}>
                                    <TableCell>{list.currentDescription}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" className={classes.textGreen} onClick={() => {handleEditConstraintOpen(); setEditingConstraint(list) }} ><EditIcon /></IconButton>
                                        <IconButton aria-label="delete" style={{color: 'black'}} onClick={() => { handleDeleteConstraintsClickOpen(); setDeletingConstraints(list)  }} ><DeleteForever /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))) : constrains_error ? (<TableRow> <TableCell> {constrains_error} </TableCell></TableRow>) : null }
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

            {/* edit Strategic Level 1 */}
            <Dialog open={editopensil1} onClose={handleEditSIL1Close} >
            <DialogTitle>Leadership Traits</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Edit Leadership Traits
                </DialogContentText>

                <TextField
                id="outlined-multiline-static"
                fullWidth
                autoFocus
                label="Your Mission"
                type="text"
                margin="dense"
                multiline
                variant="outlined"
                rows={4}
                value={userstrategicintent0}
                className={classes.textInput}
                onChange={(event) => {
                    setStrategicIntent0(event.target.value);
                }}
                />
                <TextField
                id="outlined-multiline-static"
                fullWidth
                autoFocus
                label="Mission One Level Up"
                type="text"
                margin="dense"
                multiline
                variant="outlined"
                rows={4}
                value={userstrategicintent1}
                className={classes.textInput}
                onChange={(event) => {
                    setStrategicIntent1(event.target.value);
                }}
                />

                <TextField
                id="outlined-multiline-static"
                fullWidth
                autoFocus
                label="Mission Two Levels Up"
                type="text"
                margin="dense"
                multiline
                variant="outlined"
                rows={4}
                value={userstrategicintent2}
                className={classes.textInput}
                onChange={(event) => {
                    setStrategicIntent2(event.target.value);
                }}
                />

            </DialogContent>
            <DialogActions>
                <Button color="danger" onClick={handleEditSIL1Close}>Cancel</Button>
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
                    <Button color="primary" onClick={(e) => { editStrategicIntent1(e); }}>Save</Button>
                )}
            </DialogActions>
            </Dialog>

            {/* Deleting Modals */}
            <Dialog open={deletebehaviouropen} onClose={handleDeleteBehaviourClose}>
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this behaviour?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm that you want to delete this behaviour.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="danger" onClick={handleDeleteBehaviourClose}>Disagree</Button>
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
                        <Button color="primary" onClick={(e) => { deleteBehaviour(e)}} > Agree</Button>
                    )}
                </DialogActions>
            </Dialog>

            <Dialog open={deletefreedomsopen} onClose={handleDeleteFreedomsClose}>
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this freedom?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm that you want to delete this freedom.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="danger" onClick={handleDeleteFreedomsClose}>Disagree</Button>
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
                        <Button color="primary" onClick={(e) => { deleteFreedoms(e)}} > Agree</Button>
                    )}
                </DialogActions>
            </Dialog>

            <Dialog open={deleteconstraintsopen} onClose={handleDeleteConstraintsClose}>
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this constraint?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm that you want to delete this constraint.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button color="danger" onClick={handleDeleteConstraintsClose}>Disagree</Button>
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
                        <Button color="primary" onClick={(e) => { deleteConstraints(e)}} > Agree</Button>
                    )}
                </DialogActions>
            </Dialog>

        </div>
    )

}