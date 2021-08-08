import React, { useRef, useState } from "react";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Tangible
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  ButtonOn: {
    "&:hover": {
      background: "#FF9248",
    },
    background: "#FF9248",
    color: "white",
  },
  ButtonOff: {
    "&:hover": {
      background: "#ededed",
    },
    background: "#ededed",
    color: "#787878",
  },
  paper: {
    margin: theme.spacing(12, 16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  // Input Refs
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const lastNameInputRef = useRef();
  //Sends Email and Password to parent component for Authentication
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const displayName =
      nameInputRef.current.value + " " + lastNameInputRef.current.value;
    props.onSubmit(enteredEmail, enteredPassword, displayName, userRole);
    // optional: Add validation
  };

  const [userRole, setuserRole] = useState("PAIN USER");
  const [userRoleBtnClr, setuserRoleBtnClr] = useState(false);
  const changeBtnColor = (event) => {
    if (event.target.innerText === "PAIN USER") {
      setuserRoleBtnClr(false);
    } else {
      setuserRoleBtnClr(true);
    }
    setuserRole(event.target.innerText);
  };
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                variant="outlined"
                required
                inputRef={nameInputRef}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                inputRef={lastNameInputRef}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordInputRef}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>
                <Button
                  variant="contained"
                  className={clsx(classes.ButtonOn, {
                    [classes.ButtonOff]: userRoleBtnClr,
                  })}
                  size="large"
                  onClick={changeBtnColor}
                  fullWidth="true"
                >
                  Pain User
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant="contained"
                  onClick={changeBtnColor}
                  className={clsx(classes.ButtonOn, {
                    [classes.ButtonOff]: !userRoleBtnClr,
                  })}
                  size="large"
                  fullWidth="true"
                >
                  Spectator
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={props.toSignIn} color="primary">
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Grid>
  );
}
