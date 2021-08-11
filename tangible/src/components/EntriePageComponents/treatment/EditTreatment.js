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
 * This component allows the user to edit a new treatment to the
 * list in treatmentMenu.js.
 */
const EditTreatment = (props) => {
  const classes = useStyles();

  const treatmentToEditInput = useRef();

  const editTreatmentApplyHandler = () => {
    props.treatmentToEdit.treatmentName = treatmentToEditInput.current.value;
    props.editTreatmentName(props.TreatmentToEdit);
    props.toTreatmentMenu();
  };

  return (
    <Grid container direction="column" className={classes.innerGrid}>
      <TextField
        inputRef={treatmentToEditInput}
        id="editLocation"
        type="text"
        aria-describedby="my-helper-text"
        autoFocus={true}
        defaultValue={props.treatmentToEdit.treatmentName}
        variant="filled"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={editTreatmentApplyHandler}
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

export default EditTreatment;
