import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getOMonthlyReport, getOMonthlyActions } from "actions/objectives";
import {  getUserById } from "actions/data";
import { getKMonthlyReport, getKMonthlyActions } from "actions/kpis";
import MaterialTable from 'material-table';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { Grid, CardContent, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert2";
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import JsonData from "../../data/data.json";
import Loader from "react-loader-spinner";


const useStyles = makeStyles(styles);

export default function UserReport() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { monthly_report : kpis, monthly_data : kpi_monthly_data, monthly_report_name : kpi_monthly_report_name } = useSelector(state => state.kpi);
    const { monthly_report : objectives, monthly_data : objectives_monthly_data , monthly_report_name : objectives_monthly_report_name } = useSelector(state => state.objective);
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

    const [kpi_month, setKpiMonth] = useState("");
    const [kpi_year, setKpiYear] = useState("");
    const [current_kpi_month, setCurrentKpiMonth] = useState("");
    const [current_kpi_year, setCurrentKpiYear] = useState("");

    const [obj_month, setObjMonth] = useState("");
    const [obj_year, setObjYear] = useState("");
    const [current_obj_month, setCurrentObjMonth] = useState("");
    const [current_obj_year, setCurrentObjYear] = useState("");

    const [showloader, setshowloader] = useState(false);
    const [showObjLoader, setShowObjLoader] = useState(false);

    const months = JsonData.Months;
    const years = JsonData.Years;

    var m_names = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
  
    var d = new Date();
    var m = m_names[d.getMonth()];
    var y = d.getFullYear();

    useEffect(() => {
        dispatch(getKMonthlyReport(chars, m, y));
        dispatch(getOMonthlyReport(chars, m, y));
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
          field: "rag",
          title: "Status",
          render: (list) => {
            if (
              list.objectives.overallStatus === "COMPLETE" ||
              list.objectives.overallStatus === "ON TRACK" ||
              list.objectives.overallStatus === "Complete"
            ) {
              return <FiberManualRecord style={{ color: "#29A15B" }} />;
            } else if (
              list.objectives.overallStatus === "INCOMPLETE" ||
              list.objectives.overallStatus === "SIGNIFICANTLY OFF TRACK" ||
              list.objectives.overallStatus === "Incomplete" ||
              list.objectives.overallStatus === null
            ) {
              return <FiberManualRecord style={{ color: "#F44336" }} />;
            } else if (
              list.objectives.overallStatus === "ONGOING" ||
              list.objectives.overallStatus === "MODERATELY OFF TRACK" ||
              list.objectives.overallStatus === "Ongoing" ||
              list.objectives.overallStatus === null
            ) {
              return <FiberManualRecord style={{ color: "#FFC107" }} />;
            }
          },
          export: false,
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

    const filterKpiData = async(e) => {
      e.preventDefault();
      setshowloader(true);

      console.log("kk", current_kpi_month, current_kpi_year)

      let report_name = `${kpi_month + kpi_year + 'Report'}`;

      try {

        let response = await axios.get(`/kpiReports/filterKpiReport?user_id=${chars}&reportName=${report_name}`)
            if (response.status == 200) {
                setshowloader(false);
                let item = response.data.message;
                    swal.fire({
                    title: "Success",
                    text: item,
                    icon: "success",
                }).then(() => {
                  setKpiMonth("");
                  setKpiYear("");
                  setCurrentKpiMonth(kpi_month);
                  setCurrentKpiYear(kpi_year)
                  dispatch(getKMonthlyReport(chars, kpi_month, kpi_year))
                });

            } else {
                let error = response.data.message
                setshowloader(false);
                swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                    dangerMode: true
                }).then(() => {
                  setKpiMonth("");
                  setKpiYear("");
                  setCurrentKpiMonth(kpi_month);
                  setCurrentKpiYear(kpi_year)
                  dispatch(getKMonthlyReport(chars, kpi_month, kpi_year))
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
        }).then(() => {
          setKpiMonth("");
          setKpiYear("");
          setCurrentKpiMonth(kpi_month);
          setCurrentKpiYear(kpi_year)
          dispatch(getKMonthlyReport(chars, kpi_month, kpi_year))
        });
      } 
    }

    const filterObjData = async (e) => {
      e.preventDefault();
      setShowObjLoader(true);

      console.log("dd", current_obj_month, current_obj_year);

      let report_name = `${obj_month + obj_year + 'Report'}`;
  
      try {
        let response = await axios.get(
          `/objectivesReports/filterObjectivesReport?user_id=${chars}&reportName=${report_name}`
        );
        if (response.status == 200) {
          setShowObjLoader(false);
          let item = response.data.message;
          console.log("here", item);
          swal
            .fire({
              title: "Success",
              text: item,
              icon: "success",
            })
            .then(() => {
              setObjMonth("");
              setObjYear("");
              setCurrentObjMonth(obj_month);
              setCurrentObjYear(obj_year);
              dispatch(getOMonthlyReport(chars, obj_month, obj_year));
            });
        } else {
          let error = response.data.message;
          setShowObjLoader(false);
          swal
            .fire({
              title: "Error",
              text: error,
              icon: "error",
              dangerMode: true,
            })
            .then(() => {
              setObjMonth("");
              setObjYear("");
              setCurrentObjMonth(obj_month);
              setCurrentObjYear(obj_year);
              dispatch(getOMonthlyReport(chars, obj_month, obj_year));
            });
        }
      } catch (error) {
        let err = error.response.data.message;
        setShowObjLoader(false);
        swal
          .fire({
            title: "Error",
            text: err,
            icon: "error",
            dangerMode: true,
          })
          .then(() => {
            setObjMonth("");
            setObjYear("");
            setCurrentObjMonth(obj_month);
            setCurrentObjYear(obj_year);
            dispatch(getOMonthlyReport(chars, obj_month, obj_year));
          });
      }
    };

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

              <Grid container spacing={1} justify="flex-end" style={{margin: '1rem'}}>
                <TextField
                    id="outlined-select-month"
                    select
                    required
                    style={{margin: "1rem", width: "200px"}}
                    variant="outlined"
                    label="Month"
                    className={classes.textInput}
                    value={kpi_month}
                    onChange={(event) => {
                    setKpiMonth(event.target.value);
                    }}
                  >
                    {months && months.map((option) => (
                    <MenuItem key={option.abbreviation} value={option.abbreviation}>
                        {option.name}
                    </MenuItem>
                    ))}
                </TextField>
        
                <TextField
                    id="outlined-select-year"
                    select
                    required
                    style={{margin: "1rem", width: "200px"}}
                    variant="outlined"
                    label="Year"
                    className={classes.textInput}
                    value={kpi_year}
                    onChange={(event) => {
                    setKpiYear(event.target.value);
                    }}
                  >
                    {years && years.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.name}
                    </MenuItem>
                    ))}
                </TextField>

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
                    ( <Button color="primary" onClick={filterKpiData}>Filter</Button>
                    )
                } 
              </Grid>   

                {kpis !== null ? (
                  <MaterialTable
                  title={`${"Period : " + kpi_monthly_report_name}`}
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

                <Grid container spacing={1} justify="flex-end" style={{margin: '1rem'}}>
                  <TextField
                      id="outlined-select-month"
                      select
                      required
                      style={{margin: "1rem", width: "200px"}}
                      variant="outlined"
                      label="Month"
                      className={classes.textInput}
                      value={obj_month}
                      onChange={(event) => {
                      setObjMonth(event.target.value);
                      }}
                    >
                      {months && months.map((option) => (
                      <MenuItem key={option.abbreviation} value={option.abbreviation}>
                          {option.name}
                      </MenuItem>
                      ))}
                  </TextField>
          
                  <TextField
                      id="outlined-select-year"
                      select
                      required
                      style={{margin: "1rem", width: "200px"}}
                      variant="outlined"
                      label="Year"
                      className={classes.textInput}
                      value={obj_year}
                      onChange={(event) => {
                      setObjYear(event.target.value);
                      }}
                    >
                      {years && years.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          {option.name}
                      </MenuItem>
                      ))}
                  </TextField>

                  { showObjLoader === true ? (
                      <div style={{ textAlign: "center", marginTop: 10 }}>
                      <Loader
                          type="Puff"
                          color="#29A15B"
                          height={100}
                          width={100}
                      />
                      </div>
                      ) :
                      ( <Button color="primary" onClick={filterObjData}>Filter</Button>
                      )
                  } 
                </Grid> 

                {objectives !== null ? (
                  <MaterialTable
                  title={`${"Period : " + objectives_monthly_report_name}`}
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
