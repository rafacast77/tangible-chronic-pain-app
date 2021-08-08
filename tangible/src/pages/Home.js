import React, { useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import AuthContext from "../store/Auth-context";
import {
  getUserLoginData,
  createNewUser,
  getUserAccountDatabase,
  createUserAccountDatabase,
} from "../components/ui/LoginHttpRequests";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/1600x900/?health)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default function Signin() {
  const classes = useStyles();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [isSignIn, setIsSignIn] = useState(true);
  //Swaps between sign in and sign up page
  const signInUpSwap = () => {
    setIsSignIn(!isSignIn);
  };

  //Submits a SignUp or SignIn request to firebase for Authentication
  const submitHandler = (email, password, displayName, userRole) => {
    if (isSignIn) {
      // Logs in and returns a user and it's data
      getUserLoginData(email, password).then((res) => {
        if (res) {
          authCtx.getUserUID(res.localId);
          authCtx.login(res.idToken);
          authCtx.getUserEmail(res.email);
          getUserAccountDatabase(res.localId).then((accountInfo) => {
            authCtx.getIsPainUser(accountInfo.isPainUser);
            if (accountInfo.Info !== "") {
              authCtx.getUserToSpectUID(accountInfo);
            }
          });
          // if is pain user direct to pain entries if spectator direct to profile
          if (authCtx.isPainUser) {
            history.replace("/pain-entries");
          } else {
            history.replace("/profile");
          }
        }
      });
    } else {
      // Creates a user account and returns it's created data
      createNewUser(email, password, displayName, userRole).then((res) => {
        if (res) {
          authCtx.getUserUID(res.localId);
          authCtx.login(res.idToken);
          authCtx.getUserEmail(res.email);
          // Saves current user session token in context
          createUserAccountDatabase(res, userRole).then((response) => {
            getUserAccountDatabase(res.localId).then((accountInfo) => {
              authCtx.getIsPainUser(accountInfo.isPainUser);
            });
          });

          // if is pain user direct to pain entries if spectator direct to profile
          if (userRole === "PAIN USER") {
            history.replace("/pain-entries");
          } else {
            history.replace("/profile");
          }
        }
      });
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* //this grid contains the Image */}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {/* This is the sign in / sign up grid */}
      {isSignIn ? (
        <SignIn toSignUp={signInUpSwap} onSubmit={submitHandler} />
      ) : (
        <SignUp toSignIn={signInUpSwap} onSubmit={submitHandler} />
      )}
    </Grid>
  );
}
