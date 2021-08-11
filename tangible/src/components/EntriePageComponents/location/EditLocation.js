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
 * This component allows the user to edit a new location to the
 * list in locationMenu.js.
 */
const EditLocation = (props) => {
  const classes = useStyles();
  const locationToEditInput = useRef();

  const editApplyHandler = () => {
    props.painLocationToEdit.locationName = locationToEditInput.current.value;
    props.editLocationName(props.painLocationToEdit);
    props.toLocationMenu();
  };

  return (
    <Grid container direction="column" className={classes.innerGrid}>
      <TextField
        inputRef={locationToEditInput}
        id="editLocation"
        type="text"
        aria-describedby="my-helper-text"
        autoFocus={true}
        defaultValue={props.painLocationToEdit.locationName}
        variant="filled"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={editApplyHandler}
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

export default EditLocation;
