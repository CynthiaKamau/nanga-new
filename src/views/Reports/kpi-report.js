import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

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
import { getKpis, getKMonthlyActions } from "actions/kpis";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import axios from "axios";
import { getCategories } from "actions/data";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { Icon, Button } from "@material-ui/core";
import JsonData from "../../data/data.json";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function KPIReport() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    items,
    error,
    monthly_data,
    monthly_data_error,
  } = useSelector((state) => state.kpi);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.data);

  console.log("categories", categories);
  console.log("monthly kpi actions", monthly_data, monthly_data_error);
  console.log("kpi data", items, error);

  const [monthlyaction, setMonthlyAction] = useState("");
  const [monthly_risks, setMonthlyRisks] = useState("");
  const [monthly_next_actions, setMonthlyNextActions] = useState("");
	const months = JsonData.Months;
  const years = JsonData.Years;

  useEffect(() => {
    dispatch(getKpis(created_by));
    dispatch(getCategories());
    dispatch(getKMonthlyActions(currentUser.id));
  }, []);

  const [editopen, setEditOpen] = useState(false);
  const [editOpenActions, setEditOpenActions] = useState(false);
  const [kpi, setKPI] = useState("");
  const [uom, setUnitOfMeasure] = useState("");
  const [category, setCategory] = useState("");
  const [showloader, setshowloader] = useState(false);
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
  const [snapshot_month, setSnapshotMonth] = useState("");
  const [snapshot_year, setSnapshotYear] = useState("");
  const [showSnapshotLoader, setShowSnapshotLoader] = useState(false);

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

    console.log("primary", is_primary);

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
          dispatch(getKpis(currentUser.id));
        });
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditCloseAction = () => {
    setEditOpenActions(false);
  };

  const handleEditClickOpenActions = () => {
    setEditOpenActions(true);
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

  const setEditingActions = (list) => {
    console.log("actions here", list);

    if (list.supportRequired == null || list.supportRequired == undefined) {setMonthlyAction("")} else {setMonthlyAction(list.supportRequired)}
    if (list.risk_opportunity == null || list.risk_opportunity == undefined ) {setMonthlyRisks("")} else {setMonthlyRisks(list.risk_opportunity)}
    if (list.nextPeriodAction == null || list.nextPeriodAction == undefined) {setMonthlyNextActions("")} else {setMonthlyNextActions(list.nextPeriodAction)}
  }

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
        setEditOpenActions(false);
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
        setEditOpenActions(false);
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
      setEditOpenActions(false);
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

  const handleKpiSnapshot = () => {
    if(currentUser.role_id === 0) {
      history.push(`/admin/kpi-report/id=${currentUser.id}`)
    } else {
      history.push(`/user/kpi-report/id=${currentUser.id}`)
    }
  }

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

    console.log("body here", body, setCreatedBy);

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
              <Button variant="contained" size="large" style={{backgroundColor : '#29A15B'}} onClick={kpiSnapshotSave}>
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
            <Button color="primary" style={{backgroundColor : '#29A15B'}} onClick={handleKpiSnapshot} endIcon={<Icon>send</Icon>} variant="contained" >
                Report Snapshots
            </Button>
        </Grid>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>KPIs</h4>
            </CardHeader>
            <CardBody>
              {items !== null ? (
                <MaterialTable
                  title="KPI's"
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
                  title="KPI's"
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

                  <Grid container spacing={2}>
                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="ytd_planned"
                                label="YTD Planned"
                                type="number"
                                fullWidth
                                style={{marginBottom : '15px'}}
                                value={ytd_planned}
                                variant="outlined"
                                onChange = {(event) => {
                                    setYTDPlanned(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid item xs={6} lg={6} xl={6} sm={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="ytd_actual"
                                label="YTD Actual"
                                type="number"
                                fullWidth
                                style={{marginBottom : '15px'}}
                                value={ytd_actual}
                                variant="outlined"
                                onChange = {(event) => {
                                    setYTDActual(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>

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
                  <Button variant="contained" size="large" style={{backgroundColor : '#F44336'}} onClick={handleEditClose}>
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
                      variant="contained" size="large" style={{backgroundColor : '#29A15B'}}
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

            </CardBody>
          </Card>
        </GridItem>

        <Grid item xs={12} md={12} sm={12}>
          <Card>
            <CardHeader color="primary">
              <h4>KPI Actions</h4>
            </CardHeader>
            <CardBody>

              <Grid container spacing={1} justify="flex-end" style={{ margin: "1rem 0.5rem 1rem" }}>
                <Button color="primary" style={{backgroundColor : '#29A15B'}}
                  onClick={() => {
                    handleEditClickOpenActions();
                    setEditingActions(monthly_data[0]);
                  }} variant="contained"
                > Update Actions</Button> 
              </Grid>  

              {monthly_data !== null ? (
                <MaterialTable
                  title="KPI Actions"
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
                  title="KPI Actions"
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
          <DialogTitle>KPI Actions</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit KPI Actions
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

      </GridContainer>
    </div>
  );
}
