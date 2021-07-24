import React, { useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
const entryMedications = [];
const MedicationList = (props) => {
  // Updates the medication list that is sent to PainEntries.js
  const medicationCheckboxHandler = useCallback(
    (event) => {
      if (entryMedications.indexOf(event.target.name) === -1) {
        entryMedications.push(event.target.name);
      } else {
        entryMedications.splice(entryMedications.indexOf(event.target.name), 1);
      }
      // Sends updated list to PainEntries for submition
      props.getMedication(entryMedications);
    },
    [props]
  );

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Medication</FormLabel>
      <FormGroup aria-label="medication" name="medication1">
        {props.listMedications.map((medication) => {
          if (medication.selected) {
            return (
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
            );
          }
        })}
      </FormGroup>
    </FormControl>
  );
};

export default MedicationList;
