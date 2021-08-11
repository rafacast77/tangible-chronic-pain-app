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
 * This component allows the user to edit a new medication to the
 * list in medicationMenu.js.
 */
const EditMedication = (props) => {
  const classes = useStyles();

  const medicationToEditInput = useRef();

  const editMedicationApplyHandler = () => {
    props.medicationToEdit.medicationName = medicationToEditInput.current.value;
    props.editMedicationName(props.medicationToEdit);
    props.toMedicationMenu();
  };

  return (
    <Grid container direction="column" className={classes.innerGrid}>
      <TextField
        inputRef={medicationToEditInput}
        id="editLocation"
        type="text"
        aria-describedby="my-helper-text"
        autoFocus={true}
        defaultValue={props.medicationToEdit.medicationName}
        variant="filled"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={editMedicationApplyHandler}
        className={classes.addBack}
      >
        Apply
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => props.toMedicationMenu()}
        className={classes.addBack}
      >
        Cancel
      </Button>
    </Grid>
  );
};

export default EditMedication;
