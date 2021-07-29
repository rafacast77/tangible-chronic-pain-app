import React, { useState, useCallback } from "react";
import DatePicker from "../components/EntriePageComponents/DatePicker";
import PainScale from "../components/EntriePageComponents/PainScale";
import { Container } from "@material-ui/core";
import Location from "../components/EntriePageComponents/location/Location";
import Medication from "../components/EntriePageComponents/medication/Medication";
import Treatment from "../components/EntriePageComponents/treatment/Treatment";
import ExtraComments from "../components/EntriePageComponents/ExtraComments";
import Grid from "@material-ui/core/Grid";
const PainEntries = () => {
  // -----------STATES-------------
  const [painEntry, setPainEntry] = useState({
    date: {},
    painLocation: [],
    painScale: 0,
    medicine: [],
    treatment: [],
    comments: "",
  });

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
  // -----------UPDATE HANDLERS-------------

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
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid>
        <DatePicker getDateTime={updateDateTimeHandler} />
        <Location getPainLocation={updatePainLocationHandler} />
        <PainScale getPainScaleValue={updatePainScaleHandler} />
        <Medication getMedication={updateMedicationHandler} />
        <Treatment getTreatment={updateTreatmentHandler} />
        <ExtraComments getComment={updatePainCommentsHandler} />
      </Grid>
    </Container>
  );
};

export default PainEntries;
