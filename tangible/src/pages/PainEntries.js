import React, { useState, useCallback, useEffect } from "react";
import DatePicker from "../components/EntriePageComponents/DatePicker";
import PainScale from "../components/EntriePageComponents/PainScale";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Location from "../components/EntriePageComponents/location/Location";
import Medication from "../components/EntriePageComponents/medication/Medication";

const PainEntries = () => {
  // -----------STATES-------------
  const [painEntry, setPainEntry] = useState({
    date: {},
    painLocation: [],
    painScale: "",
    medicine: [],
    treatment: {},
    comments: "",
  });

  // -----------STATES-------------

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

  const updatePainTreatmentHandler = (entryTreatment) => {
    setPainEntry((prevState) => {
      return { ...prevState, treatment: entryTreatment };
    });
  };

  const updatePainCommentsHandler = (entryComments) => {
    setPainEntry((prevState) => {
      return { ...prevState, comments: entryComments };
    });
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
      <DatePicker getDateTime={updateDateTimeHandler} />
      <Location getPainLocation={updatePainLocationHandler} />
      <PainScale getPainScaleValue={updatePainScaleHandler} />
      <Medication getMedication={updateMedicationHandler} />

      <Button onClick={() => sendPainEntryToFirebase(painEntry)}>Submit</Button>
    </Container>
  );
};

export default PainEntries;
