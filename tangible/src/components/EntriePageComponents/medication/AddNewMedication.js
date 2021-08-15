import React from "react";
import { useRef } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  formControl: {
    paddingLeft: 20,
    minWidth: 90,
  },
  formControlTitle: {
    paddingLeft: 20,
  },
  dose: {
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  innerGrid: {
    maxWidth: "350px",
  },
  addBack: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * This component allows the user to add a new medication to the
 * list in medicationMenu.js.
 */
const AddNewMedication = (props) => {
  const classes = useStyles();
  const strengthToInput = useRef();
  const measureToInput = useRef();
  const medicationToAddInput = useRef();
  const applyNewMedicationHandler = () => {
    const medication = {
      medicationName: `${medicationToAddInput.current.value} ${strengthToInput.current.value}${measureToInput.current.value}`,
      selected: false,
    };
    props.addNewMedication(medication);
    props.toMedicationMenu();
  };

  return (
    <Grid container direction="column" className={classes.innerGrid}>
      <TextField
        inputRef={medicationToAddInput}
        id="editLocation"
        type="text"
        aria-describedby="my-helper-text"
        label="Add New Medication"
        autoFocus={true}
        variant="filled"
      />
      <form>
        <TextField
          id="strength"
          label="Strength"
          inputRef={strengthToInput}
          className={classes.dose}
        />
        <FormControl className={classes.formControl}>
          <InputLabel
            htmlFor="grouped-native-select"
            className={classes.formControlTitle}
          >
            Select
          </InputLabel>
          <Select
            native
            inputRef={measureToInput}
            defaultValue=""
            id="measurement"
          >
            <option aria-label="None" value="" />
            <option value={"mg"}>mg</option>
            <option value={"%"}>%</option>
            <option value={"µg"}>µg</option>
            <option value={"g"}>g</option>
          </Select>
        </FormControl>
      </form>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={applyNewMedicationHandler}
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

export default AddNewMedication;
