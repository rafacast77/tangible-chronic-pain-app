import React from "react";
import { useRef } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
const EditLocation = (props) => {
  const locationToEditInput = useRef();

  const editApplyHandler = () => {
    props.painLocationToEdit.locationName = locationToEditInput.current.value;
    props.editLocationName(props.painLocationToEdit);
    props.toLocationMenu();
  };

  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Edit Location</InputLabel>
      <Input
        autoFocus="true"
        inputRef={locationToEditInput}
        id="editLocation"
        type="text"
        aria-describedby="my-helper-text"
        defaultValue={props.painLocationToEdit.locationName}
      />
      space
      <Button variant="contained" color="primary" onClick={editApplyHandler}>
        Apply
      </Button>
    </FormControl>
  );
};

export default EditLocation;
