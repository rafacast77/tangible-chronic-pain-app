import React, { useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
const entryPainLocations = [];
const LocationList = (props) => {
  // Updates the pain locations list that is sent to PainEntries.js
  const painLocationCheckboxHandler = useCallback(
    (event) => {
      if (entryPainLocations.indexOf(event.target.name) === -1) {
        entryPainLocations.push(event.target.name);
      } else {
        entryPainLocations.splice(
          entryPainLocations.indexOf(event.target.name),
          1
        );
      }
      // Sends updated list to PainEntries for submition
      props.getPainLocation(entryPainLocations);
    },
    [props]
  );

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Location</FormLabel>
      <FormGroup aria-label="location" name="location1">
        {props.listPainLocations.map((location) => {
          if (location.selected) {
            return (
              <FormControlLabel
                key={location.fireBaseId}
                label={location.locationName}
                control={
                  <Checkbox
                    onChange={painLocationCheckboxHandler}
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
