import React from "react";
import { useRef } from "react";
import { entryTreatments } from "./treatment/TreatmentList";
import { entryMedications } from "./medication/MedicationList";
import { Button, TextField, Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  textBox: {
    minWidth: 400,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  extraComments: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(6),
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
    props.getComment(comment);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.extraComments}
      >
        <TextField
          className={classes.textBox}
          id="filled-multiline-static"
          label="Extra Comments"
          autoFocus={true}
          variant="filled"
          multiline
          inputRef={commentToAddInput}
          rows={4}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={submitPainEntryHandler}
          className={classes.submitButton}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default ExtraComments;
