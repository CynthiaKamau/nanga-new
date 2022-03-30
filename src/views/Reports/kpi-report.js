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
import { getUserKpis, getKMonthlyActions } from "actions/kpis";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import axios from "axios";
import { getCategories } from "actions/data";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";
import { CardContent, Icon, Button } from "@material-ui/core";

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

  useEffect(() => {
    dispatch(getUserKpis(created_by));
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
            dispatch(getUserKpis(currentUser.id));
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
            dispatch(getUserKpis(currentUser.id));
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
          dispatch(getUserKpis(currentUser.id));
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

  const handleKpiSnapshot = () => {
    if(currentUser.role_id === 0) {
      history.push(`/admin/kpi-report/id=${currentUser.id}`)
    } else {
      history.push(`/user/kpi-report/id=${currentUser.id}`)
    }
  }
 
  return (
    <div>
      <GridContainer>
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
                    variant="contained" size="large" style={{backgroundColor : '#29A15B'}}
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
      </GridContainer>
    </div>
  );
}
