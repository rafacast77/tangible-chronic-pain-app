import React from "react";
import Records from "../components/ProfilePageComponents/Records";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid>
        <Records />
      </Grid>
    </Container>
  );
};

export default Home;
