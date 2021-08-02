import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import tangerine from "../../images/tangerine.png";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonPadding: {
    paddingLeft: theme.spacing(2),
  },
}));
const NavBar = () => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container direction="row">
          <Grid
            container
            direction="row"
            className={classes.buttonPadding}
            alignItems="center"
            item
            xs={6}
          >
            <img src={tangerine} alt="tangerine" width="34" height="34" />
            <Typography variant="h4">Tangible</Typography>
          </Grid>
          <Grid container direction="row" justifyContent="flex-end" item xs={6}>
            <Button
              color="inherit"
              size="large"
              component={Link}
              to="/pain-entries"
            >
              Entry
            </Button>
            <Button
              color="inherit"
              size="large"
              component={Link}
              to="/stats"
              className={classes.buttonPadding}
            >
              Statistics
            </Button>
            <Button
              color="inherit"
              size="large"
              component={Link}
              to="/records"
              className={classes.buttonPadding}
            >
              Records
            </Button>
            <Button
              color="inherit"
              size="large"
              component={Link}
              to="/profile"
              className={classes.buttonPadding}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              size="large"
              component={Link}
              to="/"
              className={classes.buttonPadding}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
