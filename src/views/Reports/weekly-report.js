import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from 'material-table';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { getWeeklyReport } from "actions/data";
import Button from "components/CustomButtons/Button.js";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function WeeklyReport() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { user: currentUser } = useSelector((state) => state.auth);
    const { weekly_report, weekly_report_error } = useSelector((state) => state.data);

    console.log("error", weekly_report_error)
    console.log("data", weekly_report)

    const [open, setOpen] = useState(false);
    const { items } = useSelector(state => state.task);
    const [hotspot, setHotspot] = useState("");
    const [prioritiesForTheQuarter, setPrioritiesForQuarter] = useState("");
    const [progressUpdates, setProgressUpdates] = useState("");
    const [progressMade, setProgressMade] = useState("");
    const [weeklyKpis, setWeeklyKpis] = useState("");
    const [strategicObjecives, setStrategicObjectives] = useState("");
    const [created_by, setCreatedBy] = useState(currentUser.id);
    const [showloader, setshowloader] = useState(false);

    useEffect(() => {
      dispatch(getWeeklyReport(currentUser.id));
    }, [])

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClickClose = () => {
      setOpen(false);
    };

    const saveWeeklyReport = async (e) => {
      e.preventDefault();
      setshowloader(true);

      const config = {
        headers: { "Content-Type": "application/json", Accept: "*/*" },
      };
      const body = JSON.stringify({
        hotspots: hotspot,
        prioritiesForTheQuarter: prioritiesForTheQuarter,
        progressMade: progressMade,
        weeklyKpis: weeklyKpis,
        strategicObjecives: strategicObjecives,
        progressUpdates: progressUpdates,
        userId: created_by
      });

      try {
        let response = await axios.post("/weeklyReport/createUpdate", body, config);
        if (response.status == 200) {
          setshowloader(false);
          handleClickOpen(false);
          let item = response.data.message;
          swal
            .fire({
              title: "Success",
              text: item,
              icon: "success",
            })
            .then(() => {
              setHotspot("");
              setPrioritiesForQuarter("")
              setProgressMade("")
              setWeeklyKpis("")
              setStrategicObjectives("");
              setProgressUpdates("");
              setCreatedBy(currentUser.id)
              dispatch(getWeeklyReport(currentUser.id));
            })
          } else {
            let error = response.data.message;
            setshowloader(false);
            handleClickOpen(false);
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
          handleClickOpen(false);
          swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            dangerMode: true,
          });
        }

    }

    const columns = [
      {
        field: 'strategicObjective',
        title: 'Objective' 
      },
      {
        field: 'prioritiesForQuarter',
        title: 'Priorities For The Quarter' 
      },
      {
        field: 'progressUpdates',
        title: 'Progress Updates' 
      },
      
    ]

    const columns_bottom = [   
      {
        field: 'weeklyKpis',
        title: 'KPI'
      }, 
      { 
        field: 'progressUpdates',
        title: 'Progress Updates' 
      }
    ]

  return (
    <div>
      <GridContainer>
        <Grid container justify="flex-end" style={{ marginTop: '10px' }}>
            <Button color="primary" size="lg" onClick={handleClickOpen}> Add Report </Button> 
        </Grid>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>Weekly Report</h4>
            </CardHeader>
            <CardBody>

            {items !== null ? (
              <div>
                <MaterialTable
                title="Weekly Report"
                data={weekly_report}
                columns={columns}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
                }}
                />
                <MaterialTable
                title=""
                data={weekly_report}
                columns={columns_bottom}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
                }}
                />
              </div>
          ) :

          <div>
          
            <MaterialTable
                title="Weekly Report"
                data={[]}
                columns={columns}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
                }}
            />
          
            <MaterialTable
                title=""
                data={[]}
                columns={columns_bottom}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
                }}
            />
            </div>
          }

            </CardBody>
          </Card>
        </GridItem>

        <Dialog open={open} onClose={handleClickClose}>
          <DialogTitle>Weekly Report</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add Weekly Report
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="hotspot"
              label="Hotspot"
              type="text"
              fullWidth
              style={{ marginBottom: "15px" }}
              value={hotspot}
              variant="outlined"
              onChange={(event) => {
                setHotspot(event.target.value);
              }}
            />

            <TextField
              fullWidth
              label="Priorities For Quarter"
              id="prioritiesForTheQuarter"
              multiline
              rows={2}
              required
              variant="outlined"
              className={classes.textInput}
              type="text"
              value={prioritiesForTheQuarter}
              onChange={(event) => {
                const value = event.target.value;
                setPrioritiesForQuarter(value);
              }}
            />

            <TextField
              fullWidth
              label="progressMade"
              id="progressMade"
              multiline
              rows={2}
              required
              variant="outlined"
              className={classes.textInput}
              type="text"
              value={progressMade}
              onChange={(event) => {
                const value = event.target.value;
                setProgressMade(value);
              }}
            />

            <TextField
              fullWidth
              label="progressUpdates"
              id="progressUpdates"
              multiline
              rows={2}
              required
              variant="outlined"
              className={classes.textInput}
              type="text"
              value={progressUpdates}
              onChange={(event) => {
                const value = event.target.value;
                setProgressUpdates(value);
              }}
            />

            <TextField
              fullWidth
              label="Weekly Kpis"
              id="weeklyKpis"
              multiline
              rows={2}
              required
              variant="outlined"
              className={classes.textInput}
              type="text"
              value={weeklyKpis}
              onChange={(event) => {
                const value = event.target.value;
                setWeeklyKpis(value);
              }}
            />

            <TextField
              autoFocus
              margin="dense"
              id="strategicObjecives"
              label="Strategic Objecives"
              type="text"
              fullWidth
              style={{ marginBottom: "15px" }}
              value={strategicObjecives}
              variant="outlined"
              onChange={(event) => {
                setStrategicObjectives(event.target.value);
              }}
            />  

          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleClickClose}>
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
                  saveWeeklyReport(e);
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
