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
 * This component allows the user to add a new treatment to the
 * list in treatmentMenu.js.
 */
const AddNewTreatment = (props) => {
  const classes = useStyles();
  const treatmentToAddInput = useRef();
  const applyNewTreatmentHandler = () => {
    const treatment = {
      treatmentName: treatmentToAddInput.current.value,
      selected: false,
    };
    props.addNewTreatment(treatment);
    props.toTreatmentMenu();
  };

  return (
    <Grid container direction="column" className={classes.innerGrid}>
      <TextField
        inputRef={treatmentToAddInput}
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
        onClick={applyNewTreatmentHandler}
        className={classes.addBack}
      >
        Apply
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => props.toTreatmentMenu()}
        className={classes.addBack}
      >
        Cancel
      </Button>
    </Grid>
  );
};

export default AddNewTreatment;
