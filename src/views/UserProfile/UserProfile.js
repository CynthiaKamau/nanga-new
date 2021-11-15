import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardAvatar from "components/Card/CardAvatar.js";
import swal from "sweetalert2";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

import avatar from "../../assets/img/faces/marc.jpg";
import { AirportShuttle } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const { user : currentUser } = useSelector(state => state.auth);

  console.log(currentUser)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [profile_photo, setProfilePhoto] = useState("");

  useEffect(() => {
    setName(currentUser.full_name);
    setEmail(currentUser.email);
    setDepartment(currentUser.department);
    setTeam(currentUser.team);
    setRole(currentUser.role);
  }, []);

  const handleCapture = async ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
        setProfilePhoto((prevState) => ({
            [name]: [...prevState[name], e.target.result]
        }));
    };

    let response = await axios.post(profile_photo);

    if(response.data.success === false) {
      swal.fire({
        title: "Error",
        text: "An error occurred, please try again!",
        icon: "error",
        dangerMode: true
    });
    } else {
      swal.fire({
        title: "Success",
        text: "Profile picture added successfully!",
        icon: "success",
        dangerMode: false
      });
    }
    
};

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <PermIdentity />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                User Profile - <small>Complete your profile</small>
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="UAP Old Mutual"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: name,
                      type: "text"
                    }}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: email,
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Department"
                    id="department"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: department,
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Role"
                    id="role"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: role,
                      type: "text"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Team"
                    id="team"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: team,
                      type: "text"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <Button
                    variant="contained"
                    component="label"
                    onChange={handleCapture}
                  >
                    Upload Profile Photo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      id="profile_photo"
                      type="file"
                      name="profile_photo"
                    />
                  </Button>
                </GridItem>
              </GridContainer>
            
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{currentUser.role}</h6>
              <h4 className={classes.cardTitle}>{currentUser.full_name}</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
