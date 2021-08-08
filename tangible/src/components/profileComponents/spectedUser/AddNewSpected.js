import React from "react";
import { useRef } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  innerGrid: {
    maxWidth: "300px",
  },
  addBack: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * This component allows the user to add a new pain spected to the
 * list in spectedMenu.
 */
const AddNewSpected = (props) => {
  const classes = useStyles();
  const spectedToAddInput = useRef();
  const applyNewSpectedHandler = (event) => {
    const spected = spectedToAddInput.current.value;

    props.addNewSpected(spected);
    props.toSpectedMenu();
  };

  return (
    <Grid container direction="column" className={classes.innerGrid}>
      <TextField
        inputRef={spectedToAddInput}
        id="AddSpected"
        type="text"
        aria-describedby="my-helper-text"
        label="Spected Email"
        autoFocus={true}
        variant="filled"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={applyNewSpectedHandler}
        className={classes.addBack}
      >
        Apply
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => props.toSpectedMenu()}
        className={classes.addBack}
      >
        Cancel
      </Button>
    </Grid>
  );
};

export default AddNewSpected;
