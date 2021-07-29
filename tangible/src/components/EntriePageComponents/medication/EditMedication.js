import React from "react";
import { useRef } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

/**
 * This component allows the user to edit a new medication to the
 * list in medicationMenu.js.
 */
const EditMedication = (props) => {
  const medicationToEditInput = useRef();

  const editMedicationApplyHandler = () => {
    props.medicationToEdit.medicationName = medicationToEditInput.current.value;
    props.editMedicationName(props.medicationToEdit);
    props.toMedicationMenu();
  };

  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Edit medication</InputLabel>
      <Input
        autoFocus="true"
        inputRef={medicationToEditInput}
        id="editMedication"
        type="text"
        aria-describedby="my-helper-text"
        defaultValue={props.medicationToEdit.medicationName}
      />
      space
      <Button
        variant="contained"
        color="primary"
        onClick={editMedicationApplyHandler}
      >
        Apply
      </Button>
    </FormControl>
  );
};

export default EditMedication;
