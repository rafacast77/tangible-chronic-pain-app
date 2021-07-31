import React, { useCallback } from "react";
import {
  FormControl,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  addButton: {
    marginTop: theme.spacing(2),
  },
}));
const entryPainLocations = [];
/**
 * This component allows a user to choose the location of their pain.
 * Only user selected locations appear in the list.
 * Selected Items are sent to the painEntries.js
 */
const LocationList = (props) => {
  const classes = useStyles();
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
      <Button
        variant="contained"
        onClick={props.toLocationMenu}
        size={"large"}
        className={classes.addButton}
        color="primary"
      >
        ADD LOCATIONS
      </Button>
    </FormControl>
  );
};

export default LocationList;
