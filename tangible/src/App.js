import { Route, Switch } from "react-router-dom";
import Records from "./pages/Records";
import PainEntries from "./pages/PainEntries";
import Profile from "./pages/Profile";
import Stats from "./pages/Stats";
import Layout from "./components/layout/Layout";
import "@fontsource/roboto";

function App() {
  return (
    <Layout>
      <Switch fallback={<p>Loading...</p>}>
        <Route path="/" exact>
          <Records />
        </Route>

        <Route path="/pain-entries">
          <PainEntries />
        </Route>

        <Route path="/stats">
          <Stats />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
