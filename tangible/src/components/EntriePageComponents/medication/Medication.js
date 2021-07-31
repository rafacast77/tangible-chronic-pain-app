import React, { useState, useEffect } from "react";
import MedicationList from "./MedicationList";
import { Button } from "@material-ui/core";
import Card from "../../ui/Card";
import MedicationMenu from "./MedicationMenu";
import Grid from "@material-ui/core/Grid";
import EditMedication from "./EditMedication";
import AddNewMedication from "./AddNewMedication";
import CircularProgress from "@material-ui/core/CircularProgress";

const Medication = (props) => {
  ////////////////////////////////////////////////////////////////////////////////
  // STATES
  ////////////////////////////////////////////////////////////////////////////////
  // Shows  medication main page
  const [medicationScreen, setMedicationScreen] = useState({
    medicationList: true,
    medicationMenu: false,
    editMedication: false,
    addMedication: false,
    deleteMedication: false,
  });

  // boolean for the loading component
  const [isloading, setIsloading] = useState(true);

  // Ued to passes medication from medicationMenu.js to EditMedication.js
  const [medicationToEdit, setMedicationToEdit] = useState();

  // List of all body medications
  const [listMedications, setListMedications] = useState([]);

  // This state is used to re-render the page after selectedMedicationHandler
  const [forceUpdate, setForceUpdate] = useState(0);

  ////////////////////////////////////////////////////////////////////////////////
  // NAVIGATION FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////
  // Swaps between medication main page and Add medication menu
  const toMedicationMenuHandler = () => {
    setMedicationScreen({
      medicationList: false,
      medicationMenu: true,
      editMedication: false,
      addMedication: false,
      deleteMedication: false,
    });
  };

  // Swaps between medication Menu and medication main page
  const toMedicationListHandler = () => {
    setMedicationScreen((prevState) => {
      return { ...prevState, medicationList: true, medicationMenu: false };
    });
  };

  // Swaps between medication Menu and Edit medication
  const toMedicationEditHandler = (medicationToEdit) => {
    setMedicationToEdit(medicationToEdit);
    setMedicationScreen((prevState) => {
      return { ...prevState, medicationMenu: false, editMedication: true };
    });
  };

  // Swaps between medication Menu to add New Medication
  const toAddNewMedicationHandler = (medicationToEdit) => {
    setMedicationScreen((prevState) => {
      return { ...prevState, medicationMenu: false, addMedication: true };
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  // HTTP REQUESTS
  ////////////////////////////////////////////////////////////////////////////////
  // PUT request to updates the 'selected' field of medications in Firebase
  const selectedMedicationHandler = (selectedMedication) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/medications/${selectedMedication.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(selectedMedication),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setForceUpdate(forceUpdate + 1);
  };

  // PUT request to updates the 'medicationName' field of medications in Firebase
  const editMedicationNameHandler = (medicationToEdit) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/medications/${medicationToEdit.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(medicationToEdit),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  // POST new  medication to firebase
  function addNewMedicationHandler(medicationToAdd) {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/medications.json`,
      {
        method: "POST",
        body: JSON.stringify(medicationToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      getMedicationList();
    });
  }

  // DELETE request to delete a  medications in Firebase
  const medicationToDeleteHandler = (medicationToDelete) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/medications/${medicationToDelete.fireBaseId}.json`,
      { method: "DELETE" }
    ).then((response) => {
      getMedicationList();
    });
  };

  // GET request to Firebase for  medication list and updates state with it.
  const getMedicationList = () => {
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/medications.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const listMedications = [];

        for (const key in data) {
          const medication = {
            fireBaseId: key,
            ...data[key],
          };
          listMedications.push(medication);
        }
        setListMedications(listMedications);
        setIsloading(false);
      });
  };

  // GET request for the list of medications when Page loads for the first time.
  useEffect(() => {
    getMedicationList();
  }, []);

  // Shows a loader while the Fetching
  if (isloading) {
    return <CircularProgress />;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // RETURN
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {medicationScreen.medicationList && (
        <>
          <Grid>
            <Grid>
              <MedicationList
                listMedications={listMedications}
                getMedication={props.getMedication}
              />
            </Grid>
            <Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={toMedicationMenuHandler}
                size={"large"}
              >
                ADD MEDICATIONS
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {medicationScreen.medicationMenu && (
        <>
          <MedicationMenu
            listMedications={listMedications}
            toMedicationList={toMedicationListHandler}
            getSelectedMedication={selectedMedicationHandler}
            swaptoMedicationEdit={toMedicationEditHandler}
            swapToAddNewMedication={toAddNewMedicationHandler}
            getMedicationToDelete={medicationToDeleteHandler}
          />
        </>
      )}
      {medicationScreen.editMedication && (
        <EditMedication
          toMedicationMenu={toMedicationMenuHandler}
          editMedicationName={editMedicationNameHandler}
          medicationToEdit={medicationToEdit}
        />
      )}
      {medicationScreen.addMedication && (
        <AddNewMedication
          toMedicationMenu={toMedicationMenuHandler}
          addNewMedication={addNewMedicationHandler}
        />
      )}
    </>
  );
};

export default Medication;
