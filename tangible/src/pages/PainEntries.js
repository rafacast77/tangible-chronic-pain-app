import React from "react";
import DatePicker from "../components/EntriePageComponents/DatePicker";
import TimePicker from "../components/EntriePageComponents/Timepicker";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Location from "../components/EntriePageComponents/location/Location";
// const LOCATION_DATA = [
//   { locationName: "Upper Back", selected: true, id: 1 },
//   { locationName: "Tail Bone", selected: true, id: 2 },
//   { locationName: "Lower Back", selected: true, id: 3 },
//   { locationName: "Leg (Left)", selected: false, id: 4 },
//   { locationName: "Neck", selected: true, id: 5 },
// ];

const painEntry = {
  id: "needsTBAGenerated",
  day: 20,
  year: 2021,
  month: 7,
  hour: 16,
  minute: 54,
  location: ["neck"],
};
const PainEntries = () => {
  // Sends the painEntry to firebase
  function sendPainEntryToFirebase(painEntry) {
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-locations.json",
      {
        method: "POST",
        body: JSON.stringify(painEntry),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Updates Location on PainEntries
  function updatePainLocation(painLocation) {}

  return (
    <Container maxWidth="lg">
      <Location />
      <DatePicker />
      <TimePicker closeClock={true} disableClock={true} clockIcon={false} />
      <Button onClick={() => sendPainEntryToFirebase(painEntry)}>Submit</Button>
    </Container>
  );
};

export default PainEntries;
