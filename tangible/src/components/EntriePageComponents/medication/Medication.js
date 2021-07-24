import React, { useState, useEffect } from "react";
import MedicationList from "./MedicationList";
import { Button } from "@material-ui/core";
import Card from "../../ui/Card";
import MedicationMenu from "./MedicationMenu";
import Grid from "@material-ui/core/Grid";
import EditMedication from "./EditMedication";
import AddNewMedication from "./AddNewMedication";

const Medication = (props) => {
  //------------------------------STATES------------------------------//
  // Shows  medication main page
  const [medicationScreen, setMedicationScreen] = useState({
    medicationList: true,
    medicationMenu: false,
    editMedication: false,
    addMedication: false,
    deleteMedication: false,
  });

  // Ued to passes medication from medicationMenu.js to EditMedication.js
  const [medicationToEdit, setMedicationToEdit] = useState();

  // List of all body medications
  const [listMedications, setListMedications] = useState([]);

  // This state is used to re-render the page after selectedMedicationHandler
  const [forceUpdate, setForceUpdate] = useState(0);

  //------------------------------NAVIGATION FUNCTIONS------------------------------//
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

  //------------------------------HTTP REQUESTS------------------------------//
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
    console.log(medicationToDelete.fireBaseId);
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
      });
  };

  // GET request for the list of medications when Page loads for the first time.
  useEffect(() => {
    getMedicationList();
  }, []);

  //------------------------------RETURN------------------------------//
  return (
    <Card>
      <Grid container direction="column" alignItems="center">
        {medicationScreen.medicationList && (
          <>
            <MedicationList
              listMedications={listMedications}
              getMedication={props.getMedication}
            />
            <Button variant="contained" onClick={toMedicationMenuHandler}>
              ADD LOCATIONS
            </Button>
          </>
        )}
        {medicationScreen.medicationMenu && (
          <>
            <Button variant="contained" onClick={toMedicationListHandler}>
              Back
            </Button>
            <MedicationMenu
              listMedications={listMedications}
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
      </Grid>
    </Card>
  );
};

export default Medication;
