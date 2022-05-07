import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ArrowForward } from "@material-ui/icons";
import IconButton from '@material-ui/core/Button';
import { useHistory } from "react-router";
import { getUserTeamates } from "actions/users";
import MaterialTable from 'material-table';

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function MyTeamPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const { user_teamates : items } = useSelector(state => state.user)
    const { user : currentUser } = useSelector(state => state.auth);
    
    useEffect(() => {
        dispatch(getUserTeamates(currentUser.id))
    }, []);

    console.log("team members", items)
    // const { error } = useSelector(state => state.team);

    const handleClickOpen = (user) => {
        if(currentUser.role_id === 0) {
            history.push(`/admin/user-dashboard/id=${user}`);
        } else {
            history.push(`/user/user-dashboard/id=${user}`);
        }
    }

    const columns = [
        {
            field: 'fullnames',
            title: 'Name'
        },
        {
            field: 'roles.role_name',
            title: 'Role'
        },
        {
            field: 'status',
            title: 'Status'
        },
        {
            field: 'actions',
            title: 'View Dashboard',
            render: (list) => {
                console.log("editing table", list)
                return ( <div><IconButton aria-label="redirect" className={classes.textGreen} onClick={() => { handleClickOpen(list.id)}}><ArrowForward /></IconButton>
                </div>)
              }
        }
    ]
    
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4>Teams</h4>
                        </CardHeader>
                        <CardBody>
                            {items !== null ? (

                                <MaterialTable
                                    title="Team details."
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
                                    title="Team details."
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
                </GridItem>
            </GridContainer>
        </div>
    );
}
