import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import Records from "../components/ProfilePageComponents/Records";

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
