import React from "react";
import { useRef } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";

const AddNewLocation = (props) => {
  const locationToAddInput = useRef();
  const applyNewLocationHandler = (event) => {
    const location = {
      locationName: locationToAddInput.current.value,
      selected: false,
    };
    props.addNewLocation(location);
    props.toLocationMenu();
  };

  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Add New Location</InputLabel>
      <Input
        autoFocus="true"
        inputRef={locationToAddInput}
        id="editLocation"
        type="text"
        aria-describedby="my-helper-text"
      />
      space
      <Button
        variant="contained"
        color="primary"
        onClick={applyNewLocationHandler}
      >
        Apply
      </Button>
    </FormControl>
  );
};

export default AddNewLocation;
