import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { getOMonthlyReport, getOMonthlyActions } from "actions/objectives";
import { getCategories, getPillars } from "actions/data";
import { Grid, CardContent } from "@material-ui/core";
import axios from "axios";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MaterialTable from "material-table";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import JsonData from "../../data/data.json";

const useStyles = makeStyles(styles);

export default function ObjectiveSnapshotReport() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { monthly_report, monthly_report_name ,monthly_report_error, monthly_data, monthly_data_error } = useSelector(
    (state) => state.objective
  );
  const { user: currentUser } = useSelector((state) => state.auth);
  const months = JsonData.Months;
  const years = JsonData.Years;

  console.log("monthly obj", monthly_data, monthly_data_error);
  console.log("monthly kpi report", monthly_report, monthly_report_error, monthly_report_name);

  const [monthlyaction, setMonthlyAction] = useState("");
  const [monthly_risks, setMonthlyRisks] = useState("");
  const [monthly_next_actions, setMonthlyNextActions] = useState("");

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

  console.log("year month", m, y);
  console.log("monthly obj report", monthly_report, monthly_report_error);

  useEffect(() => {
    dispatch(getOMonthlyReport(created_by, m, y));
    dispatch(getCategories());
    dispatch(getPillars());
    dispatch(getOMonthlyActions(currentUser.id));
  }, []);

  useEffect(() => {
    if (monthly_data && monthly_data.length >= 1) {
      setMonthlyAction(monthly_data[0].supportRequired);
      setMonthlyRisks(monthly_data[0].risk_opportunity);
      setMonthlyNextActions(monthly_data[0].nextPeriodAction);
    } else {
      setMonthlyAction("Not available");
      setMonthlyRisks("Not available");
      setMonthlyNextActions("Not available");
    }
  }, []);

  const [showSnapshotLoader, setShowSnapshotLoader] = useState(false);  
  const [created_by, setCreatedBy] = useState(currentUser.id);
  const [user_id, setUserId] = useState(currentUser.id);
  const [month, setMonth] = useState("");
  const [filteryear, setFilterYear] = useState("");
  const [snapshot_month, setSnapshotMonth] = useState("");
  const [snapshot_year, setSnapshotYear] = useState("");
  const [showloader, setshowloader] = useState(false);


  const columns = [
    {
      field: "objectives.description",
      title: "Strategic Objective",
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
      field: "variance",
      title: "Status",
      export: true,
      hidden: true,
    },
    {
      field: "variance",
      title: "Rag Status",
      export: true,
      hidden: true,
    },
    {
      field: "objectives.prioritiesForQuarter",
      title: "Priorities for the quarter",
    },
    {
      field: "objectives.rootCause",
      title: "Comments On Progress Made",
    },
    {
      field: "objectives.action",
      title: "Actions To Be Taken",
      cellStyle: {
        cellWidth: '15%'
      }
    }
  ];

  const filterObjData = async (e) => {
    e.preventDefault();
    setshowloader(true);

    console.log(setCreatedBy, setUserId)

    let report_name = `${month + filteryear + 'Report'}`;

    try {
      let response = await axios.get(`/objectivesReports/filterObjectivesReport?user_id=${user_id}&reportName=${report_name}`)
      if (response.status == 200) {
        setshowloader(false);
        let item = response.data.message;
        console.log("here", item);
        swal
          .fire({
            title: "Success",
            text: item,
            icon: "success",
          })
          .then(() => {
            setMonth("");
            setFilterYear("");
            dispatch(getOMonthlyReport(created_by, month, filteryear));
          });
      } else {
        let error = response.data.message;
        setshowloader(false);
        swal
          .fire({
            title: "Error",
            text: error,
            icon: "error",
            dangerMode: true,
          })
          .then(() => {
            setMonth("");
            setFilterYear("");
            dispatch(getOMonthlyReport(created_by, month, filteryear));
          });
      }
    } catch (error) {
      let err = error.response.data.message;
      setshowloader(false);
      swal
        .fire({
          title: "Error",
          text: err,
          icon: "error",
          dangerMode: true,
        })
        .then(() => {
          setMonth("");
          setFilterYear("");
          dispatch(getOMonthlyReport(created_by, month, filteryear));
        });
    }
  };

  const objSnapshotSave = async(e) => {
    e.preventDefault();
    setShowSnapshotLoader(true);

    const config = { headers: { 'Content-Type': 'application/json', 'Accept' : '*/*' } }

    const body = JSON.stringify({
      year: snapshot_year,
      month: snapshot_month,
      userId: created_by
    })

    console.log("body here", body)

    try {

      let response = await axios.post(`/objectivesReports/snapshot`, body, config)
          if (response.status == 201) {
              setShowSnapshotLoader(false);
              let item = response.data.message
              console.log("here", item)
              swal.fire({
                  title: "Success",
                  text: item,
                  icon: "success",
              }).then(() => {
                setSnapshotMonth("")
                setSnapshotYear("")
              });

          } else {
              let error = response.data.message
              setShowSnapshotLoader(false);
              swal.fire({
                  title: "Error",
                  text: error,
                  icon: "error",
                  dangerMode: true
              }).then(() => {
                setSnapshotMonth("")
                setSnapshotYear("")
              });

          }
    } catch (error) {
        let err = error.response.data.message
        setShowSnapshotLoader(false);
        swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            dangerMode: true
        }).then(() => {
          setSnapshotMonth("")
          setSnapshotYear("")
        });

    } 
  }

  return (
    <div>
      <GridContainer>
        <h4> Create Report Snapshot</h4>
        <Grid container spacing={1} style={{backgroundColor : 'white', padding: '1rem', margin: '1rem', borderRadius: '20px'}}>
          <Grid  item xs={4} lg={4} xl={4} sm={12} >
            <TextField
                id="outlined-select-month"
                select
                required
                fullWidth
                variant="outlined"
                label="Snapshot Month"
                className={classes.textInput}
                value={snapshot_month}
                onChange={(event) => {
                setSnapshotMonth(event.target.value);
                }}
              >
              {months &&
              months.map((option) => (
                  <MenuItem key={option.abbreviation} value={option.abbreviation}>
                  {option.name}
                  </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4} lg={4} xl={4} sm={12} >  
            <TextField
              id="outlined-select-year"
              select
              required
              fullWidth
              variant="outlined"
              label="Snapshot Year"
              className={classes.textInput}
              value={snapshot_year}
              onChange={(event) => {
                setSnapshotYear(event.target.value);
              }}
            >
              {years &&
                years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid> 

          <Grid item xs={4} lg={4} xl={4} sm={12} > 
            { showSnapshotLoader === true ? (
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
                <Button color="primary" size="lg" onClick={objSnapshotSave}>SAVE</Button>
              )}  
          </Grid>        
        </Grid>
        
        <Grid
          container
          spacing={1}
          justify="flex-end"
          style={{ margin: "1rem" }}
        >
          <TextField
            id="outlined-select-month"
            select
            required
            style={{ margin: "1rem", width: "200px" }}
            variant="outlined"
            label="Month"
            className={classes.textInput}
            value={month}
            onChange={(event) => {
              setMonth(event.target.value);
            }}
          >
            {months &&
              months.map((option) => (
                <MenuItem key={option.abbreviation} value={option.abbreviation}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            id="outlined-select-year"
            select
            required
            style={{ margin: "1rem", width: "200px" }}
            variant="outlined"
            label="Year"
            className={classes.textInput}
            value={filteryear}
            onChange={(event) => {
              setFilterYear(event.target.value);
            }}
          >
            {years &&
              years.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>

          <div style={{ textAlign: "center", marginTop: 10 }}>
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
                <Button color="primary" onClick={filterObjData}>Filter</Button>
              )}
          </div>
        </Grid>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>Strategic Objectives</h4>
            </CardHeader>
            <CardBody>
              {/* <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div> */}

              {monthly_report !== null ? (
                <MaterialTable
                  title={`${"Period : " + monthly_report_name}`}
                  data={monthly_report}
                  columns={columns}
                  options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 50, 100],
                    exportButton: true,
                  }}
                />
              ) : (
                <MaterialTable
                  title={monthly_report_name}
                  data={[]}
                  columns={columns}
                  options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 50, 100],
                    exportButton: true,
                  }}
                />
              )}

              <Grid container spacing={2} direction="row">
                <Grid item xs={12} md={12} sm={12}>
                  <h4
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Objective Actions
                  </h4>
                </Grid>

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
                        value={monthly_risks}
                        onChange={(event) => {
                          const value = event.target.value;
                          setMonthlyRisks(value);
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
                        value={monthlyaction}
                        onChange={(event) => {
                          const value = event.target.value;
                          setMonthlyAction(value);
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
                        value={monthly_next_actions}
                        onChange={(event) => {
                          const value = event.target.value;
                          setMonthlyNextActions(value);
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
