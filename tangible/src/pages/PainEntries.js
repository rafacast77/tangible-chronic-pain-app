import React, { useState, useCallback } from "react";
import DatePicker from "../components/EntriePageComponents/DatePicker";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Location from "../components/EntriePageComponents/location/Location";

const PainEntries = () => {
  const [painEntry, setPainEntry] = useState({ date: {}, painLocation: [] });

  const updateLocation = (entryLocations) => {
    setPainEntry((prevState) => {
      return { ...prevState, painLocation: entryLocations };
    });
  };

  const dateTimeHandler = useCallback((dateAndTime) => {
    console.log(dateAndTime, "Date and time object");
    setPainEntry((prevState) => {
      return { ...prevState, date: dateAndTime };
    });
  }, []);

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
      <Location updateLocation={updateLocation} />
      <DatePicker getDateTime={dateTimeHandler} />
      <Button onClick={() => sendPainEntryToFirebase(painEntry)}>Submit</Button>
    </Container>
  );
};

export default PainEntries;
