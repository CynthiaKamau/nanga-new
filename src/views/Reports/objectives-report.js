import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// @material-ui/core
// import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
// import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/Button";
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
import { Grid, Icon, Button } from "@material-ui/core";
import axios from "axios";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import MaterialTable from "material-table";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import JsonData from "../../data/data.json";

const useStyles = makeStyles(styles);

export default function ObjectiveReport() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { items, error, monthly_data, monthly_data_error } = useSelector(
    (state) => state.objective
  );
  const { user: currentUser } = useSelector((state) => state.auth);
  const months = JsonData.Months;
  const years = JsonData.Years;

  console.log("monthly obj actions", monthly_data, monthly_data_error);
  console.log("monthly kpi report", items, error, );

  const [monthlyaction, setMonthlyAction] = useState("");
  const [monthly_risks, setMonthlyRisks] = useState("");
  const [monthly_next_actions, setMonthlyNextActions] = useState("");

  useEffect(() => {
    dispatch(getUserObjectives(created_by));
    dispatch(getCategories());
    dispatch(getPillars());
    dispatch(getOMonthlyActions(currentUser.id));
  }, []);

  const [editopen, setEditOpen] = useState(false);
  const [editOpenActions, setEditOpenActions] = useState(false);
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
  const [is_primary, setIsPrimary] = useState("");
  const [snapshot_month, setSnapshotMonth] = useState("");
  const [snapshot_year, setSnapshotYear] = useState("");
  const [showSnapshotLoader, setShowSnapshotLoader] = useState(false);  


  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClickOpenActions = () => {
    setEditOpenActions(true);
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
    if(list.action == null || list.action == undefined) {setAction("")} else {setAction(list.action)}
    if(list.rootCause == null || list.rootCause == undefined ) {setRootCause("")} else{setRootCause(list.rootCause)}
    setRiskAndOpportunity(list.riskOrOpportunity);
    if(list.prioritiesForQuarter == null || list.prioritiesForQuarter == undefined) {setPrioritiesForQuarter("")} else {setPrioritiesForQuarter(list.prioritiesForQuarter)}
    setUpdatedBy(list.user.id);
    setIsPrimary(list.isPrimary)
  };

  const setEditingActions = (list) => {
    console.log("actions here", list);

    if(list == undefined || list == null) {
      setMonthlyAction("");
      setMonthlyRisks("");
      setMonthlyNextActions("")
    } else {
      if (list[0].supportRequired == null || list[0].supportRequired == undefined) {setMonthlyAction("")} else {setMonthlyAction(list[0].supportRequired)}
      if (list[0].risk_opportunity == null || list[0].risk_opportunity == undefined ) {setMonthlyRisks("")} else {setMonthlyRisks(list[0].risk_opportunity)}
      if (list[0].nextPeriodAction == null || list[0].nextPeriodAction == undefined) {setMonthlyNextActions("")} else {setMonthlyNextActions(list[0].nextPeriodAction)}
    }
  }

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
            dispatch(getUserObjectives(currentUser.id)) 
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
        }).then(() => {
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
          dispatch(getUserObjectives(currentUser.id))
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
      }).then(() => {
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
        dispatch(getUserObjectives(currentUser.id))
      });
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditCloseAction = () => {
    setEditOpenActions(false);
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

  const action_columns = [
    {
      field: "supportRequired",
      title: "Support Required",
    },
    {
      field: "risk_opportunity",
      title: "Risk Opportunity",
    },
    {
      field: "nextPeriodAction",
      title: "Next Period Action",
    }
  ]

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

    console.log("body", body, setCreatedBy)

    try {
      let response = await axios.post(
        "/objectivesactions/createUpdate",
        body,
        config
      );
      if (response.status == 200) {
        setshowloader(false);
        setEditOpenActions(false);
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
        setEditOpenActions(false);
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
      setEditOpenActions(false);
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

  const handleObjSnapshot = () => {
    if(currentUser.role_id === 0) {
      history.push(`/admin/objectives-report/id=${currentUser.id}`)
    } else {
      history.push(`/user/objectives-report/id=${currentUser.id}`)
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
                <Button variant="contained" size="large" style={{backgroundColor : '#29A15B'}} onClick={objSnapshotSave}>SAVE</Button>
              )}  
          </Grid>        
        </Grid>

        <Grid
          container
          spacing={1}
          justify="flex-end"
          style={{ margin: "1rem" }}
        >
          <Button color="primary" style={{backgroundColor : '#29A15B'}} onClick={handleObjSnapshot} endIcon={<Icon>send</Icon>} variant="contained" >
            Report Snapshots
          </Button>
        </Grid>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>Strategic Objectives</h4>
            </CardHeader>
            <CardBody>

              {items !== null ? (
                <MaterialTable
                  title="Objectives"
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
                  title="Objectives"
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
            </CardBody>
          </Card>
        </GridItem>      

        <Grid item xs={12} md={12} sm={12}>
          <Card>
            <CardHeader color="primary">
              <h4>Strategic Objectives Actions</h4>
            </CardHeader>
            <CardBody>

            <Grid container spacing={1} justify="flex-end" style={{ margin: "1rem 0.5rem 1rem" }}>
              <Button color="primary" style={{backgroundColor : '#29A15B'}}
                onClick={() => {
                  handleEditClickOpenActions();
                  setEditingActions(monthly_data);
                }} variant="contained"
              > Update Actions</Button> 
            </Grid>  

              {monthly_data !== null ? (
                <MaterialTable
                  title="Objective Actions"
                  data={monthly_data}
                  columns={action_columns}
                  options={{
                    sorting: true,
                    pageSize: 1,
                    exportButton: true,
                  }}
                />
              ) : (
                <MaterialTable
                  title="Objective Actions"
                  data={[]}
                  columns={action_columns}
                  options={{
                    sorting: true,
                    pageSize: 1,
                    exportButton: true,
                  }}
                />
              )}
            </CardBody>
          </Card>
        </Grid>  

        <Dialog open={editOpenActions} onClose={handleEditCloseAction}>
          <DialogTitle>Strategic Objective Actions</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit Strategic Objective Actions
            </DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <Button variant="contained" size="large" style={{backgroundColor : '#F44336'}}  onClick={handleEditCloseAction}>
              Cancel
            </Button >
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
                <Button variant="contained" size="large" style={{backgroundColor : '#29A15B'}} onClick={(e) => {saveMonthlyUpdate(e);}} > Save </Button>
              )}
          </DialogActions>
        </Dialog>  

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
            <Button variant="contained" size="large" style={{backgroundColor : '#F44336'}}  onClick={handleEditClose}>
              Cancel
            </Button >
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
                variant="contained" size="large" style={{backgroundColor : '#29A15B'}}
                onClick={(e) => {
                  saveEdited(e);
                }}
              >
                Save
              </Button>
            )}
          </DialogActions>
        </Dialog>

      </GridContainer>
    </div>
  );
}
