import React from "react";
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
export const entryMedications = [];
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
  addButton: {
    marginTop: theme.spacing(2),
  },
}));
/**
 * This component allows a user to choose the medication taken after
 * their pain episode. Only user selected Medications appear in the list.
 * Selected medication are sent to the painEntries.js for submission
 */
const MedicationList = (props) => {
  const classes = useStyles();
  // Updates the medication list that is sent to PainEntries.js
  const medicationCheckboxHandler = (event) => {
    const medicationIndex = entryMedications.findIndex(
      (med) => med.medicationName === event.target.name
    );

    if (medicationIndex === -1) {
      entryMedications.push({
        medicationName: event.target.name,
        dose: ` - `,
        effect: ` - `,
      });
      event.target.parentElement.parentElement.parentElement.nextSibling.setAttribute(
        "style",
        "display: inline;"
      );
    } else {
      entryMedications.splice(medicationIndex, 1);
      event.target.parentElement.parentElement.parentElement.nextSibling.setAttribute(
        "style",
        "display: none;"
      );
    }
    props.getMedication(entryMedications);
  };

  // Adds effect after medicine to the corresponding medicine
  const medicationEffectHandler = (event) => {
    for (let i = 0; i < entryMedications.length; i++) {
      if (
        entryMedications[i].medicationName ===
        event.target.parentElement.parentElement.parentElement.previousSibling
          .innerText
      ) {
        entryMedications[i].effect = event.target.value;
      }
    }
    props.getMedication(entryMedications);
  };
  // Adds the dose to the corresponding medicine
  const medicationDoseHandler = (event) => {
    for (let i = 0; i < entryMedications.length; i++) {
      if (
        entryMedications[i].medicationName ===
        event.target.parentElement.parentElement.parentElement.previousSibling
          .innerText
      ) {
        entryMedications[i].dose = event.target.value;
      }
    }
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
                    label="Dose"
                    type="number"
                    className={classes.dose}
                    onChange={medicationDoseHandler}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.formControlTitle}>
                      Select an option
                    </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      onChange={medicationEffectHandler}
                    >
                      <option aria-label="None" value="" />
                      <option value={"Better"}>Better</option>
                      <option value={"No Change"}>No Change</option>
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
          return null;
        })}
      </FormGroup>
      <Button
        color="primary"
        variant="contained"
        onClick={props.toMedicationMenu}
        size={"large"}
        className={classes.addButton}
      >
        EDIT MEDICATIONS
      </Button>
    </FormControl>
  );
};

export default MedicationList;
