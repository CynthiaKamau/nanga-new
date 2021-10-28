import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardFooter from "components/Card/CardFooter";
import { IconButton } from "@material-ui/core";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

export default function StrategicObjectives() {
  const classes = useStyles();

  const history = useHistory();

  const handleRedirect = () => {
    history.push('/admin/tasks');
  }

  return (
    <div>
      <GridContainer>
        <Card className={classes.cardBodyRed}>
            <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.textBold}> 1. Grow Topline Growth </h4>
                <h6 className={classes.textGreen}> 6. Management actions</h6>
            </GridItem>
            <CardBody className={classes.cardBody}>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyRed}>
                    <h3 className={classes.cardTitle}>
                        2 <small>Off Ttack</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyRed}>
                    <h3 className={classes.cardTitle}>
                        1 <small>Cancelled</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem >
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyRed}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        0 <small>Postponed</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyGreen}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        3 <small>Ongoing</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyGreen}>
                    <h3 className={classes.cardTitle}>
                        1 <small>Completed</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyGreen}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        0 <small>Not Started</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
            </CardBody>
            <CardFooter className={classes.cardFooter}>
                <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()}/> </IconButton>
            </CardFooter>
        </Card>
      </GridContainer>

      <GridContainer>
        <Card className={classes.cardBodyRed}>
            <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.textBold}> 2. Improve growth of alternate channels</h4>
                <h6 className={classes.textGreen}> 6. Management actions</h6>
            </GridItem>
            <CardBody className={classes.cardBody}>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyRed}>
                    <h3 className={classes.cardTitle}>
                        2 <small>Off Ttack</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyRed}>
                    <h3 className={classes.cardTitle}>
                        1 <small>Cancelled</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem >
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyRed}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        0 <small>Postponed</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyGreen}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        3 <small>Ongoing</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyGreen}>
                    <h3 className={classes.cardTitle}>
                        1 <small>Completed</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyGreen}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        0 <small>Not Started</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
            </CardBody>
            <CardFooter className={classes.cardFooter}>
                <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()}/> </IconButton>
            </CardFooter>
        </Card>
      </GridContainer>

      <GridContainer>
        <Card className={classes.cardBodyRed}>
            <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.textBold}> 3. Another management action </h4>
                <h6 className={classes.textGreen}> 6. Management actions</h6>
            </GridItem>
            <CardBody className={classes.cardBody}>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyRed}>
                    <h3 className={classes.cardTitle}>
                        2 <small>Off Ttack</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyRed}>
                    <h3 className={classes.cardTitle}>
                        1 <small>Cancelled</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem >
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyRed}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        0 <small>Postponed</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyGreen}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        3 <small>Ongoing</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card>
                    <CardBody className={classes.cardBodyGreen}>
                    <h3 className={classes.cardTitle}>
                        1 <small>Completed</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={2}>
                <Card className={classes.cardBodyGreen}>
                    <CardBody>
                    <h3 className={classes.cardTitle}>
                        0 <small>Not Started</small>
                    </h3>
                    </CardBody>
                </Card>
                </GridItem>
            </CardBody>
            <CardFooter className={classes.cardFooter}>
                <IconButton> <ExpandMoreIcon className={classes.iconBottom} onClick={() => handleRedirect()}/> </IconButton>
            </CardFooter>
        </Card>
      </GridContainer>


    </div>
  );
}