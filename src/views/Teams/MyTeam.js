import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
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
import IconButton from '@material-ui/core/Button';
import JsonData from "../../data/data.json";
import { LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router";
import { getUsers } from "actions/users";

// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

// const useStyles = makeStyles(styles);

export default function MyTeamPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const { items } = useSelector(state => state.team)

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    console.log("team members", items)
    // const { error } = useSelector(state => state.team);

    const users = JsonData.Users;

    const handleClickOpen = e => {
        e.preventDefault();

        history.push(`/admin/dashboard`);
    }
    
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4>Teams</h4>
                            <p>
                                Team details.
                            </p>
                        </CardHeader>
                        <CardBody>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users ? (
                                        users.map((list, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{list.fullnames}</TableCell>
                                            <TableCell>{list.roles.role_name}</TableCell>
                                            <TableCell>{list.status}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="view" color="error" onClick={handleClickOpen} ><ArrowForward /></IconButton>
                                            </TableCell>

                                        </TableRow>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: "center", marginTop: 10 }}>
                                            <LinearProgress color="success" />
                                        </div>
                                    )}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
