import React from "react";
import { useRef } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

/**
 * This component allows the user to edit a new treatment to the
 * list in treatmentMenu.js.
 */
const EditTreatment = (props) => {
  const treatmentToEditInput = useRef();

  const editTreatmentApplyHandler = () => {
    props.treatmentToEdit.treatmentName = treatmentToEditInput.current.value;
    props.editTreatmentName(props.TreatmentToEdit);
    props.toTreatmentMenu();
  };

  return (
    <FormControl>
      <InputLabel htmlFor="edit-treatment">Edit Treatment</InputLabel>
      <Input
        autoFocus="true"
        inputRef={treatmentToEditInput}
        id="editTreatment"
        type="text"
        aria-describedby="my-helper-text"
        defaultValue={props.treatmentToEdit.treatmentName}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={editTreatmentApplyHandler}
      >
        Apply
      </Button>
    </FormControl>
  );
};

export default EditTreatment;
