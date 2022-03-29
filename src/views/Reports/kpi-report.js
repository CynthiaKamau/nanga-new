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
// import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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

export default function KPIReport() {
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

  const [editopen, setEditOpen] = useState(false);
  // const [deleteopen, setDeleteOpen] = useState(false);
  const [kpi, setKPI] = useState("");
  const [uom, setUnitOfMeasure] = useState("");
  const [category, setCategory] = useState("");
  const [showloader, setshowloader] = useState(false);
  const [showSnapshotLoader, setShowSnapshotLoader] = useState(false);
  const [id, setId] = useState("");
  const [created_by, setCreatedBy] = useState(currentUser.id);
  const [updated_by, setUpdatedBy] = useState(currentUser.id);
  const [target, setTarget] = useState("");
  const [account, setAccount] = useState("");
  const [ytd_planned, setYTDPlanned] = useState("");
  const [ytd_actual, setYTDActual] = useState("");
  const [action, setAction] = useState("");
  const [support_required, setSupportRequired] = useState("");
  const [root_cause, setRootCause] = useState("");
  const [is_primary, setIsPrimary] = useState("");
  const [month, setMonth] = useState("");
  const [filteryear, setFilterYear] = useState("");
  const [snapshot_month, setSnapshotMonth] = useState("");
  const [snapshot_year, setSnapshotYear] = useState("");
  const [current_month, setCurrentMonth] = useState("");
  const [current_year, setCurrentYear] = useState("");

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const setEditing = (list) => {
    setKPI(list.title);
    setUnitOfMeasure(list.kpi_unit_of_measure);
    setCategory(list.categories.id);
    setId(list.id);
    setAccount(list.account);
    setTarget(list.target);
    setYTDPlanned(list.plannedYTD);
    setYTDActual(list.actualYTD);
    setSupportRequired(list.supportRequired);
    setAction(list.action);
    setRootCause(list.rootCause);
    setIsPrimary(list.isPrimary);
  };

  const saveEdited = async (e) => {
    e.preventDefault();
    setshowloader(true);

    console.log("primary", is_primary, current_month, current_year);

    let new_primary;

    if (
      is_primary === null ||
      is_primary == "" ||
      is_primary == undefined ||
      is_primary == 1
    ) {
      new_primary = "1";
    } else {
      new_primary === is_primary;
    }

    console.log(
      "edit values",
      new_primary,
      id,
      kpi,
      uom,
      category,
      created_by,
      updated_by,
      setCreatedBy,
      setUpdatedBy()
    );

    const config = {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    };
    const body = JSON.stringify({
      title: kpi,
      kpiUnitOfMeasure: uom,
      categoryId: category,
      updatedBy: updated_by,
      id: id,
      userId: created_by,
      account: account,
      target: target,
      plannedYTD: ytd_planned,
      actualYTD: ytd_actual,
      isPrimary: new_primary,
      action: action,
      rootCause: root_cause,
      supportRequired: support_required,
    });

    console.log("kpi update body", body);

    if (
      current_month == "" ||
      current_month == undefined ||
      current_month == null
    ) {
      setCurrentMonth(m);
    } else if (
      current_year == "" ||
      current_year == undefined ||
      current_year == null
    ) {
      setCurrentYear(y);
    }

    try {
      let response = await axios.post("/kpi/update", body, config);
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
            setKPI("");
            setUnitOfMeasure("");
            setCategory("");
            setId("");
            setAccount("");
            setTarget("");
            setYTDPlanned("");
            setYTDActual("");
            setSupportRequired("");
            setAction("");
            setRootCause("");
            setUpdatedBy(currentUser.id);

            console.log("current values", current_month, current_year);
            console.log("true values", m, y);
            if (
              current_month == "" ||
              current_month == undefined ||
              current_month == null
            ) {
              dispatch(getKMonthlyReport(currentUser.id, m, y));
            } else {
              dispatch(getKMonthlyReport(currentUser.id, current_month, current_year));
            }
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
            setKPI("");
            setUnitOfMeasure("");
            setCategory("");
            setId("");
            setAccount("");
            setTarget("");
            setYTDPlanned("");
            setYTDActual("");
            setSupportRequired("");
            setAction("");
            setRootCause("");
            setUpdatedBy(currentUser.id);
            if (
              current_month == "" ||
              current_month == undefined ||
              current_month == null
            ) { 
              dispatch(getKMonthlyReport(currentUser.id, m, y));
            } else {
              dispatch(getKMonthlyReport(currentUser.id, current_month, current_year));
            }
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
          setKPI("");
          setUnitOfMeasure("");
          setCategory("");
          setId("");
          setAccount("");
          setTarget("");
          setYTDPlanned("");
          setYTDActual("");
          setSupportRequired("");
          setAction("");
          setRootCause("");
          setUpdatedBy(currentUser.id);
          if (
            current_month == "" ||
            current_month == undefined ||
            current_month == null
          ) {
            dispatch(getKMonthlyReport(currentUser.id, m, y));
            } else {
              dispatch(getKMonthlyReport(currentUser.id, current_month, current_year));
            }
        });
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const uoms = [
    {
      value: "%",
      label: "%",
    },
    {
      value: "<%",
      label: "<%",
    },
    {
      value: "%>",
      label: "%>",
    },
    {
      value: "numeric",
      label: "numeric",
    },
    {
      value: "KES M",
      label: "KES M",
    },
    {
      value: "TSH M",
      label: "TSH M",
    },
    {
      value: "UGX M",
      label: "UGX M",
    },
    {
      value: "RWF M",
      label: "RWF M",
    },
    {
      value: "USD M",
      label: "USD M",
    },
  ];

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
    },
    {
      field: "actions",
      title: "Edit",
      render: (list) => {
        return (
          <div>
            {" "}
            <IconButton
              aria-label="edit"
              className={classes.textGreen}
              onClick={() => {
                handleEditClickOpen();
                setEditing(list);
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
        );
      },
      export: false,
    },
  ];

  const saveMonthlyUpdate = async (e) => {
    e.preventDefault();
    setshowloader(true);

    const config = {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    };

    const body = JSON.stringify({
      supportRequired: monthlyaction,
      nextPeriodActions: monthly_next_actions,
      riskOpportunity: monthly_risks,
      userId: created_by,
    });

    try {
      let response = await axios.post("/kpiactions/createUpdate", body, config);
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
          .then(() => dispatch(getKMonthlyActions(currentUser.id)));
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
          .then(() => dispatch(getKMonthlyActions(currentUser.id)));
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
        .then(() => dispatch(getKMonthlyActions(currentUser.id)));
    }
  };

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
            setCurrentMonth(month);
            setCurrentYear(filteryear);
            dispatch(
              getKMonthlyReport(created_by, current_month, current_year)
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
            setCurrentMonth(month);
            setCurrentYear(filteryear);
            dispatch(
              getKMonthlyReport(created_by, current_month, current_year)
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
          setCurrentMonth(month);
          setCurrentYear(filteryear);
          dispatch(getKMonthlyReport(created_by, current_month, current_year));
        });
    }
  };

  const kpiSnapshotSave = async (e) => {
    e.preventDefault();
    setShowSnapshotLoader(true);

    const config = {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    };

    const body = JSON.stringify({
      year: snapshot_year,
      month: snapshot_month,
      userId: created_by,
    });

    console.log("body here", body);

    try {
      let response = await axios.post(`/kpiReports/snapshot`, body, config);
      if (response.status == 201) {
        setShowSnapshotLoader(false);
        let item = response.data.message;
        console.log("here", item);
        swal
          .fire({
            title: "Success",
            text: item,
            icon: "success",
          })
          .then(() => {
            setSnapshotMonth("");
            setSnapshotYear("");
          });
      } else {
        let error = response.data.message;
        setShowSnapshotLoader(false);
        swal
          .fire({
            title: "Error",
            text: error,
            icon: "error",
            dangerMode: true,
          })
          .then(() => {
            setSnapshotMonth("");
            setSnapshotYear("");
          });
      }
    } catch (error) {
      let err = error.response.data.message;
      setShowSnapshotLoader(false);
      swal
        .fire({
          title: "Error",
          text: err,
          icon: "error",
          dangerMode: true,
        })
        .then(() => {
          setSnapshotMonth("");
          setSnapshotYear("");
        });
    }
  };

  return (
    <div>
      <GridContainer>
        <h4> Create Report Snapshot</h4>
        <Grid
          container
          spacing={1}
          style={{
            backgroundColor: "white",
            padding: "1rem",
            margin: "1rem",
            borderRadius: "20px",
          }}
        >
          <Grid item xs={4} lg={4} xl={4} sm={12}>
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
                  <MenuItem
                    key={option.abbreviation}
                    value={option.abbreviation}
                  >
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={4} lg={4} xl={4} sm={12}>
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

          <Grid item xs={4} lg={4} xl={4} sm={12}>
            {showSnapshotLoader === true ? (
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <Loader type="Puff" color="#29A15B" height={100} width={100} />
              </div>
            ) : (
              <Button color="primary" size="lg" onClick={kpiSnapshotSave}>
                SAVE
              </Button>
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

          <Button color="primary" onClick={filterKpiData}>
            Filter
          </Button>
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
                    Update Your Details
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

              <Grid container justify="flex-end">
                {showloader === true ? (
                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    <Loader
                      type="Puff"
                      color="#29A15B"
                      height={100}
                      width={100}
                    />
                  </div>
                ) : (
                  <Button
                    color="primary"
                    size="lg"
                    onClick={(e) => {
                      saveMonthlyUpdate(e);
                    }}
                  >
                    {" "}
                    Save{" "}
                  </Button>
                )}
              </Grid>

              <Dialog open={editopen} onClose={handleEditClose}>
                <DialogTitle>KPI</DialogTitle>
                <DialogContent>
                  <DialogContentText>Edit KPI</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="kpi"
                    label="KPI"
                    type="text"
                    fullWidth
                    style={{ marginBottom: "15px" }}
                    value={kpi}
                    variant="outlined"
                    onChange={(event) => {
                      setKPI(event.target.value);
                    }}
                  />

                  <label style={{ fontWeight: "bold", color: "black" }}>
                    {" "}
                    Unit Of Measure :{" "}
                  </label>
                  <TextField
                    id="outlined-select-uom"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={uom}
                    onChange={(event) => {
                      setUnitOfMeasure(event.target.value);
                    }}
                    helperText="Please select your unit of measure"
                  >
                    {uoms.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <label style={{ fontWeight: "bold", color: "black" }}>
                    {" "}
                    Category :{" "}
                  </label>
                  <TextField
                    id="outlined-select-category"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                    helperText="Please select your category"
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.description}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Comments On Progress Made"
                    id="root_cause"
                    multiline
                    rows={2}
                    required
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={root_cause}
                    onChange={(event) => {
                      const value = event.target.value;
                      setRootCause(value);
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Actions To Be Taken"
                    id="action"
                    multiline
                    rows={2}
                    required
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={action}
                    onChange={(event) => {
                      const value = event.target.value;
                      setAction(value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="danger" onClick={handleEditClose}>
                    Cancel
                  </Button>
                  {showloader === true ? (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                      <Loader
                        type="Puff"
                        color="#29A15B"
                        height={150}
                        width={150}
                      />
                    </div>
                  ) : (
                    <Button
                      color="primary"
                      onClick={(e) => {
                        handleEditClose();
                        saveEdited(e);
                      }}
                    >
                      Save
                    </Button>
                  )}
                </DialogActions>
              </Dialog>

              {/* <Dialog
                  open={deleteopen}
                  onClose={handleDeleteClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete the team?"}
                  </DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Please confirm that you want to delete this KPI.
                  </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button color="danger" onClick={handleDeleteClose}>Disagree</Button>
                  <Button color="primary" onClick={handleDeleteClose} autoFocus>
                      Agree
                  </Button>
                  </DialogActions>
              </Dialog> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
