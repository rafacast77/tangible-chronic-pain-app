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
  addBack: {
    marginTop: theme.spacing(1),
  },
}));
/**
 * This component is used for the user to enable or disable existant treatments.
 * It also contains a path to addNew, Edit and Delete treatments.
 */
const TreatmentMenu = (props) => {
  const classes = useStyles();

  // Selects or De-selects the  treatments shown in treatmentList.js
  const SelectedTreatmentHandler = (event) => {
    props.listTreatments.forEach((treatment) => {
      if (treatment.treatmentName === event.target.name) {
        treatment.selected = !treatment.selected;
        props.getSelectedTreatment(treatment);
      }
    });
  };
  // Edits a current treatment in TreatmentMenu.js
  const editTreatmentHandler = (treatmentToEdit) => {
    props.swaptoTreatmentEdit(treatmentToEdit);
  };

  // Deletes a  treatment in the TreatmentMenu.js
  const deleteTreatmentHandler = (treatmentToDelete) => {
    props.getTreatmentToDelete(treatmentToDelete);
  };

  // Deletes a  treatment in the TreatmentMenu.js
  const addTreatmentHandler = () => {
    props.swapToAddNewTreatment();
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Treatment Menu</FormLabel>
      <FormGroup aria-label="treatment" name="treatment1">
        {props.listTreatments.map((treatment) => {
          return (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid xs={8}>
                <FormControlLabel
                  label={treatment.treatmentName}
                  control={
                    <Switch
                      p={0.5}
                      onChange={SelectedTreatmentHandler}
                      name={treatment.treatmentName}
                      checked={treatment.selected}
                    />
                  }
                />
              </Grid>
              <Grid xs={2}>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => editTreatmentHandler(treatment)}
                >
                  <BorderColorTwoToneIcon fontSize="medium" color="primary" />
                </IconButton>
              </Grid>
              <Grid xs={2}>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => deleteTreatmentHandler(treatment)}
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
          onClick={addTreatmentHandler}
          color="primary"
          className={classes.addBack}
        >
          Add New
        </Button>
        <Button
          variant="contained"
          onClick={props.toTreatmentList}
          className={classes.addBack}
        >
          Back
        </Button>
      </Grid>
    </FormControl>
  );
};
export default TreatmentMenu;
