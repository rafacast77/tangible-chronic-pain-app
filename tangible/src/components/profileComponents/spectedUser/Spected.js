import React, { useState, useEffect, useContext } from "react";
import SpectedMenu from "./SpectedMenu";
import Grid from "@material-ui/core/Grid";
import AddNewSpected from "./AddNewSpected";
import OuterGrid from "../../ui/OuterGrid";
import AuthContext from "../../../store/Auth-context";

const Spected = (props) => {
  const authCtx = useContext(AuthContext);

  ////////////////////////////////////////////////////////////////////////////////
  // STATES
  ////////////////////////////////////////////////////////////////////////////////
  // Shows pain spected main page
  const [spectedScreen, setSpectedScreen] = useState({
    spectedMenu: true,
    addSpected: false,
    deleteSpected: false,
  });

  // List of all body specteds
  const [listPainSpecteds, setListPainSpecteds] = useState([]);

  // This state is used to re-render the page after selectedSpectedHandler
  const [forceUpdate, setForceUpdate] = useState(0);

  ////////////////////////////////////////////////////////////////////////////////
  // NAVIGATION FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////
  // Swaps between spected main page and Add spected menu
  const toSpectedMenuHandler = () => {
    setSpectedScreen({
      spectedMenu: true,
      addSpected: false,
      deleteSpected: false,
    });
  };

  // Swaps between spected Menu and spected main page
  const toSpectedListHandler = () => {
    setSpectedScreen((prevState) => {
      return { ...prevState, spectedList: true, spectedMenu: false };
    });
  };

  // Swaps between spected Menu to add New Spected
  const toAddNewSpectedHandler = (spectedToEdit) => {
    setSpectedScreen((prevState) => {
      return { ...prevState, spectedMenu: false, addSpected: true };
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  // HTTP REQUESTS
  ////////////////////////////////////////////////////////////////////////////////
  // PUT request to updates the 'selected' field of specteds in Firebase
  const selectedSpectedHandler = (selectedSpected) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/pain-specteds/${selectedSpected.fireBaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(selectedSpected),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setForceUpdate(forceUpdate + 1);
  };

  // POST new pain spected to firebase
  function addNewSpectedHandler(spectedToAdd) {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/.json`
    )
      .then((response) => response.json())
      .then((data) => {
        for (const key in data) {
          const SpectedEmailList =
            data[key].Account[Object.keys(data[key].Account)[0]];
          if (SpectedEmailList.email === spectedToAdd) {
            const spected = {
              spectedName: SpectedEmailList.name,
              spectedEmail: spectedToAdd,
              userID: key,
              AccountID: Object.keys(data[key].Account)[0],
            };
            fetch(
              `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/pain-specteds.json`,
              {
                method: "POST",
                body: JSON.stringify(spected),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            ).then((response) => {
              const painUserAccount = {
                email: authCtx.userEmail,
                painUserAccountId: authCtx.userUID,
              };
              fetch(
                `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${key}/Account/${
                  Object.keys(data[key].Account)[0]
                }/userInfoToSpect.json`,
                {
                  method: "PUT",
                  body: JSON.stringify(painUserAccount),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              ).then((res) => {
                getSpectedList();
              });
            });
          }
        }
      });
  }

  // DELETE request to delete a pain specteds in Firebase
  const spectedToDeleteHandler = (spectedToDelete) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/pain-specteds/.json`
    )
      .then((response) => response.json())
      .then((data) => {
        // Find Id of matching email
        const spectedInfo = data[Object.keys(data)[0]];
        fetch(
          `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${spectedInfo.userID}/Account/${spectedInfo.AccountID}/userToSpect.json`,
          {
            method: "PUT",
            body: JSON.stringify(""),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((resp) => {
          fetch(
            `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/pain-specteds.json`,
            { method: "DELETE" }
          ).then((res) => {
            getSpectedList();
          });
        });
      });
  };

  // GET request to Firebase for pain spected list and updates state with it.
  const getSpectedList = () => {
    // ${authCtx.userUID}/
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/pain-specteds.json`
    )
      .then((response) => response.json())
      .then((data) => {
        const listSpecteds = [];
        for (const key in data) {
          listSpecteds.push(data[key]);
        }
        setListPainSpecteds(listSpecteds);
      });
  };

  // GET request for the list of specteds when Page loads for the first time.
  useEffect(() => {
    getSpectedList();
  }, []);

  ////////////////////////////////////////////////////////////////////////////////
  // RETURN
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <OuterGrid>
      {spectedScreen.spectedMenu && (
        <Grid>
          <SpectedMenu
            getPainSpected={props.getPainSpected}
            listPainSpecteds={listPainSpecteds}
            swapToAddNewSpected={toAddNewSpectedHandler}
            getSpectedToDelete={spectedToDeleteHandler}
          />
        </Grid>
      )}

      {spectedScreen.addSpected && (
        <AddNewSpected
          toSpectedMenu={toSpectedMenuHandler}
          addNewSpected={addNewSpectedHandler}
        />
      )}
    </OuterGrid>
  );
};

export default Spected;
