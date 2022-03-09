import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getUserObjectives, getOMonthlyActions } from "actions/objectives";
import {  getUserById } from "actions/data";
import { getKpis, getKMonthlyActions } from "actions/kpis";
import MaterialTable from 'material-table';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { Grid, CardContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(styles);

export default function UserReport() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { items : kpis, monthly_data : kpi_monthly_data } = useSelector(state => state.kpi);
    const { items: objectives, monthly_data : objectives_monthly_data } = useSelector(state => state.objective);
    const { spec_user } = useSelector(state => state.data);

    const str = window.location.pathname;
    const chars = str.slice(22, 1000);

    console.log("id",chars)

    const [obj_monthlyaction, setObjMonthlyAction] = useState("");
    const [obj_monthly_risks, setObjMonthlyRisks] = useState("");
    const [obj_monthly_next_actions, setObjMonthlyNextActions] = useState("");

    const [kpi_monthlyaction, setKpiMonthlyAction] = useState("");
    const [kpi_monthly_risks, setKpiMonthlyRisks] = useState("");
    const [kpi_monthly_next_actions, setKpiMonthlyNextActions] = useState("");

    useEffect(() => {
        dispatch(getKpis(chars));
        dispatch(getUserObjectives(chars));
        dispatch(getUserById(chars));
        dispatch(getOMonthlyActions(chars));
        dispatch(getKMonthlyActions(chars));
      }, [chars]);

      useEffect(() => {
        if (objectives_monthly_data && objectives_monthly_data.length >= 1) {
          setObjMonthlyAction(objectives_monthly_data[0].supportRequired);
          setObjMonthlyRisks(objectives_monthly_data[0].risk_opportunity);
          setObjMonthlyNextActions(objectives_monthly_data[0].nextPeriodAction);
        } else {
          setObjMonthlyAction("Not available");
          setObjMonthlyRisks("Not available");
          setObjMonthlyNextActions("Not available");
        }
      }, [objectives_monthly_data]);

      useEffect(() => {
        if (kpi_monthly_data && kpi_monthly_data.length >= 1) {
          setKpiMonthlyAction(kpi_monthly_data[0].supportRequired);
          setKpiMonthlyRisks(kpi_monthly_data[0].risk_opportunity);
          setKpiMonthlyNextActions(kpi_monthly_data[0].nextPeriodAction);
        } else {
          setKpiMonthlyAction("Not available");
          setKpiMonthlyRisks("Not available");
          setKpiMonthlyNextActions("Not available");
        }
      }, [kpi_monthly_data]);

      console.log("kpi_monthly_data", kpi_monthly_data[0]);
      console.log("objectives_monthly_data", objectives_monthly_data[0]);

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

                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} md={4} sm={4} key="2">
                    <Card style={{ height: "70%" }}>
                      <CardContent>
                        <TextField
                          fullWidth
                          label="Risk/Opportunities"
                          id="monthly_risks"
                          multiline
                          rows={5}
                          required
                          variant="outlined"
                          className={classes.textInput}
                          type="text"
                          value={kpi_monthly_risks}
                          onChange={(event) => {
                            const value = event.target.value;
                            setKpiMonthlyRisks(value);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4} sm={4} key="1">
                    <Card style={{ height: "70%" }}>
                      <CardContent>
                        <TextField
                          fullWidth
                          label="Support Required"
                          id="action"
                          multiline
                          rows={5}
                          required
                          variant="outlined"
                          className={classes.textInput}
                          type="text"
                          value={kpi_monthlyaction}
                          onChange={(event) => {
                            const value = event.target.value;
                            setKpiMonthlyAction(value);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4} sm={4} key="3">
                    <Card style={{ height: "70%" }}>
                      <CardContent>
                        <TextField
                          fullWidth
                          label="Next Periods Actions"
                          id="monthly_next_actions"
                          multiline
                          rows={5}
                          required
                          variant="outlined"
                          className={classes.textInput}
                          type="text"
                          value={kpi_monthly_next_actions}
                          onChange={(event) => {
                            const value = event.target.value;
                            setKpiMonthlyNextActions(value);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

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

                <Grid container spacing={2} direction="row">
                  <Grid item xs={12} md={4} sm={4} key="2">
                    <Card style={{ height: "70%" }}>
                      <CardContent>
                        <TextField
                          fullWidth
                          label="Risk/Opportunities"
                          id="obj_monthly_risks"
                          multiline
                          rows={5}
                          required
                          variant="outlined"
                          className={classes.textInput}
                          type="text"
                          value={obj_monthly_risks}
                          onChange={(event) => {
                            const value = event.target.value;
                            setObjMonthlyRisks(value);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4} sm={4} key="1">
                    <Card style={{ height: "70%" }}>
                      <CardContent>
                        <TextField
                          fullWidth
                          label="Support Required"
                          id="obj_monthlyaction"
                          multiline
                          rows={5}
                          required
                          variant="outlined"
                          className={classes.textInput}
                          type="text"
                          value={obj_monthlyaction}
                          onChange={(event) => {
                            const value = event.target.value;
                            setObjMonthlyAction(value);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4} sm={4} key="3">
                    <Card style={{ height: "70%" }}>
                      <CardContent>
                        <TextField
                          fullWidth
                          label="Next Periods Actions"
                          id="obj_monthly_next_actions"
                          multiline
                          rows={5}
                          required
                          variant="outlined"
                          className={classes.textInput}
                          type="text"
                          value={obj_monthly_next_actions}
                          onChange={(event) => {
                            const value = event.target.value;
                            setObjMonthlyNextActions(value);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

              </CardBody>
            </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
