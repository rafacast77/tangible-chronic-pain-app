import React from "react";
import { useRef } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

const AddNewMedication = (props) => {
  const medicationToAddInput = useRef();
  const applyNewMedicationHandler = () => {
    const medication = {
      medicationName: medicationToAddInput.current.value,
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
