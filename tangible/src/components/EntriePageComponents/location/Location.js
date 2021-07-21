import React, { useState, useEffect } from "react";
import LocationList from "./LocationList";
import { Button } from "@material-ui/core";
import Card from "../../ui/Card";
import LocationMenu from "./LocationMenu";

const Location = (props) => {
  const [locationMenu, setLocationMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listPainLocations, setListPainLocations] = useState([]);

  function clickHandler() {
    setLocationMenu(!locationMenu);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-locations.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const listLocations = [];

        for (const key in data) {
          const location = {
            fireBaseId: key,
            ...data[key],
          };
          listLocations.push(location);
        }
        setIsLoading(false);
        setListPainLocations(listLocations);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <Card>
      <LocationList
        listLocation={listPainLocations}
        updateLocation={props.updateLocation}
      />
      {locationMenu && <LocationMenu listLocation={listPainLocations} />}
      <Button onClick={clickHandler}>Click me</Button>
    </Card>
  );
};

export default Location;
