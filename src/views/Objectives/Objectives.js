import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function ObjectivesPage() {
  const classes = useStyles();

  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [kpi, setKpi] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [target, setTarget] = useState("");
  const [targetAtReview, setTargetAtReview] = useState("");
  const [targetAchieved, setTargetAchieved] = useState("");

  if(description === '') { console.log(description)}

  const kpis = [
    {
      value: 'finance',
      label: 'Finance',
    },
    {
      value: 'kpi',
      label: 'KPI',
    },
    {
      value: 'objectives',
      label: 'Objectives',
    },
    {
      value: 'tasks',
      label: 'Tasks',
    },
  ]

  const units = [
    {
      value: '%',
      label: '%',
    },
    {
      value: '>',
      label: '>',
    },
    {
      value: '<',
      label: '<',
    },
    {
      value: 'KES',
      label: 'KES',
    },
  ]

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Strategic Objectives</h4>
              <p className={classes.cardCategoryWhite}>Add New Strategic Objective</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <TextField
                  fullWidth
                  label="Description"
                  id="description"
                  multiline
                  maxRows={4}
                  type="text"
                  value={description}
                  onChange = {(event) => {
                      const value = event.target.value;
                      setDescription(value)
                  }} 
                  />
                </GridItem>
              </GridContainer>
              <GridContainer style={{ paddingBottom: '25px'}}>
                <GridItem xs={12} sm={12} md={12}> <h4 style={{ fontWeight: 'bold'}}> Associated KPI </h4> </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <label> KPI Category : </label>
                  <TextField
                    id="outlined-select-kpi"
                    select
                    fullWidth
                    variant="outlined"
                    label="Select"
                    value={kpi}
                    onChange = {(event) => {
                      setKpi(event.target.value);
                    }}
                    helperText="Please select your kpi"
                  >
                    {kpis.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <label> Unit : </label>
                <TextField
                  id="outlined-select-type"
                  select
                  fullWidth
                  variant="outlined"
                  label="Select"
                  value={unit}
                  onChange = {(event) => {
                    setUnit(event.target.value);
                  }}
                  helperText="Please select your unit"
                >
                  {units.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Annual Plan"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="target"
                    label="Target"
                    type="text"
                    fullWidth
                    style={{marginBottom : '15px'}}
                    value={target}
                    variant="standard"
                    onChange = {(event) => {
                        setTarget(event.target.value);
                    }}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="target_at_review"
                    label="Target At Review"
                    type="text"
                    fullWidth
                    style={{marginBottom : '15px'}}
                    value={targetAtReview}
                    variant="standard"
                    onChange = {(event) => {
                        setTargetAtReview(event.target.value);
                    }}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="target_achieved"
                  label="Target Achieved"
                  type="text"
                  fullWidth
                  style={{marginBottom : '15px'}}
                  value={targetAchieved}
                  variant="standard"
                  onChange = {(event) => {
                      setTargetAchieved(event.target.value);
                  }}
              />

              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <label style={{ fontWeight : 'bold'}}> Start Date: </label>
                    <CustomInput
                      // labelText="Start Date"
                      id="date"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                          type: "date",
                          value: start_date,
                          onChange: event => {
                              const value = event.target.value;
                              setStartDate(value)
                          }
                      }}
                    />                  
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <label style={{ fontWeight : 'bold'}}> End Date: </label>
                  <CustomInput
                    // labelText="End Date"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                        type: "date",
                        value: end_date,
                        onChange: event => {
                            const value = event.target.value;
                            setEndDate(value)
                        }
                    }}
                  />

                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Add Management Action</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
