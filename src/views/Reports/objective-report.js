import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
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
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { getUserObjectives, getOMonthlyActions } from "actions/objectives";
import { getCategories, getPillars } from "actions/data";
import { getKpis } from "actions/kpis";
import { Grid } from "@material-ui/core";
import axios from "axios";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MaterialTable from "material-table";
import { CardContent } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import JsonData from "../../data/data.json";

const useStyles = makeStyles(styles);

export default function ObjectiveReport() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { items, item, monthly_data, monthly_data_error } = useSelector(
    (state) => state.objective
  );
  const { user: currentUser } = useSelector((state) => state.auth);
  const months = JsonData.Months;
  const years = JsonData.Years;

  console.log("objective", item, setCreatedBy);
  console.log("monthly obj", monthly_data, monthly_data_error);

  const [monthlyaction, setMonthlyAction] = useState("");
  const [monthly_risks, setMonthlyRisks] = useState("");
  const [monthly_next_actions, setMonthlyNextActions] = useState("");

  // var m_names = [
  //   "JAN",
  //   "FEB",
  //   "MAR",
  //   "APR",
  //   "MAY",
  //   "JUN",
  //   "JUL",
  //   "AUG",
  //   "SEP",
  //   "OCT",
  //   "NOV",
  //   "DEC",
  // ];

  // var d = new Date();
  // var m = m_names[d.getMonth()];
  // var y = d.getFullYear();

  // console.log("year month", m, y);

  useEffect(() => {
    dispatch(getUserObjectives(currentUser.id));
    dispatch(getCategories());
    dispatch(getKpis(currentUser.id));
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

  const [editopen, setEditOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [target_achieved_on_review, setTargetAtReview] = useState("");
  const [showloader, setshowloader] = useState(false);
  const [id, setId] = useState("");
  const [created_by, setCreatedBy] = useState(currentUser.id);
  const [updated_by, setUpdatedBy] = useState(currentUser.id);
  const [year, setYear] = useState("");
  const [kpi_id, setKpiId] = useState("");
  const [user_id, setUserId] = useState(currentUser.id);
  const [target_achieved, setTargetAchieved] = useState("");
  const [root_cause, setRootCause] = useState("");
  const [action, setAction] = useState("");
  const [support_required, setSupportRequired] = useState("");
  const [risk_and_opportunity, setRiskAndOpportunity] = useState("");
  const [pillar_id, setPillarId] = useState("");
  const [priorities_for_quarter, setPrioritiesForQuarter] = useState("");
  const [month, setMonth] = useState("");
  const [filteryear, setFilterYear] = useState("");
  const [is_primary, setIsPrimary] = useState("");

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const setEditing = (list) => {
    console.log("h", list);

    setDescription(list.description);

    if (list.kpis !== null) {
      let x = [];
      list.kpis.map(function (i) {
        console.log("i", i.id);
        x.push(i.id);
      });
      setKpiId(x);
      console.log("hapo", x);
    } else {
      setKpiId([]);
    }
    setPillarId(list.pillar_id);
    setId(list.id);
    setTarget(list.target);
    setTargetAchieved(list.target_achieved);
    setTargetAtReview(list.target_achieved_on_review);
    setYear(list.year);
    setTargetAchieved(list.target_achieved);
    if (list.supportRequired == null || list.supportRequired == undefined) {setSupportRequired("") } else {setSupportRequired(list.supportRequired)}
    if(list.action) {setAction("")} else {setAction(list.action)}
    if(list.rootCause) {setRootCause("")} else{setRootCause(list.rootCause)}
    setRiskAndOpportunity(list.riskOrOpportunity);
    if(list.prioritiesForQuarter == null || list.prioritiesForQuarter == undefined) {setPrioritiesForQuarter("")} else {setPrioritiesForQuarter(list.prioritiesForQuarter)}
    setUpdatedBy(list.user.id);
    setIsPrimary(list.isPrimary)
  };

  const saveEdited = async (e) => {
    e.preventDefault();
    setshowloader(true);

    let new_primary;

    if(is_primary === null || is_primary == "" || is_primary == undefined || is_primary == 1) {
      new_primary = "1";
    } else {
      new_primary == is_primary;
    }

    const config = {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    };
    const body = JSON.stringify({
      id: id,
      description: description,
      kpi_ids: kpi_id,
      user_id: user_id,
      pillar_id: pillar_id,
      isPrimary: new_primary,
      year: year,
      target: target,
      target_achieved: target_achieved,
      root_cause: root_cause,
      risk_and_opportunity: risk_and_opportunity,
      priorities_for_quarter: priorities_for_quarter,
      action: action,
      support_required: support_required,
      created_by: created_by,
      updated_by: updated_by,
    });

    console.log("test", body, is_primary, setUserId, target_achieved_on_review);

    try {
      let response = await axios.post("/objectives/update", body, config);
      if (response.status == 201) {
        setshowloader(false);
        setEditOpen(false);
        let item = response.data.message;
        swal
          .fire({
            title: "Success",
            text: item,
            icon: "success",
          })
          .then(() => {
            setDescription("");
            setKpiId([]);
            setId("");
            setPillarId("");
            setYear("");
            setTarget("");
            setTargetAchieved("");
            setRootCause("");
            setRiskAndOpportunity("");
            setPrioritiesForQuarter("");
            setAction("");
            setSupportRequired("");
            dispatch(getUserObjectives(currentUser.id));
          });
      } else {
        let error = response.data.message;
        setshowloader(false);
        setEditOpen(false);
        swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          dangerMode: true,
        });
      }
    } catch (error) {
      let err = error.response.data.message;
      setshowloader(false);
      setEditOpen(false);
      swal.fire({
        title: "Error",
        text: err,
        icon: "error",
        dangerMode: true,
      });
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

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
          list.objectives.overallStatus === "Complete"
        ) {
          return <FiberManualRecord style={{ color: "#29A15B" }} />;
        } else if (
          list.objectives.overallStatus === "INCOMPLETE" ||
          list.objectives.overallStatus === "Incomplete" ||
          list.objectives.overallStatus === null
        ) {
          return <FiberManualRecord style={{ color: "#F44336" }} />;
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
      field: "objectives.riskOrOpportunity",
      title: "Comments On Progress Made",
    },
    {
      field: "objectives.action",
      title: "Actions To Be Taken",
    },
    {
      field: "",
      title: "Edit",
      render: (list) => {
        return (
          <IconButton
            aria-label="edit"
            className={classes.textGreen}
            onClick={() => {
              handleEditClickOpen();
              setEditing(list.objectives);
            }}
          >
            <EditIcon />
          </IconButton>
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

    console.log("body", body)

    try {
      let response = await axios.post(
        "/objectivesactions/createUpdate",
        body,
        config
      );
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
          .then(() => dispatch(getOMonthlyActions(currentUser.id)));
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
          .then(() => dispatch(getOMonthlyActions(currentUser.id)));
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
        .then(() => dispatch(getOMonthlyActions(currentUser.id)));
    }
  };

  const filterObjData = async (e) => {
    e.preventDefault();
    setshowloader(true);

    try {
      let response = await axios.get(
        `/objectivesReports/filterObjectivesReport?user_id=${created_by}&month=${month}&year=${filteryear}`
      );
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
            dispatch(getKpis(currentUser.id));
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
            dispatch(getKpis(currentUser.id));
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
          dispatch(getKpis(currentUser.id));
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

          <Button color="primary" onClick={filterObjData}>
            Filter
          </Button>
        </Grid>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>Strategic Objectives</h4>
            </CardHeader>
            <CardBody>
              {/* <div className={classes.btnRight}><Button color="primary" size="lg" onClick={handleAddClickOpen}> Add KPI </Button> </div> */}

              {items !== null ? (
                <MaterialTable
                  title="Strategic Objective Reports."
                  data={items}
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
                  title="Strategic Objective Reports."
                  data={[]}
                  columns={columns}
                  options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 50, 100],
                    exportButton: true,
                    // defaultExportCsv
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
                  ) :
                  (
                    <Button color="primary" size="lg" onClick={(e) => {saveMonthlyUpdate(e);}} > Save </Button>
                  )}
              </Grid>

              <Dialog open={editopen} onClose={handleEditClose}>
                <DialogTitle>Strategic Objective</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Edit Strategic Objective
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="objective"
                    label="Objective"
                    type="text"
                    fullWidth
                    style={{ marginBottom: "15px" }}
                    value={description}
                    variant="outlined"
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />

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

                  <TextField
                    fullWidth
                    label="Priorities For Quarter"
                    id="priorities_for_quarter"
                    multiline
                    rows={2}
                    required
                    variant="outlined"
                    className={classes.textInput}
                    type="text"
                    value={priorities_for_quarter}
                    onChange={(event) => {
                      const value = event.target.value;
                      setPrioritiesForQuarter(value);
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
