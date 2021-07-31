import React from "react";
import { useRef } from "react";
import { entryTreatments } from "./treatment/TreatmentList";
import { entryMedications } from "./medication/MedicationList";
import { Button, TextField, Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  dose: {
    minWidth: 400,
  },
}));
/**
 * This is components records extra comments that a user wishes to add.
 */
const ExtraComments = (props) => {
  const classes = useStyles();
  const commentToAddInput = useRef();

  // Submits the extra comments and entire pain entry form.
  const submitPainEntryHandler = () => {
    const comment = commentToAddInput.current.value;
    // swaps forward to the next page
    console.log(`Meds`, entryMedications);
    console.log(`Treats`, entryTreatments);
    props.getMedication(entryMedications);
    props.getTreatment(entryTreatments);
    props.getComment(comment);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <TextField
          className={classes.dose}
          id="filled-multiline-static"
          label="Extra Comments"
          autoFocus={true}
          multiline
          inputRef={commentToAddInput}
          rows={4}
          variant="filled"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={submitPainEntryHandler}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default ExtraComments;
