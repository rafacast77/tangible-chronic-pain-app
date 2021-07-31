import React, { useState, useEffect } from "react";
import TreatmentList from "./TreatmentList";
import { Button } from "@material-ui/core";
import Card from "../../ui/Card";
import TreatmentMenu from "./TreatmentMenu";
import Grid from "@material-ui/core/Grid";
import EditTreatment from "./EditTreatment";
import AddNewTreatment from "./AddNewTreatment";

const Treatment = (props) => {
  ////////////////////////////////////////////////////////////////////////////////
  // STATES
  ////////////////////////////////////////////////////////////////////////////////
  // Shows  treatment main page
  const [treatmentScreen, setTreatmentScreen] = useState({
    treatmentList: true,
    treatmentMenu: false,
    editTreatment: false,
    addTreatment: false,
    deleteTreatment: false,
  });

  // Ued to passes treatment from treatmentMenu.js to EditTreatment.js
  const [treatmentToEdit, setTreatmentToEdit] = useState();

  // List of all body treatments
  const [listTreatments, setListTreatments] = useState([]);

  // This state is used to re-render the page after selectedTreatmentHandler
  const [forceUpdate, setForceUpdate] = useState(0);

  ////////////////////////////////////////////////////////////////////////////////
  // NAVIGATION FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////
  // Swaps between treatment main page and Add treatment menu
  const toTreatmentMenuHandler = () => {
    setTreatmentScreen({
      treatmentList: false,
      treatmentMenu: true,
      editTreatment: false,
      addTreatment: false,
      deleteTreatment: false,
    });
  };

  // Swaps between treatment Menu and treatment main page
  const toTreatmentListHandler = () => {
    setTreatmentScreen((prevState) => {
      return { ...prevState, treatmentList: true, treatmentMenu: false };
    });
  };

  // Swaps between treatment Menu and Edit treatment
  const toTreatmentEditHandler = (treatmentToEdit) => {
    setTreatmentToEdit(treatmentToEdit);
    setTreatmentScreen((prevState) => {
      return { ...prevState, treatmentMenu: false, editTreatment: true };
    });
  };

  // Swaps between treatment Menu to add New Treatment
  const toAddNewTreatmentHandler = (treatmentToEdit) => {
    setTreatmentScreen((prevState) => {
      return { ...prevState, treatmentMenu: false, addTreatment: true };
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  // HTTP REQUESTS
  ////////////////////////////////////////////////////////////////////////////////
  // PUT request to updates the 'selected' field of treatments in Firebase
  const selectedTreatmentHandler = (selectedTreatment) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/treatments/${selectedTreatment.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(selectedTreatment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setForceUpdate(forceUpdate + 1);
  };

  // PUT request to updates the 'treatmentName' field of treatments in Firebase
  const editTreatmentNameHandler = (treatmentToEdit) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/treatments/${treatmentToEdit.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(treatmentToEdit),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  // POST new  treatment to firebase
  function addNewTreatmentHandler(treatmentToAdd) {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/treatments.json`,
      {
        method: "POST",
        body: JSON.stringify(treatmentToAdd),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      getTreatmentList();
    });
  }

  // DELETE request to delete a  treatments in Firebase
  const treatmentToDeleteHandler = (treatmentToDelete) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/treatments/${treatmentToDelete.fireBaseId}.json`,
      { method: "DELETE" }
    ).then((response) => {
      getTreatmentList();
    });
  };

  // GET request to Firebase for  treatment list and updates state with it.
  const getTreatmentList = () => {
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/treatments.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const listTreatments = [];

        for (const key in data) {
          const treatment = {
            fireBaseId: key,
            ...data[key],
          };
          listTreatments.push(treatment);
        }
        setListTreatments(listTreatments);
      });
  };

  // GET request for the list of treatments when Page loads for the first time.
  useEffect(() => {
    getTreatmentList();
  }, []);
  ///////////////////////////////////////////////////////////////////////////////
  // RETURN
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <>
      {treatmentScreen.treatmentList && (
        <>
          <TreatmentList
            listTreatments={listTreatments}
            getTreatment={props.getTreatment}
            submitMedication={props.submitMedication}
            toTreatmentMenu={toTreatmentMenuHandler}
          />
        </>
      )}
      {treatmentScreen.treatmentMenu && (
        <>
          <TreatmentMenu
            listTreatments={listTreatments}
            getSelectedTreatment={selectedTreatmentHandler}
            toTreatmentList={toTreatmentListHandler}
            swaptoTreatmentEdit={toTreatmentEditHandler}
            swapToAddNewTreatment={toAddNewTreatmentHandler}
            getTreatmentToDelete={treatmentToDeleteHandler}
          />
        </>
      )}
      {treatmentScreen.editTreatment && (
        <EditTreatment
          toTreatmentMenu={toTreatmentMenuHandler}
          editTreatmentName={editTreatmentNameHandler}
          treatmentToEdit={treatmentToEdit}
        />
      )}
      {treatmentScreen.addTreatment && (
        <AddNewTreatment
          toTreatmentMenu={toTreatmentMenuHandler}
          addNewTreatment={addNewTreatmentHandler}
        />
      )}
    </>
  );
};

export default Treatment;
