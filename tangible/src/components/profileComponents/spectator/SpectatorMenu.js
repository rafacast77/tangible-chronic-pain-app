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
    marginRight: theme.spacing(2),
  },
  addBackButton: {
    marginTop: theme.spacing(1),
  },
  switchText: {
    textAlign: "left",
  },
}));
/**
 * This component is used for the user to enable or disable existant Spectators.
 * It also contains a path to addNew, Edit and Delete Spectators.
 */
const SpectatorMenu = (props) => {
  // Used for styling this component
  const classes = useStyles();

  // Selects or De-selects the pain spectators shown in spectatorList.js
  const deleteSpectedHandler = (event) => {
    props.deleteSpected();
  };

  // Deletes a pain spectator in the spectatorMenu.js
  const declinePainSpectatorHandler = (spectatorToDelete) => {
    props.declineUserToBeSpected();
  };

  // Deletes a pain spectator in the spectatorMenu.js
  const addPainSpectatorHandler = () => {
    props.addPainUserToBeSpectated();
  };
  console.log(`props.userToSpectate`, props.userToSpectate);
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      xs={12}
    >
      <Grid item xs={6} className={classes.switchText}>
        <Typography align="right" className={classes.extendedIcon}>
          {props.userToSpectate.email}
        </Typography>
      </Grid>

      {props.userToSpectate.requestAccepted && (
        <Grid xs={2}>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            onClick={deleteSpectedHandler}
          >
            <DeleteTwoTone fontSize="medium" color="secondary" />
          </IconButton>
        </Grid>
      )}

      {props.userToSpectate.request && (
        <Grid item xs={6}>
          <Button
            size="small"
            variant="contained"
            onClick={addPainSpectatorHandler}
            color="primary"
            className={classes.extendedIcon}
          >
            Accept
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={declinePainSpectatorHandler}
            color="secondary"
          >
            Decline
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
export default SpectatorMenu;
