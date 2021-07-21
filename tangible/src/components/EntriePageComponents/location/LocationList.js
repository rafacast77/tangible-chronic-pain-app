import React, { useCallback, useState } from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
const LocationList = (props) => {
  const entryLocations = [];

  const handleChange = useCallback((event) => {
    if (entryLocations.indexOf(event.target.name) === -1) {
      entryLocations.push(event.target.name);
    } else {
      entryLocations.splice(entryLocations.indexOf(event.target.name), 1);
    }

    //TODO here after every change I need to update the global pain entry object which will be sent
    // To firebase
    props.updateLocation(entryLocations);
  }, []);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Location</FormLabel>
      <FormGroup aria-label="location" name="location1">
        {props.listLocation.map((location) => {
          if (location.selected) {
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
          }
        })}
      </FormGroup>
    </FormControl>
  );
};

export default LocationList;
