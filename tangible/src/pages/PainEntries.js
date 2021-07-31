import React, { useState, useCallback } from "react";
import DatePicker from "../components/EntriePageComponents/DatePicker";
import PainScale from "../components/EntriePageComponents/PainScale";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import Location from "../components/EntriePageComponents/location/Location";
import Medication from "../components/EntriePageComponents/medication/Medication";
import Treatment from "../components/EntriePageComponents/treatment/Treatment";
import ExtraComments from "../components/EntriePageComponents/ExtraComments";
import Grid from "@material-ui/core/Grid";
import Card from "../components/ui/Card";
import ChevronLeftTwoToneIcon from "@material-ui/icons/ChevronLeftTwoTone";
import ChevronRightTwoToneIcon from "@material-ui/icons/ChevronRightTwoTone";
import { PAGESWAPTITLES } from "../components/EntriePageComponents/PainEntriesPainRangeText";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  swapBar: {
    marginLeft: theme.spacing(4.2),
    marginRight: theme.spacing(4.2),
  },
}));

const PainEntries = () => {
  const classes = useStyles();
  // -----------STATES-------------
  const [painEntry, setPainEntry] = useState({
    date: {},
    painLocation: [],
    painScale: 0,
    medicine: [],
    treatment: [],
    comments: "",
  });

  const [pageSwap, setPageSwap] = useState(0);

  // -----------UPDATE HANDLERS-------------

  const updateDateTimeHandler = useCallback((EntryDateAndTime) => {
    setPainEntry((prevState) => {
      return { ...prevState, date: EntryDateAndTime };
    });
  }, []);

  const updatePainLocationHandler = (entryLocations) => {
    setPainEntry((prevState) => {
      return { ...prevState, painLocation: entryLocations };
    });
  };

  const updatePainScaleHandler = (entryPainScale) => {
    setPainEntry((prevState) => {
      return { ...prevState, painScale: entryPainScale };
    });
  };

  const updateMedicationHandler = (entryMedicine) => {
    setPainEntry((prevState) => {
      return { ...prevState, medicine: entryMedicine };
    });
  };

  const updateTreatmentHandler = (entryTreatment) => {
    setPainEntry((prevState) => {
      return { ...prevState, treatment: entryTreatment };
    });
  };

  const updatePainCommentsHandler = (entryComments) => {
    painEntry.comments = entryComments;
    sendPainEntryToFirebase(painEntry);
  };

  // Sends the painEntry to firebase
  function sendPainEntryToFirebase(painEntry) {
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-entries.json",
      {
        method: "POST",
        body: JSON.stringify(painEntry),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setPainEntry({
        date: {},
        painLocation: [],
        painScale: 0,
        medicine: [],
        treatment: [],
        comments: "",
      });
    });
    setPageSwap(0);
  }

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Card>
          <Grid item xs={12}>
            <Typography align="center" display="block" variant="h4">
              {PAGESWAPTITLES[pageSwap].question}
            </Typography>
          </Grid>
        </Card>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.swapBar}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            disabled={pageSwap === 0}
            startIcon={<ChevronLeftTwoToneIcon />}
            onClick={() =>
              setPageSwap((prevState) => {
                return prevState - 1;
              })
            }
          >
            Back
          </Button>
          <Typography variant="h4">{PAGESWAPTITLES[pageSwap].title}</Typography>
          <Button
            size="large"
            variant="contained"
            color="primary"
            disabled={pageSwap === 5}
            endIcon={<ChevronRightTwoToneIcon />}
            onClick={() =>
              setPageSwap((prevState) => {
                return prevState + 1;
              })
            }
          >
            Next
          </Button>
        </Grid>
        <Card>
          <Grid item xs={12} className={classes.container}>
            {pageSwap === 0 && (
              <DatePicker getDateTime={updateDateTimeHandler} />
            )}
            {pageSwap === 1 && (
              <Location getPainLocation={updatePainLocationHandler} />
            )}
            {pageSwap === 2 && (
              <PainScale getPainScaleValue={updatePainScaleHandler} />
            )}
            {pageSwap === 3 && <Medication />}
            {pageSwap === 4 && <Treatment submitMedication={pageSwap} />}
            {pageSwap === 5 && (
              <ExtraComments
                getComment={updatePainCommentsHandler}
                getMedication={updateMedicationHandler}
                getTreatment={updateTreatmentHandler}
              />
            )}
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default PainEntries;
