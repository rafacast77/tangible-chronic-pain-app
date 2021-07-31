import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Card from "../ui/Card";
import Grid from "@material-ui/core/Grid";
import { MARKS } from "./PainEntriesPainRangeText";

let currentPainLevel = { value: 0, painIntensity: "Pain Free" };

/**
 * This component allows the user to indicate the intensity of their pain
 * from 0 to 10.
 */
const PainScale = (props) => {
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
    <>
      <Grid container direction="column" alignItems="center"></Grid>
      <h1>Pain Scale</h1>
      <h4>Indicate your current pain level</h4>
      <p>
        1 being the bite of a butterfly <br />
        10 being the bite of a hippopotamus
      </p>

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

      <h2>{currentPain}</h2>
      <p style={{ height: "50px" }}>{painDescription}</p>
    </>
  );
};

export default React.memo(PainScale);
