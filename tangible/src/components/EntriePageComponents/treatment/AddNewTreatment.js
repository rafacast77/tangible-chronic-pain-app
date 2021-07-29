import React from "react";
import { useRef } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

/**
 * This component allows the user to add a new treatment to the
 * list in treatmentMenu.js.
 */
const AddNewTreatment = (props) => {
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
    <FormControl>
      <InputLabel htmlFor="treatment-add-new">Add New treatment</InputLabel>
      <Input
        autoFocus={true}
        inputRef={treatmentToAddInput}
        id="editTreatment"
        type="text"
        aria-describedby="my-helper-text"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={applyNewTreatmentHandler}
      >
        Apply
      </Button>
    </FormControl>
  );
};

export default AddNewTreatment;
