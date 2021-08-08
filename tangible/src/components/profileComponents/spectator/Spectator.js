import React, { useState, useEffect, useContext } from "react";
import SpectatorMenu from "./SpectatorMenu";
import OuterGrid from "../../ui/OuterGrid";
import AuthContext from "../../../store/Auth-context";
import Card from "../../ui/Card";

const Spectator = (props) => {
  const authCtx = useContext(AuthContext);

  ////////////////////////////////////////////////////////////////////////////////
  // STATES
  ////////////////////////////////////////////////////////////////////////////////
  // Shows pain spectator main page
  const [spectatorScreen, setSpectatorScreen] = useState({
    spectatorMenu: true,
    addSpectator: false,
    deleteSpectator: false,
  });

  const [userToSpectate, setUserToSpectate] = useState({
    painUserAccountId: "",
    painUserEmail: "",
    request: false,
    requestAccepted: false,
  });

  // List of all body spectators
  const [listPainSpectators, setListPainSpectators] = useState([]);

  // This state is used to re-render the page after selectedSpectatorHandler
  const [forceUpdate, setForceUpdate] = useState(0);

  ////////////////////////////////////////////////////////////////////////////////
  // NAVIGATION FUNCTIONS
  ////////////////////////////////////////////////////////////////////////////////
  // Swaps between spectator main page and Add spectator menu
  const toSpectatorMenuHandler = () => {
    setSpectatorScreen({
      spectatorMenu: true,
      addSpectator: false,
      deleteSpectator: false,
    });
  };

  // Swaps between spectator Menu and spectator main page
  const toSpectatorListHandler = () => {
    setSpectatorScreen((prevState) => {
      return { ...prevState, spectatorList: true, spectatorMenu: false };
    });
  };

  // Swaps between spectator Menu to add New Spectator
  const toAddNewSpectatorHandler = (spectatorToEdit) => {
    setSpectatorScreen((prevState) => {
      return { ...prevState, spectatorMenu: false, addSpectator: true };
    });
  };

  ////////////////////////////////////////////////////////////////////////////////
  // HTTP REQUESTS
  ////////////////////////////////////////////////////////////////////////////////
  // PUT request to updates the 'selected' field of spectators in Firebase
  const deleteSpectedHandler = (selectedSpectator) => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/Account/.json`
    )
      .then((response) => response.json())
      .then((data) => {
        // Find Id of matching email
        const accountID = Object.keys(data)[0];
        fetch(
          `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/Account/${accountID}/userToSpect.json`,
          {
            method: "PUT",
            body: JSON.stringify(""),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {});
        authCtx.getUserToSpectUID("");
        setUserToSpectate({
          painUserAccountId: "",
          painUserEmail: "",
          request: false,
          requestAccepted: false,
        });
      });
  };

  // POST new pain spectator to firebase
  function addPainUserToBeSpectatedHandler() {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/Account/.json`
    )
      .then((response) => response.json())
      .then((data) => {
        // Find Id of matching email
        const accountID = Object.keys(data)[0];
        fetch(
          `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/Account/${accountID}/userToSpect.json`,
          {
            method: "PUT",
            body: JSON.stringify(userToSpectate.painUserAccountId),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {});
        authCtx.getUserToSpectUID(userToSpectate.painUserAccountId);
        declineUserToBeSpectedHandler();
      });
  }

  // DELETE request to delete a pain spectators in Firebase
  const declineUserToBeSpectedHandler = () => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/Account/.json`
    )
      .then((response) => response.json())
      .then((data) => {
        // Find Id of matching email
        const accountID = Object.keys(data)[0];
        fetch(
          `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/Account/${accountID}/userInfoToSpect.json`,
          {
            method: "DELETE",
          }
        ).then((resp) => {
          getSpectatorList();
        });
      });
  };

  // GET request to Firebase for pain spectator list and updates state with it.
  const getSpectatorList = () => {
    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${authCtx.userUID}/Account.json`
    )
      .then((response) => response.json())
      .then((data) => {
        const spectatorInfo = data[Object.keys(data)[0]];
        if (spectatorInfo.userInfoToSpect) {
          // Here we want to change a state that will render user request.
          setUserToSpectate({
            ...spectatorInfo.userInfoToSpect,
            request: true,
          });
        } else if (spectatorInfo.userToSpect !== "") {
          fetch(
            `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${spectatorInfo.userToSpect}/Account.json`
          )
            .then((response) => response.json())
            .then((data) => {
              setUserToSpectate({
                ...data[Object.keys(data)[0]],
                requestAccepted: true,
              });
            });
        } else {
          setUserToSpectate({
            painUserAccountId: "",
            painUserEmail: "",
            request: false,
            requestAccepted: false,
          });
        }
        //setListPainSpectators(listSpectators);
      });
  };

  props.showBadge(userToSpectate.request);

  // GET request for the list of spectators when Page loads for the first time.
  useEffect(() => {
    getSpectatorList();
  }, []);

  ////////////////////////////////////////////////////////////////////////////////
  // RETURN
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <OuterGrid>
      {userToSpectate.request && (
        <SpectatorMenu
          userToSpectate={userToSpectate}
          deleteSpected={deleteSpectedHandler}
          addPainUserToBeSpectated={addPainUserToBeSpectatedHandler}
          declineUserToBeSpected={declineUserToBeSpectedHandler}
        />
      )}
      {userToSpectate.requestAccepted && (
        <SpectatorMenu
          userToSpectate={userToSpectate}
          deleteSpected={deleteSpectedHandler}
          addPainUserToBeSpectated={addPainUserToBeSpectatedHandler}
          declineUserToBeSpected={declineUserToBeSpectedHandler}
        />
      )}
    </OuterGrid>
  );
};

export default Spectator;
