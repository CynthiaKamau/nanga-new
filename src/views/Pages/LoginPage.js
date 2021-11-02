import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";

// // @material-ui/icons
// import Face from "@material-ui/icons/Face";
// import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Background from "assets/img/background.png";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { login } from "../../actions/auth";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage() {
    const { isAuthenticated, isLoading, error  } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const classes = useStyles();

    const history = useHistory();

    if(isAuthenticated === true) {
        history.push(`/admin/dashboard`);
    }

    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({ showPassword: false });
    const [showloader, setshowloader] = useState(false);

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = e => {
        e.preventDefault();
        setshowloader(true);

        dispatch(login(username, password))
        if (error) {
            setshowloader(false);
            swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                dangerMode: true
            });
        } else if(isAuthenticated  === true) {
            history.push(`/admin/dashboard`);
        }

    }


    return (
        <div style={{
            backgroundImage: `url(${Background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }}>

            <div className={classes.container}
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>

                <GridContainer justify="center">
                    <GridItem xs={12} sm={8} md={8}>
                        <Card style={{ margin: '20px' }}>
                            <form className={classes.form}>
                                <h2 style={{ textAlign: "center", fontWeight: "bold", color: '#38aa52' }}> NANGA </h2>
                                <p style={{ textAlign: "center", fontWeight: "bold" }}> UAP Old Mutual Portal </p>
                                <CardBody>

                                    <TextField
                                        id="outlined-select-uname"
                                        fullWidth
                                        style={{ marginBottom: '15px' }}
                                        variant="outlined"
                                        label="Username"
                                        required
                                        value={username}
                                        onChange={(event) => {
                                            setusername(event.target.value);
                                        }}
                                        helperText="Please input your username">
                                    </TextField>

                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        fullWidth
                                        required
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />

                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    {/* <GridItem xs={12} sm={10} md={8} lg={8}>
                          <Button
                              color="primary"
                              size="lg"
                              fullWidth
                              onClick={handleLogin}
                          >
                              Login
                          </Button>
                          </GridItem> */}

                                    <GridItem xs={12} sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
                                        {showloader === true || isLoading === true ? (
                                            <div style={{ textAlign: "center", marginTop: 10 }}>
                                                <Loader
                                                    type="Puff"
                                                    color="#00BFFF"
                                                    height={150}
                                                    width={150}
                                                />
                                            </div>
                                        ) :
                                            (
                                                <Button size="lg" color="primary" onClick={handleLogin} >
                                                    Login
                                                </Button>
                                            )}
                                        {/* <Link to={"/admin/dashboard"}> */}
                                        {/* <Button size="lg" color="primary" onClicK={handleLogin()} >
                              Login
                              </Button> */}
                                        {/* </Link> */}
                                    </GridItem>
                                </CardFooter>

                                <GridItem
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    style={{ textAlign: "center", marginBottom: 20 }}
                                >
                                    <Link to={"/reset-password"}>
                                        {" "}
                                        <strong style={{ fontSize: 16 }}>
                                            {" "}
                                            Forgot Password?{" "}
                                        </strong>{" "}
                                    </Link>

                                    <p> By using this portal you agree to UAP Old Mutuals Terms of Use and Privacy Policy</p>
                                </GridItem>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>

    );
}
