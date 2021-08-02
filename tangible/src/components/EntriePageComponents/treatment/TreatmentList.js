import React from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  makeStyles,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
export const entryTreatments = [];
const useStyles = makeStyles((theme) => ({
  formControl: {
    paddingLeft: 20,
    maxWidth: 300,
  },
  formControlTitle: {
    paddingLeft: 20,
  },
  dose: {
    maxWidth: 80,
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
}));
/**
 * This component allows a user to choose the treatment used to alliviate
 * the pain. Only user selected treatment appear in the list.
 * Selected treatment are sent to the painEntries.js for submission
 */
const TreatmentList = (props) => {
  const classes = useStyles();
  // Updates the treatment list that is sent to PainEntries.js
  const treatmentCheckboxHandler = (event) => {
    const treatmentIndex = entryTreatments.findIndex(
      (tret) => tret.treatmentName === event.target.name
    );

    if (treatmentIndex === -1) {
      entryTreatments.push({
        treatmentName: event.target.name,
        effect: "",
      });
      event.target.parentElement.parentElement.parentElement.nextSibling.setAttribute(
        "style",
        "display: inline;"
      );
    } else {
      entryTreatments.splice(treatmentIndex, 1);
      event.target.parentElement.parentElement.parentElement.nextSibling.setAttribute(
        "style",
        "display: none;"
      );
    }
    props.getTreatment(entryTreatments);
  };

  // Adds effect after medicine to the corresponding medicine
  const treatmentEffectHandler = (event) => {
    for (let i = 0; i < entryTreatments.length; i++) {
      if (
        entryTreatments[i].treatmentName ===
        event.target.parentElement.parentElement.parentElement.previousSibling
          .innerText
      ) {
        entryTreatments[i].effect = event.target.value;
      }
    }
    props.getTreatment(entryTreatments);
  };

  // swaps forward to the next page
  const toTreatmentHandler = () => {
    // Sends updated list to PainEntries for submition
    props.getTreatment(entryTreatments);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Treatment</FormLabel>
      <FormGroup aria-label="treatment" name="treatment1">
        {props.listTreatments.map((treatment) => {
          if (treatment.selected) {
            return (
              <>
                <FormControlLabel
                  key={treatment.fireBaseId}
                  label={treatment.treatmentName}
                  control={
                    <Checkbox
                      onChange={treatmentCheckboxHandler}
                      name={treatment.treatmentName}
                    />
                  }
                />
                <form style={{ display: "none" }}>
                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.formControlTitle}>
                      Select an option
                    </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      onChange={treatmentEffectHandler}
                    >
                      <option aria-label="None" value="" />
                      <option value={"Better"}>Better</option>
                      <option value={"No Change"}>No Change</option>
                      <option value={"Worse"}>Worse</option>
                    </Select>
                    <FormHelperText>
                      How do you feel after the treatment
                    </FormHelperText>
                  </FormControl>
                </form>
              </>
            );
          }
          return null;
        })}
      </FormGroup>
      <Button
        color="primary"
        size={"large"}
        variant="contained"
        onClick={props.toTreatmentMenu}
        className={classes.addButton}
      >
        ADD TREATMENTS
      </Button>
    </FormControl>
  );
};

export default TreatmentList;
