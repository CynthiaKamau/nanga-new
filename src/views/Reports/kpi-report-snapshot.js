import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { getKMonthlyReport, getKMonthlyActions } from "actions/kpis";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import axios from "axios";
import { getCategories } from "actions/data";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { CardContent } from "@material-ui/core";
import JsonData from "../../data/data.json";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function KPISnapshotReport() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    monthly_report,
    monthly_report_error,
    monthly_report_name,
    monthly_data,
    monthly_data_error,
  } = useSelector((state) => state.kpi);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.data);
  const months = JsonData.Months;
  const years = JsonData.Years;
  // const { error : category_error, isLoading : category_loading}  = useSelector(state => state.data);

  console.log("categories", categories);
  console.log("monthly kpi actions", monthly_data, monthly_data_error);
  console.log("monthly kpi report", monthly_report, monthly_report_name, monthly_report_error);

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

  const [monthlyaction, setMonthlyAction] = useState("");
  const [monthly_risks, setMonthlyRisks] = useState("");
  const [monthly_next_actions, setMonthlyNextActions] = useState("");

  useEffect(() => {
    dispatch(getKMonthlyReport(created_by, m, y));
    dispatch(getCategories());
    dispatch(getKMonthlyActions(currentUser.id));
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
  }, [monthly_data]);

  const [showloader, setshowloader] = useState(false);
  const [month, setMonth] = useState("");
  const [filteryear, setFilterYear] = useState("");
  const [created_by, setCreatedBy] = useState(currentUser.id);

  console.log(setCreatedBy);

  const columns = [
    {
      field: "title",
      title: "Measure",
    },
    {
      field: "target",
      title: "Target",
    },
    {
      field: "plannedYTD",
      title: "Planned YTD",
    },
    {
      field: "actualYTD",
      title: "Actual YTD ",
    },
    {
      field: "var",
      title: "Variance",
      render: (list) => {
        if (list.variance === "amber") {
          return (
            <div
              style={{
                backgroundColor: "#FFC107",
                height: "50px",
                width: "50px",
                display: "flex",
                borderRadius: "50%",
              }}
            >
              <p style={{ margin: "auto" }}>{list.varianceValue} %</p>
            </div>
          );
        } else if (list.variance === "green") {
          return (
            <div
              style={{
                backgroundColor: "#29A15B",
                height: "50px",
                width: "50px",
                display: "flex",
                borderRadius: "50%",
              }}
            >
              <p style={{ margin: "auto" }}>{list.varianceValue} %</p>
            </div>
          );
        } else if (list.variance === "blue") {
          return (
            <div
              style={{
                backgroundColor: "#03A9F4",
                height: "50px",
                width: "50px",
                display: "flex",
                borderRadius: "50%",
              }}
            >
              <p style={{ margin: "auto" }}>{list.varianceValue} %</p>
            </div>
          );
        } else if (list.variance === "red") {
          return (
            <div
              style={{
                backgroundColor: "#F44336",
                height: "50px",
                width: "50px",
                display: "flex",
                borderRadius: "50%",
              }}
            >
              <p style={{ margin: "auto" }}>{list.varianceValue} %</p>
            </div>
          );
        } else if (list.variance === null || list.variance === undefined) {
          return (
            <div
              style={{
                backgroundColor: "#F44336",
                height: "50px",
                width: "50px",
                display: "flex",
                borderRadius: "50%",
              }}
            >
              <p style={{ margin: "auto" }}>0 %</p>
            </div>
          );
        }
      },
      export: false,
    },
    {
      field: "varianceValue",
      title: "Variance",
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
      field: "rootCause",
      title: "Comments On Progress Made",
    },
    {
      field: "action",
      title: "Actions To Be Taken",
    },
    {
      field: "supportRequired",
      title: "Comments On Progress Made",
      export: true,
      hidden: true,
    }
  ];

  const filterKpiData = async (e) => {
    e.preventDefault();
    setshowloader(true);

    let report_name = `${month + filteryear + "Report"}`;

    try {
      let response = await axios.get(
        `/kpiReports/filterKpiReport?user_id=${created_by}&reportName=${report_name}`
      );
      if (response.status == 200) {
        setshowloader(false);
        let item = response.data.message;
        swal
          .fire({
            title: "Success",
            text: item,
            icon: "success",
          })
          .then(() => {
            setMonth("");
            setFilterYear("");
            dispatch(
              getKMonthlyReport(created_by, month, filteryear)
            );
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
            dispatch(
              getKMonthlyReport(created_by, month, filteryear)
            );
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
          dispatch(getKMonthlyReport(created_by, month, filteryear));
        });
    }
  };

  return (
    <div>
      <GridContainer>

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
                <Button color="primary" onClick={filterKpiData}>Filter</Button>
              )}    
          </div>
        </Grid>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>KPIs</h4>
            </CardHeader>
            <CardBody>
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
                    KPI Actions
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
                        label="Supprt Required"
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
