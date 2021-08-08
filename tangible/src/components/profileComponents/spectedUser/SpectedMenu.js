import IconButton from "@material-ui/core/IconButton";
import DeleteTwoTone from "@material-ui/icons/DeleteTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormLabel,
  Button,
  FormGroup,
  Typography,
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
 * This component is used for the user to enable or disable existant Specteds.
 * It also contains a path to addNew, Edit and Delete Specteds.
 */
const SpectedMenu = (props) => {
  // Used for styling this component
  const classes = useStyles();

  // Selects or De-selects the pain specteds shown in spectedList.js
  const SelectedPainSpectedHandler = (event) => {
    props.listPainSpecteds.forEach((spected) => {
      if (spected.spectedName === event.target.name) {
        spected.selected = !spected.selected;
        props.getSelectedSpected(spected);
      }
    });
  };

  // Deletes a pain spected in the spectedMenu.js
  const deletePainSpectedHandler = (spectedToDelete) => {
    props.getSpectedToDelete(spectedToDelete);
  };

  // Deletes a pain spected in the spectedMenu.js
  const addPainSpectedHandler = () => {
    props.swapToAddNewSpected();
  };

  console.log("list", props.listPainSpecteds);
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Spected Menu</FormLabel>
      <FormGroup aria-label="spected" name="spected1">
        {props.listPainSpecteds.map((spected) => {
          return (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid xs={8} className={classes.switchText}>
                <Typography>{spected.spectedName}</Typography>
              </Grid>
              <Grid xs={2}>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => deletePainSpectedHandler(spected)}
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
          onClick={addPainSpectedHandler}
          color="primary"
          className={classes.addBackButton}
        >
          Invite Spected
        </Button>
      </Grid>
    </FormControl>
  );
};
export default SpectedMenu;
