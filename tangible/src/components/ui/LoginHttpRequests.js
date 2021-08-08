// On SignUp Saves User Role and Name
export const createUserAccountDatabase = (userData, userRole) => {
  return fetch(
    `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${userData.localId}/Account.json`,
    {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        name: userData.displayName,
        userRole: userRole,
        userToSpect: "",
        userInfoToSpect: {},
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
};

// On LogIn gets current user role and userToSpectUID
export const getUserAccountDatabase = (userUID) => {
  return fetch(
    `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${userUID}/Account.json`
  )
    .then((res) => {
      if (res.ok) {
        //SignInUp Success
        return res.json();
      } else {
        //SignInUp Fails
        return res.json().then((data) => {
          let errorMessage = "Authentication failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      const accountInfo = { isPainUser: null, userToSpect: "" };
      const key = Object.keys(data)[0];
      if (data[key].userToSpect !== "") {
        accountInfo.userToSpect = data[key].userToSpect;
      }
      if (data[key].userRole === "SPECTATOR") {
        accountInfo.isPainUser = false;
      } else if (data[key].userRole === "PAIN USER") {
        accountInfo.isPainUser = true;
      }
      return accountInfo;
      return data;
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Returns current account user data on login
export const getUserLoginData = (email, password) => {
  return fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCn_yqpancW5SEgxzlAVxtVNvj07bP4ftQ",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      if (res.ok) {
        //SignInUp Success
        return res.json();
      } else {
        //SignInUp Fails
        return res.json().then((data) => {
          let errorMessage = "Authentication failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }) //SignInUp Success
    .then((data) => {
      return data;
    }) //SignInUp Fails
    .catch((error) => {
      alert(error.message);
    });
};
/**
 * Creates new user with displayName and Returns
 * current account user data.
 */
export const createNewUser = (email, password, displayName, userRole) => {
  return fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCn_yqpancW5SEgxzlAVxtVNvj07bP4ftQ",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        displayName: displayName,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      if (res.ok) {
        //SignInUp Success
        return res.json();
      } else {
        //SignInUp Fails
        return res.json().then((data) => {
          let errorMessage = "Authentication failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }) //SignInUp Success
    .then((data) => {
      return data;
    }) //SignInUp Fails
    .catch((error) => {
      alert(error.message);
    });
};
