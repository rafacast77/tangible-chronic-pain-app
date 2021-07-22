import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Card from "../ui/Card";
import Grid from "@material-ui/core/Grid";

const MINOR_PAIN =
  "Nagging, annoying, but doesn't interfere with most daily living activities. Patient able to adapt to pain psychologically and with medication or devices such as cushions.";
const MODERATE_PAIN =
  "Interferes significantly with daily living activities. Requires lifestyle changes but patient remains independant. Patient unable to adapt pain.";
const SEVERE_PAIN =
  "Disabling; Unable to perform daily living activities.\n Unable to engage in normal activities Patient is disable and unable to function independently";

let currentPainLevel = { value: 0, painIntensity: "Pain Free" };

const PainScale = (props) => {
  const marks = [
    {
      value: 0,
      label: 0,
      painIntensity: "Pain Free",
      description: "Feeling perfectly normal.",
    },
    {
      value: 1,
      label: 1,
      painIntensity: "Very Mid",
      description: MINOR_PAIN,
    },
    {
      value: 2,
      label: 2,
      painIntensity: "Discomforting",
      description: MINOR_PAIN,
    },
    {
      value: 3,
      label: 3,
      painIntensity: "Tolerable",
      description: MINOR_PAIN,
    },
    {
      value: 4,
      label: 4,
      painIntensity: "Distressing",
      description: MODERATE_PAIN,
    },
    {
      value: 5,
      label: 5,
      painIntensity: "Very Distressing",
      description: MODERATE_PAIN,
    },
    {
      value: 6,
      label: 6,
      painIntensity: "Intense",
      description: MODERATE_PAIN,
    },
    {
      value: 7,
      label: 7,
      painIntensity: "Very Intense",
      description: SEVERE_PAIN,
    },
    {
      value: 8,
      label: 8,
      painIntensity: "Utterly Horrible",
      description: SEVERE_PAIN,
    },
    {
      value: 9,
      label: 9,
      painIntensity: "Excruciating Unbearable",
      description: SEVERE_PAIN,
    },
    {
      value: 10,
      label: 10,
      painIntensity: "Unimaginable Unspeakable",
      description: SEVERE_PAIN,
    },
  ];

  const [currentPain, setCurrentPain] = useState(marks[5].painIntensity);
  const [painDescription, setPainDescription] = useState(marks[5].description);

  const valuetext = (value) => {
    if (currentPainLevel.value === value) {
      return;
    } else {
      currentPainLevel.value = value;
      currentPainLevel.painIntensity = marks[value].painIntensity;
      setCurrentPain(marks[value].painIntensity);
      setPainDescription(marks[value].description);
    }
    props.getPainScaleValue(currentPainLevel.value);
  };

  return (
    <Card>
      <Grid container direction="column" alignItems="center"></Grid>
      <h1>Pain Scale</h1>
      <h4>Indicate your current pain level</h4>
      <p>
        1 being the bite of a butterfly <br />
        10 being the bite of a hippopotamus
      </p>

      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="pain-scale"
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={10}
        marks={marks}
      />

      <h2>{currentPain}</h2>
      <p style={{ height: "50px" }}>{painDescription}</p>
    </Card>
  );
};

export default React.memo(PainScale);
