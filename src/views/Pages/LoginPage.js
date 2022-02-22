import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Background from "assets/img/background.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
// import { Link } from "react-router-dom";
import swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { login } from "../../actions/auth";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage() {
    // const { isAuthenticated, isLoading, error, user  } = useSelector(state => state.auth);
    const { isLoading } = useSelector(state => state.auth);

    const history = useHistory();
    const dispatch = useDispatch();

    const classes = useStyles();

    const [code, setCode] = useState("");
    const [session_code, setSessionCode] = useState("");
    const [showloader, setshowloader] = useState(false);

    console.log(setCode, setSessionCode);

    useEffect(() => {
        if (isLoading) {
          setTimeout(() => {
          setshowloader(false);
        }, 2000);
        }
    }, [isLoading]);

    useEffect(() => {
        if (showloader) {
          setTimeout(() => {
          setshowloader(false);
        }, 2000);
        }
    }, [showloader]);

    const handleLogin = e => {
        e.preventDefault();
        setshowloader(true);

        console.log(code, session_code)

        const urlParams = new URLSearchParams(window.location.search);
        console.log("url", urlParams)
        const azure_code = urlParams.get('code');
        setCode(azure_code)

        const azure_session_state = urlParams.get('session_state');
        setSessionCode(azure_session_state)

        console.log("code", azure_code);
        console.log("session", azure_session_state)

        // if(code === "" || session_code === ""  ) {
        //     swal.fire({
        //         title: "Error",
        //         text: "Code is required!",
        //         icon: "error",
        //         dangerMode: true
        //     });
        // }

        dispatch(login(azure_code, azure_session_state))
            .then(response => {
                console.log("here res", response)
                if(response.success == true && response.message == "Login successful") {
                    setshowloader(false);
                    if(response.user.role_id === 0) {
                        history.push(`/admin/dashboard`);
                    } else {
                        history.push(`/user/dashboard`);
                    }


                } else {

                    setshowloader(false);
                    swal.fire({
                        title: "Error",
                        text: 'An error occured, please try again.',
                        icon: "error",
                        dangerMode: true
                    });
                }
            }).catch(err => {

                console.log("login err", err)

                setshowloader(false);
                swal.fire({
                    title: "Error",
                    text: 'An error occured, please try again.',
                    icon: "error",
                    dangerMode: true

                })
            })

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

                                </CardBody>
                                <CardFooter className={classes.cardFooter}>

                                    <GridItem xs={12} sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
                                        {showloader === true ? (
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
