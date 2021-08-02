import { Route, Switch } from "react-router-dom";
import Records from "./pages/Records";
import PainEntries from "./pages/PainEntries";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Layout from "./components/layout/Layout";
import NavBar from "./components/layout/NavBar";
import Signin from "./pages/Signin";
import "@fontsource/roboto";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    body1: {
      fontSize: 19,
    },
  },
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <Switch fallback={<p>Loading...</p>}>
        <Route path="/" exact component={Signin}></Route>

        <Route path="/records" exact component={Records}>
          <Records />
        </Route>

        <Route path="/pain-entries" exact component={PainEntries}>
          <PainEntries />
        </Route>

        <Route path="/stats" exact component={Stats}>
          <Stats />
        </Route>

        <Route path="/profile" exact component={Profile}>
          <Profile />
        </Route>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
