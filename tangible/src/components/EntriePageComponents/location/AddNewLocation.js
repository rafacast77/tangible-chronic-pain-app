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
 * This component allows the user to add a new pain location to the
 * list in locationMenu.
 */
const AddNewLocation = (props) => {
  const classes = useStyles();
  const locationToAddInput = useRef();
  const applyNewLocationHandler = (event) => {
    const location = {
      locationName: locationToAddInput.current.value,
      selected: false,
    };
    props.addNewLocation(location);
    props.toLocationMenu();
  };

  return (
    <Grid container direction="column" className={classes.innerGrid}>
      <TextField
        inputRef={locationToAddInput}
        id="editLocation"
        type="text"
        aria-describedby="my-helper-text"
        label="Add New Location"
        autoFocus={true}
        variant="filled"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={applyNewLocationHandler}
        className={classes.addBack}
      >
        Apply
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => props.toLocationMenu()}
        className={classes.addBack}
      >
        Cancel
      </Button>
    </Grid>
  );
};

export default AddNewLocation;
