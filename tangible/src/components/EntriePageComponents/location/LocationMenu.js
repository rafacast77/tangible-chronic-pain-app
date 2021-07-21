import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

const LocationMenu = (props) => {
  const [locationSelected, setLocationSelected] = useState(false);

  const handleChange = (event) => {
    let puHttptLocation;
    props.listLocation.map((location) => {
      if (location.locationName === event.target.name) {
        location.selected = !location.selected;
        puHttptLocation = location;
      }
    });
    setLocationSelected(!locationSelected);
    console.log(puHttptLocation.fireBaseId === "-Mf2pAq5UbZJt_IJxfY_");
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-locations/${puHttptLocation.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(puHttptLocation),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Location Menu</FormLabel>
      <FormGroup aria-label="location" name="location1">
        {props.listLocation.map((location) => {
          return (
            <FormControlLabel
              key={location.id}
              label={location.locationName}
              control={
                <Checkbox
                  onChange={handleChange}
                  name={location.locationName}
                  checked={location.selected}
                />
              }
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default LocationMenu;
