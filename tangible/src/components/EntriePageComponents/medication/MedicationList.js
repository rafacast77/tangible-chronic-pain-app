import React, { useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Select,
  makeStyles,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
const entryMedications = [];
const useStyles = makeStyles((theme) => ({
  formControl: {
    paddingLeft: 20,
    maxWidth: 300,
  },
  formControlTitle: {
    paddingLeft: 20,
  },
  dose: {
    maxWidth: 80,
  },
}));
const MedicationList = (props) => {
  // Updates the medication list that is sent to PainEntries.js
  const medicationCheckboxHandler = useCallback(
    (event) => {
      if (entryMedications.indexOf(event.target.name) === -1) {
        entryMedications.push({
          medicationName: event.target.name,
          dose: "",
          effect: "",
        });
        event.target.parentElement.parentElement.parentElement.nextSibling.setAttribute(
          "style",
          "display: inline;"
        );
      } else {
        entryMedications.splice(entryMedications.indexOf(event.target.name), 1);
        event.target.parentElement.parentElement.parentElement.nextSibling.setAttribute(
          "style",
          "display: none;"
        );
      }
    },
    [props]
  );

  const classes = useStyles();

  const medicationEffectHandler = (event) => {
    for (let i = 0; i < entryMedications.length; i++) {
      if (
        entryMedications[i].medicationName ==
        event.target.parentElement.parentElement.parentElement.previousSibling
          .innerText
      ) {
        entryMedications[i].effect = event.target.value;
      }
    }
  };

  const medicationDoseHandler = (event) => {
    for (let i = 0; i < entryMedications.length; i++) {
      if (
        entryMedications[i].medicationName ==
        event.target.parentElement.parentElement.parentElement.previousSibling
          .innerText
      ) {
        entryMedications[i].dose = event.target.value;
      }
    }
  };

  const toTreatmentHandler = () => {
    console.log(entryMedications);
    // Sends updated list to PainEntries for submition
    props.getMedication(entryMedications);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Medication</FormLabel>
      <FormGroup aria-label="medication" name="medication1">
        {props.listMedications.map((medication) => {
          if (medication.selected) {
            return (
              <>
                <FormControlLabel
                  key={medication.fireBaseId}
                  label={medication.medicationName}
                  control={
                    <Checkbox
                      onChange={medicationCheckboxHandler}
                      name={medication.medicationName}
                    />
                  }
                />
                <form style={{ display: "none" }}>
                  <TextField
                    id="filled-basic"
                    label="Dose"
                    className={classes.dose}
                    onChange={medicationDoseHandler}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="grouped-native-select"
                      className={classes.formControlTitle}
                    >
                      Select an option
                    </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      id="grouped-native-select"
                      onChange={medicationEffectHandler}
                    >
                      <option aria-label="None" value="" />
                      <option value={"Better"}>Better</option>
                      <option value={"No CHange"}>No Change</option>
                      <option value={"Worse"}>Worse</option>
                    </Select>
                    <FormHelperText>
                      How do you feel after taking the medication
                    </FormHelperText>
                  </FormControl>
                </form>
              </>
            );
          }
        })}
      </FormGroup>
      <Button variant="contained" onClick={toTreatmentHandler}>
        Next
      </Button>
    </FormControl>
  );
};

export default MedicationList;
