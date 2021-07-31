import React, { useState, useEffect } from "react";
import LocationList from "./LocationList";
import LocationMenu from "./LocationMenu";
import Grid from "@material-ui/core/Grid";
import EditLocation from "./EditLocation";
import AddNewLocation from "./AddNewLocation";

const Location = (props) => {
  ////////////////////////////////////////////////////////////////////////////////
  // STATES
  ////////////////////////////////////////////////////////////////////////////////
  // Shows pain location main page
  const [locationScreen, setLocationScreen] = useState({
    locationList: true,
    locationMenu: false,
    editLocation: false,
    addLocation: false,
    deleteLocation: false,
  });

  // Ued to passes location from locationMenu.js to EditLocation.js
  const [painLocationToEdit, setPainLocationToEdit] = useState();

  // List of all body locations
  const [listPainLocations, setListPainLocations] = useState([]);

  // This state is used to re-render the page after selectedLocationHandler
  const [forceUpdate, setForceUpdate] = useState(0);

  ////////////////////////////////////////////////////////////////////////////////
  // NAVIGATION FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////
  // Swaps between location main page and Add location menu
  const toLocationMenuHandler = () => {
    setLocationScreen({
      locationList: false,
      locationMenu: true,
      editLocation: false,
      addLocation: false,
      deleteLocation: false,
    });
  };

  // Swaps between location Menu and location main page
  const toLocationListHandler = () => {
    setLocationScreen((prevState) => {
      return { ...prevState, locationList: true, locationMenu: false };
    });
  };

  // Swaps between location Menu and Edit location
  const toLocationEditHandler = (locationToEdit) => {
    setPainLocationToEdit(locationToEdit);
    setLocationScreen((prevState) => {
      return { ...prevState, locationMenu: false, editLocation: true };
    });
  };

  // Swaps between location Menu to add New Location
  const toAddNewLocationHandler = (locationToEdit) => {
    setLocationScreen((prevState) => {
      return { ...prevState, locationMenu: false, addLocation: true };
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  // HTTP REQUESTS
  ////////////////////////////////////////////////////////////////////////////////
  // PUT request to updates the 'selected' field of locations in Firebase
  const selectedLocationHandler = (selectedLocation) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-locations/${selectedLocation.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(selectedLocation),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setForceUpdate(forceUpdate + 1);
  };

  // PUT request to updates the 'locationName' field of locations in Firebase
  const editLocationNameHandler = (locationToEdit) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-locations/${locationToEdit.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(locationToEdit),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  // POST new pain location to firebase
  function addNewLocationHandler(locationToAdd) {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-locations.json`,
      {
        method: "POST",
        body: JSON.stringify(locationToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      getLocationList();
    });
  }

  // DELETE request to delete a pain locations in Firebase
  const locationToDeleteHandler = (locationToDelete) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-locations/${locationToDelete.fireBaseId}.json`,
      { method: "DELETE" }
    ).then((response) => {
      getLocationList();
    });
  };

  // GET request to Firebase for pain location list and updates state with it.
  const getLocationList = () => {
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
        setListPainLocations(listLocations);
      });
  };

  // GET request for the list of locations when Page loads for the first time.
  useEffect(() => {
    getLocationList();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////
  // RETURN
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {locationScreen.locationList && (
        <LocationList
          listPainLocations={listPainLocations}
          getPainLocation={props.getPainLocation}
          toLocationMenu={toLocationMenuHandler}
        />
      )}
      {locationScreen.locationMenu && (
        <Grid>
          <LocationMenu
            toLocationList={toLocationListHandler}
            listPainLocations={listPainLocations}
            getSelectedLocation={selectedLocationHandler}
            swaptoLocationEdit={toLocationEditHandler}
            swapToAddNewLocation={toAddNewLocationHandler}
            getLocationToDelete={locationToDeleteHandler}
          />
        </Grid>
      )}
      {locationScreen.editLocation && (
        <EditLocation
          toLocationMenu={toLocationMenuHandler}
          editLocationName={editLocationNameHandler}
          painLocationToEdit={painLocationToEdit}
        />
      )}
      {locationScreen.addLocation && (
        <AddNewLocation
          toLocationMenu={toLocationMenuHandler}
          addNewLocation={addNewLocationHandler}
        />
      )}
    </>
  );
};

export default Location;
