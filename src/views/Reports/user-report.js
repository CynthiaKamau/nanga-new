import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getUserObjectives } from "actions/objectives";
import {  getUserById } from "actions/data";
import { getKpis } from "actions/kpis";
import MaterialTable from 'material-table';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function UserReport() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { items : kpis } = useSelector(state => state.kpi);
    const { items: objectives } = useSelector(state => state.objective);
    const { spec_user } = useSelector(state => state.data);

    const str = window.location.pathname;
    const chars = str.slice(22, 1000);

    console.log("id",chars)

    useEffect(() => {
        dispatch(getKpis(chars));
        dispatch(getUserObjectives(chars));
        dispatch(getUserById(chars));
      }, [chars]);

  
    const kpi_columns = [
        {
          field: 'title',
          title: 'Measure'
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
          title: 'Actual YTD '
        }, 
        {
          field: 'var',
          title: 'Variance',
          render: (list) => {
            if(list.variance === 'amber') {
                return(<div style={{backgroundColor : '#FFC107',height: '50px', width: '50px', display: 'flex',borderRadius: '50%'}}><p style={{margin: 'auto'}}>{list.varianceValue}</p></div>)
            } else if(list.variance === 'green') {
                return (<div style={{backgroundColor : '#29A15B',height: '50px', width: '50px', display: 'flex', borderRadius: '50%'}}><p style={{margin: 'auto'}}>{list.varianceValue}</p></div>)
            } else if(list.variance === 'blue') {
                return (<div style={{backgroundColor : '#03A9F4',height: '50px', width: '50px', display: 'flex', borderRadius: '50%'}}><p style={{margin: 'auto'}}>{list.varianceValue}</p></div>)
            } else if(list.variance === 'red') {
                return (<div style={{backgroundColor : '#F44336',height: '50px', width: '50px', display: 'flex', borderRadius: '50%'}}><p style={{margin: 'auto'}}>{list.varianceValue}</p></div>)
            } else if(list.variance === null || list.variance === undefined) {
                return (<div style={{backgroundColor : '#F44336',height: '50px', width: '50px', display: 'flex', borderRadius: '50%'}}><p style={{margin: 'auto'}}>0</p></div>)
            } 
          },
          export: false
        },
        {
          field: 'varianceValue',
          title: 'Variance',
          export: true,
          hidden: true  
          }, 
        {
          field: 'variance',
          title: 'Rag Status',
          export: true,
          hidden: true
        },
        {
          field: 'rootCause',
          title: 'Comments On Progress Made'
        },
        {
          field: 'action',
          title: 'Actions To Be Taken'
        }, 
        {
          field: 'supportRequired',
          title: 'Support Required',
          export: true,
          hidden: true 
        }, 
        {
          field: 'supportRequired',
          title: 'Comments On Progress Made',
          export: true,
          hidden: true 
        },
    ]

    const obj_columns = [
        {
          field: 'objectives.description',
          title: 'Strategic Objective'
        },
        {
          field: 'rag',
          title: 'Status',
          render: (list) => {
            if(list.objectives.overallStatus === 'COMPLETE' || list.objectives.overallStatus === 'Complete') {
                return (<FiberManualRecord style={{color : '#29A15B'}}/>) 
            }  else if(list.objectives.overallStatus === 'INCOMPLETE' || list.objectives.overallStatus === 'Incomplete' || list.objectives.overallStatus === null ) {
                return (<FiberManualRecord style={{color : '#F44336'}}/>) 
            }
          },
          export: false
        },
        {
          field: 'variance',
          title: 'Status',
          export: true,
          hidden: true  
        }, 
        {
          field: 'variance',
          title: 'Rag Status',
          export: true,
          hidden: true  
        }, 
        {
          field: 'objectives.rootCause',
          title: 'Root Cause and Insight',
          export: true,
          hidden: true 
        },
        {
          field: 'objectives.action',
          title: 'Actions To Be Taken'
        },
        {
          field: 'objectives.riskOrOpportunity',
          title: 'Comments On Progress Made' 
        },
        {
          field: 'objectives.supportRequired',
          title: 'Support Required',
          export: true,
          hidden: true 
        },
        {
         field: 'objectives.prioritiesForQuarter',
         title: 'Priorities for the quarter'
        },
    ]


  return (
    <div>
      <GridContainer>
        {spec_user === undefined || spec_user === null || spec_user.length === 0 ? ( <h4> </h4>) : spec_user ? (
            <div> <h4 className={classes.textBold} style={{display : 'inline-block'}}> {spec_user.fullnames} | </h4>  <h6 style={{display : 'inline-block'}}> {spec_user.roles.role_name}</h6> </div> ) : null}

        <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>KPIs</h4>
            
              </CardHeader>
              <CardBody>

              {kpis !== null ? (
                <MaterialTable
                title="KPIs"
                data={kpis}
                columns={kpi_columns}
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
                columns={kpi_columns}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
                }}
            />
            }


        


              </CardBody>
            </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Objectives</h4>
            
              </CardHeader>
              <CardBody>

              {objectives !== null ? (
                <MaterialTable
                title="Objectives"
                data={objectives}
                columns={obj_columns}
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
                title="Objectives"
                data={[]}
                columns={obj_columns}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
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
