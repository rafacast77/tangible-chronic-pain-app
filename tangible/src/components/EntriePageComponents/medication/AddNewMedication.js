import React from "react";
import { useRef } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Select,
  makeStyles,
} from "@material-ui/core";
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
}));
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
    <FormControl>
      <InputLabel htmlFor="my-input">Add New medication</InputLabel>
      <Input
        autoFocus="true"
        inputRef={medicationToAddInput}
        id="editMedication"
        type="text"
        aria-describedby="my-helper-text"
      />
      <form>
        <TextField
          id="filled-basic"
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
            id="grouped-native-select"
          >
            <option aria-label="None" value="" />
            <option value={"mg"}>mg</option>
            <option value={"%"}>%</option>
            <option value={"µg"}>µg</option>
            <option value={"g"}>g</option>
          </Select>
        </FormControl>
      </form>
      space
      <Button
        variant="contained"
        color="primary"
        onClick={applyNewMedicationHandler}
      >
        Apply
      </Button>
    </FormControl>
  );
};

export default AddNewMedication;
