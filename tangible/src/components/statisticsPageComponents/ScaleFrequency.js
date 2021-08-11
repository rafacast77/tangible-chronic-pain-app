import Card from "../ui/Card";
import styles from "./ScaleFrequency.module.css";
import Typography from "@material-ui/core/Typography";

import { useState } from "react";

const ScaleFrequency = (props) => {
  let scaleFrequency = {
    none: 0,
    minor: 0,
    moderate: 0,
    severe: 0,
    unimaginable: 0,
  };

  props.listOfPainEntries.listOfEntries.forEach((painEntry) => {
    if (painEntry.painScale === 0) {
      scaleFrequency.none++;
    } else if (
      painEntry.painScale === 1 ||
      painEntry.painScale === 2 ||
      painEntry.painScale === 3
    ) {
      scaleFrequency.minor++;
    } else if (
      painEntry.painScale === 4 ||
      painEntry.painScale === 5 ||
      painEntry.painScale === 6
    ) {
      scaleFrequency.moderate++;
    } else if (
      painEntry.painScale === 7 ||
      painEntry.painScale === 8 ||
      painEntry.painScale === 9
    ) {
      scaleFrequency.severe++;
    } else if (painEntry.painScale === 10) {
      scaleFrequency.unimaginable++;
    }
  });

  const [currentScale] = useState(scaleFrequency);

  console.log();

  return (
    <Card newStyle={{ padding: "4.5rem", marginTop: "4rem" }}>
      <Typography variant="h4">Pain Intensity - Scale Frequency</Typography>
      <Typography variant="body1">
        Total pain records:{" "}
        {props.listOfPainEntries.listOfEntries[0].date
          ? props.listOfPainEntries.listOfEntries.length
          : "0"}
      </Typography>

      <div className={styles["pain-records-container"]}>
        <div className={`${styles.none} scale-container`}>
          {currentScale.none}
        </div>
        <div className={`${styles.minor} scale-container`}>
          {currentScale.minor}
        </div>
        <div className={`${styles.moderate} scale-container`}>
          {currentScale.moderate}
        </div>
        <div className={`${styles.severe} scale-container`}>
          {currentScale.severe}
        </div>
        <div className={`${styles.unimaginable} scale-container`}>
          {currentScale.unimaginable}
        </div>
      </div>
    </Card>
  );
};

export default ScaleFrequency;
