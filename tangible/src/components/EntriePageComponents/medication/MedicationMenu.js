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

/**
 * This component is used for the user to enable or disable existant medications.
 * It laso contains a path to addNew, Edit and Delete medications.
 */

const MedicationMenu = (props) => {
  const classes = useStyles();

  // Selects or De-selects the  medications shown in medicationList.js
  const SelectedMedicationHandler = (event) => {
    props.listMedications.forEach((medication) => {
      if (medication.medicationName === event.target.name) {
        medication.selected = !medication.selected;
        props.getSelectedMedication(medication);
      }
    });
  };
  // Edits a current medication in MedicationMenu.js
  const editMedicationHandler = (medicationToEdit) => {
    props.swaptoMedicationEdit(medicationToEdit);
  };

  // Deletes a  medication in the MedicationMenu.js
  const deleteMedicationHandler = (medicationToDelete) => {
    props.getMedicationToDelete(medicationToDelete);
  };

  // Deletes a  medication in the MedicationMenu.js
  const addMedicationHandler = () => {
    props.swapToAddNewMedication();
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Medication Menu</FormLabel>
      <FormGroup aria-label="medication" name="medication1">
        {props.listMedications.map((medication) => {
          return (
            <ButtonGroup
              key={medication.fireBaseId}
              variant="contained"
              color="primary"
              aria-label="split button"
            >
              <FormControlLabel
                label={medication.medicationName}
                control={
                  <Switch
                    p={0.5}
                    onChange={SelectedMedicationHandler}
                    name={medication.medicationName}
                    checked={medication.selected}
                  />
                }
              />

              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => editMedicationHandler(medication)}
              >
                <BorderColorTwoToneIcon fontSize="medium" color="primary" />
              </IconButton>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => deleteMedicationHandler(medication)}
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
        onClick={addMedicationHandler}
        color="primary"
      >
        Add New
      </Button>
    </FormControl>
  );
};
export default MedicationMenu;
