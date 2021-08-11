import { Route, Switch, Redirect } from "react-router-dom";
import Records from "./pages/Records";
import PainEntries from "./pages/PainEntries";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import NavBar from "./components/layout/NavBar";
import Home from "./pages/Home";
import "@fontsource/roboto";
import { MuiThemeProvider, createTheme } from "@material-ui/core";
import AuthContext from "./store/Auth-context";
import { useContext } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#FF9248",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    body1: {
      fontSize: 19,
    },
    subtitle1: {
      color: "#888",
    },
  },
});
function App() {
  const authCtx = useContext(AuthContext);
  const renderEntryScreen = () => {
    if (authCtx.isLoggedIn) {
      if (authCtx.isPainUser) {
        console.log(`authCtx.isPainUser`, authCtx.isPainUser);
        return (
          <Route path="/pain-entries" exact component={PainEntries}>
            <PainEntries />
          </Route>
        );
      }
    }
  };
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <Switch fallback={<p>Loading...</p>}>
        {!authCtx.isLoggedIn && <Route path="/" exact component={Home}></Route>}

        {authCtx.isLoggedIn && (
          <Route path="/records" exact component={Records}>
            <Records />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/stats" exact component={Stats}>
            <Stats />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/profile" exact component={Profile}>
            <Profile />
          </Route>
        )}
        {!authCtx.isPainUser && (
          <Route path="/pain-entries">
            <Redirect to="/stats" />
          </Route>
        )}
        {renderEntryScreen()}
        {authCtx.isLoggedIn && (
          <Route path="*">
            <Redirect to="/stats" />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
