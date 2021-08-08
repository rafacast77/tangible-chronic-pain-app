import React, { useState } from "react";

// This is the context used to judge if a user role and if is logged in.
const AuthContext = React.createContext({
  token: "",
  userUID: "",
  userEmail: "",
  userToSpectUID: "",
  isLoggedIn: false,
  isPainUser: null,
  login: (token) => {},
  logout: () => {},
  //userRole: (painUser) => {},
  getUserUID: (userID) => {},
  getIsPainUser: (painUser) => {},
  getUserToSpectUID: (userToSpectUID) => {},
  getUserEmail: (userEmail) => {},
});

// All components wrapped with this component will have access to the data in AuthContext
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialuserUID = localStorage.getItem("userUID");
  const initialuserToSpectUID = localStorage.getItem("userToSpectUID");
  const initialisPainUser = localStorage.getItem("isPainUser");
  const initialiuserEmail = localStorage.getItem("userEmail");

  const [token, setToken] = useState(initialToken);
  const [isPainUser, setIsPainUser] = useState(initialisPainUser === "true");
  const [userUID, setUserUID] = useState(initialuserUID);
  const [userToSpectUID, setUserToSpectUID] = useState(initialuserToSpectUID);
  const [userEmail, setuserEmail] = useState(initialiuserEmail);
  /**
   * token is an empty string or a string.
   * !! transforms it into a boolean
   * empty string = false, existing string = true
   */
  const userIsLoggedIn = !!token;

  // Checks if user is logged in
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // Checks if user is logged out
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("userUID");
    localStorage.removeItem("userToSpectUID");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    localStorage.removeItem("isPainUser");
  };

  // Checks user role
  const isPainUserHandler = (painUser) => {
    // When user sign up isPainUser is saved in firebase
    // When sign in again that variable is fetched here
    setIsPainUser(painUser);
    localStorage.setItem("isPainUser", painUser);
  };

  // Gets the user ID in order to get his related pain information
  const getUserUIDHandler = (userID) => {
    setUserUID(userID);
    localStorage.setItem("userUID", userID);
  };

  // Gets the user ID in order to get his related pain information
  const getUserEmailHandler = (usrEmail) => {
    setuserEmail(usrEmail);
    localStorage.setItem("userEmail", usrEmail);
  };

  // Gets the user ID in order to get his related pain information
  const getUserToSpectUIDHandler = (userToSpectID) => {
    setUserToSpectUID(userToSpectID);
    localStorage.setItem("userToSpectUID", userToSpectID);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isPainUser: isPainUser,
    userToSpectUID: userToSpectUID,
    userUID: userUID,
    userEmail: userEmail,
    login: loginHandler,
    logout: logoutHandler,
    //userRole: isPainUserHandler,
    getUserUID: getUserUIDHandler,
    getUserToSpectUID: getUserToSpectUIDHandler,
    getIsPainUser: isPainUserHandler,
    getUserEmail: getUserEmailHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
