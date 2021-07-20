import React from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

const LocationMenu = (props) => {
  const handleChange = (event) => {
    console.log("object");
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Location Menu</FormLabel>
      <FormGroup aria-label="location" name="location1">
        {props.listLocation.map((location) => {
          return (
            <FormControlLabel
              key={location.id}
              label={location.locationName}
              control={
                <Checkbox
                  onChange={handleChange}
                  name={location.locationName}
                />
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default LocationMenu;
