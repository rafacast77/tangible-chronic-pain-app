import IconButton from "@material-ui/core/IconButton";
import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import React from "react";
import {
  FormControl,
  FormLabel,
  ButtonGroup,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const LocationMenu = (props) => {
  const classes = useStyles();
  //---STATE---
  //---STATE---
  // Selects or De-selects the pain locations shown in locationList.js
  const SelectedPainLocationHandler = (event) => {
    props.listPainLocations.map((location) => {
      if (location.locationName === event.target.name) {
        location.selected = !location.selected;
        props.getSelectedLocation(location);
      }
    });
  };
  // Edits a current location in locationMenu.js
  const editPainLocationHandler = (locationToEdit) => {
    props.swaptoLocationEdit(locationToEdit);
  };

  // Deletes a pain location in the locationMenu.js
  const deletePainLocationHandler = (locationToDelete) => {
    props.getLocationToDelete(locationToDelete);
  };

  // Deletes a pain location in the locationMenu.js
  const addPainLocationHandler = () => {
    props.swapToAddNewLocation();
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Location Menu</FormLabel>
      <FormGroup aria-label="location" name="location1">
        {props.listPainLocations.map((location) => {
          return (
            <ButtonGroup
              key={location.fireBaseId}
              variant="contained"
              color="primary"
              aria-label="split button"
            >
              <FormControlLabel
                label={location.locationName}
                control={
                  <Switch
                    p={0.5}
                    onChange={SelectedPainLocationHandler}
                    name={location.locationName}
                    checked={location.selected}
                  />
                }
              />

              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => editPainLocationHandler(location)}
              >
                <BorderColorTwoToneIcon fontSize="medium" color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => deletePainLocationHandler(location)}
              >
                <DeleteTwoTone fontSize="medium" color="secondary" />
              </IconButton>
            </ButtonGroup>
          );
        })}
      </FormGroup>
      <Button
        size="large"
        variant="contained"
        onClick={addPainLocationHandler}
        color="primary"
      >
        Add New
      </Button>
    </FormControl>
  );
};
export default LocationMenu;
