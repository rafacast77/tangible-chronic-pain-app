import IconButton from "@material-ui/core/IconButton";
import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormLabel,
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
  addBackButton: {
    marginTop: theme.spacing(1),
  },
  switchText: {
    textAlign: "left",
  },
}));
/**
 * This component is used for the user to enable or disable existant Locations.
 * It also contains a path to addNew, Edit and Delete Locations.
 */
const LocationMenu = (props) => {
  // Used for styling this component
  const classes = useStyles();

  // Selects or De-selects the pain locations shown in locationList.js
  const SelectedPainLocationHandler = (event) => {
    props.listPainLocations.forEach((location) => {
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
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid xs={8} className={classes.switchText}>
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
              </Grid>
              <Grid xs={2}>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => editPainLocationHandler(location)}
                >
                  <BorderColorTwoToneIcon fontSize="medium" color="primary" />
                </IconButton>
              </Grid>
              <Grid xs={2}>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => deletePainLocationHandler(location)}
                >
                  <DeleteTwoTone fontSize="medium" color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </FormGroup>
      <Grid container direction="column">
        <Button
          size="large"
          variant="contained"
          onClick={addPainLocationHandler}
          color="primary"
          className={classes.addBackButton}
        >
          Add New
        </Button>
        <Button
          variant="contained"
          onClick={() => props.toLocationList()}
          className={classes.addBackButton}
        >
          Back
        </Button>
      </Grid>
    </FormControl>
  );
};
export default LocationMenu;
