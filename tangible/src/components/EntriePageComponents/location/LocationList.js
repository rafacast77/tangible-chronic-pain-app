import React, { useCallback } from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
const entryPainLocations = [];
/**
 * This component allows a user to choose the location of their pain.
 * Only user selected locations appear in the list.
 * Selected Items are sent to the painEntries.js
 */
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
          } else {
            return null;
          }
        })}
      </FormGroup>
    </FormControl>
  );
};

export default LocationList;
