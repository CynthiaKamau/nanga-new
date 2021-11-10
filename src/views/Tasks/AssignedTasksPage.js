import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ArrowForward } from "@material-ui/icons";
import avatar from "../../assets/img/faces/marc.jpg";
import { useHistory } from "react-router";
import { getAssignedTasks } from "actions/tasks";
import moment from "moment";
import { LinearProgress } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-pro-react/views/assignedTasksStyle.js";
import IconButton from '@material-ui/core/Button';
import { getStatus } from "actions/data";

const useStyles = makeStyles(styles);

export default function AssignedTasksPage() {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector(state => state.auth);
    const { items, error, isLoading } = useSelector(state => state.task);
    const { statuses } = useSelector(state => state.data);

    console.log("ststuses", statuses)

    useEffect(() => {
        dispatch(getAssignedTasks(currentUser.id))
        dispatch(getStatus())
    }, []);

    
    const handleOpen = e => {
        e.preventDefault();

        history.push(`/admin/dashboard`);
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>

                    <Card>
                        <CardHeader color="primary">
                            <h4>Assigned Tasks</h4>
                            <p>
                                Assigned Tasks details.
                            </p>
                        </CardHeader>
                        <CardBody>

                            <Table className={classes.tableBorder}>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell>Management Actions</TableCell>
                                        <TableCell>Resources</TableCell>
                                        {/* <TableCell>Start Date</TableCell> */}
                                        <TableCell>Due Date</TableCell>
                                        <TableCell>Progress</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items ? ( items.map((list, index) => (
                                        <TableRow key={index}>
                                                <TableCell>{list.description}</TableCell>
                                            <TableCell > <img src={avatar} alt="..." style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '50%', marginRight: '160px', marginTop: '35px' }} />  </TableCell>
                                            {/* <TableCell>{moment(list.start_date).format('YYYY-MM-DD')}</TableCell> */}
                                            <TableCell>{moment(list.end_date).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell>{list.status}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="view" color="error" onClick={handleOpen} ><ArrowForward /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))) : error ? (<TableRow> <TableCell> {error} </TableCell></TableRow> 
                                    ) : isLoading ? (<TableRow> <LinearProgress color="success" /> </TableRow>) : null }
                                </TableBody>    
                            </Table>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
