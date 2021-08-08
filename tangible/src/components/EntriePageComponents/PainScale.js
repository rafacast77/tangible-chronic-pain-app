import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { MARKS } from "./PainEntriesPainRangeText";

let currentPainLevel = { value: 0, painIntensity: "Pain Free" };

/**
 * This component allows the user to indicate the intensity of their pain
 * from 0 to 10.
 */
const useStyles = makeStyles((theme) => ({
  outerGrid: {
    padding: theme.spacing(5),
  },
  titleDescription: {
    marginBottom: theme.spacing(3),
  },
  innerGrid: {
    marginBottom: theme.spacing(1),
  },
  painDescription: {
    marginTop: theme.spacing(2),
  },
}));

const PainScale = (props) => {
  const classes = useStyles();
  const [currentPain, setCurrentPain] = useState(MARKS[0].painIntensity);
  const [painDescription, setPainDescription] = useState(MARKS[0].description);

  const valueText = (value) => {
    if (currentPainLevel.value === value) {
      return;
    } else {
      currentPainLevel.value = value;
      currentPainLevel.painIntensity = MARKS[value].painIntensity;
      setCurrentPain(MARKS[value].painIntensity);
      setPainDescription(MARKS[value].description);
    }
    props.getPainScaleValue(currentPainLevel.value);
  };

  return (
    <Grid container direction="column" className={classes.outerGrid}>
      <Grid className={classes.titleDescription}>
        <Grid className={classes.innerGrid}>
          <Typography variant="h5">Indicate your current pain level</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle1">
            0 being no pain at all 10 being the worst pain imaginable
          </Typography>
        </Grid>
      </Grid>

      <Slider
        defaultValue={0}
        getAriaValueText={valueText}
        aria-labelledby="pain-scale"
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={10}
        marks={MARKS}
      />
      <Typography
        variant="h4"
        align="center"
        className={classes.painDescription}
      >
        {currentPain}
      </Typography>
      <Typography variant="body1" className={classes.painDescription}>
        {painDescription}
      </Typography>
    </Grid>
  );
};

export default React.memo(PainScale);
