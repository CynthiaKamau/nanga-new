import React, { useState, useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import axios from "axios";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import Avatar from "../../assets/img/default-avatar.png";
import { getUser } from "actions/auth";

import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import Loader from "react-loader-spinner";

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user : currentUser } = useSelector(state => state.auth);
  const { myuser } = useSelector(state => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const [role_id, setRoleId] = useState("");
  const [team_id, setTeamId] = useState("");
  const [id, setId] = useState("");
  const [updated_by, setUpdatedBy] = useState(currentUser.id);
  const [showloader, setshowloader] = useState(false);  
  const [image, _setImage] = useState(null);
  const [avatar, setAvatar] = useState("")
  const inputFileRef = createRef(null);

  // var urlCreator = window.URL || window.webkitURL;

  // var imageUrl = urlCreator.createObjectURL(avatar);

  console.log("my pic", avatar);

  useEffect(() => {
    dispatch(getUser(currentUser.id));
  }, []);


  useEffect(() => {
    if(myuser) {
      setName(myuser.fullnames);
      setEmail(myuser.email);
      setDepartment(myuser.extension);
      setTeam(myuser.teams.name);
      setRole(myuser.roles.role_name);
      setRoleId(myuser.role);
      setTeamId(myuser.team);
      setId(myuser.id);
      setAvatar(myuser.userPicture);
    }
    
  }, [myuser]);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = async (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      const base64 = await convertBase64(newImage)
      console.log(base64)
      setImage(base64)
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setshowloader(true);

    console.log("save values", id, name, email, department, team, role, updated_by, setUpdatedBy, setAvatar);

    const config = { headers: { 'Content-Type': 'application/json' } };

    const body = JSON.stringify({ 
      updated_by_id: updated_by,
      email: email,
      extension: department,
      full_names: name,
      role_id: role_id,
      team_id: team_id,
      view: true,
      user_picture: image,
      id: id
     });

    let response = await axios.post('/users/update', body, config);

    if(response.data.success === false) {
      setshowloader(false)
      swal.fire({
        title: "Error",
        text: "An error occurred, please try again!",
        icon: "error",
        dangerMode: true
      });
    } else {
      let msg = response.data.message;
      setshowloader(false)
      swal.fire({
        title: "Success",
        text: msg,
        icon: "success",
      }).then(() => dispatch(getUser(currentUser.id)));
    }  
  }

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
                    labelText="Extension"
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
              
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                <input
                  ref={inputFileRef}
                  accept="image/*"
                  hidden
                  id="avatar-image-upload"
                  type="file"
                  onChange={handleOnChange}
                />
                <label htmlFor="avatar-image-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    mb={2}
                    onClick={handleClick}
                  >
                    {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                    {image ? "Remove" : "Upload"}
                  </Button>
                </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                { showloader === true ? (
                  <div style={{ textAlign: "center", marginTop: 10 }}>
                      <Loader
                          type="Puff"
                          color="#29A15B"
                          height={150}
                          width={150}
                      />
                  </div>
                  ) :
                  (
                  <Button color="primary" onClick={(e) => handleSubmit(e)}> Save</Button>
                  )}
                </GridItem>
              </GridContainer>
            
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
                { avatar == null || avatar == undefined || avatar === '' || avatar == "null" ? ( <img src={Avatar} alt="..." /> )
                : avatar ? ( <img src={avatar} alt="..." /> )
                : (<img src={Avatar} alt="..." /> )}

            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{role}</h6>
              <h4 className={classes.cardTitle}>{name}</h4>
              <p className={classes.description}>
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
