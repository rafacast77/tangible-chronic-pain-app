import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outerGrid: {
    padding: theme.spacing(5),
  },
}));
function OuterGrid(props) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.outerGrid}
      container
      direction="column"
      alignItems="center"
    >
      {props.children}
    </Grid>
  );
}

export default OuterGrid;
