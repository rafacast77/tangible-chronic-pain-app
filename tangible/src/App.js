import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PainEntries from "./pages/PainEntries";
import Profile from "./pages/profile";
import Stats from "./pages/Stats";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
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
