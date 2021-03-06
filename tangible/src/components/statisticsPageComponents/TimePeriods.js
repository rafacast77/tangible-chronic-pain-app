import Card from "../ui/Card";
import { useState } from "react";
import styles from "./TimePeriods.module.css";
import Typography from "@material-ui/core/Typography";

const calculateAverage = (arr) => {
  if (arr.length === 0) {
    return 0;
  }

  let morningTotal = 0;
  for (let i = 0; i < arr.length; i++) {
    morningTotal += arr[i];
  }
  let morningAverage = (morningTotal / arr.length).toFixed(2);

  return morningAverage;
};

const TimePeriods = (props) => {
  const timePeriods = {
    earlyMorning: [],
    morning: [],
    afternoon: [],
    evening: [],
  };

  const getTimeFromHours = (time) => {
    time = time.split(":");
    let now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      ...time
    ).getHours();
  };

  props.listOfPainEntries.listOfEntries.forEach((entry) => {
    if (entry.date) {
      const curHr = getTimeFromHours(entry.date.time);

      if (curHr < 6) {
        timePeriods.earlyMorning.push(entry.painScale);
      } else if (curHr < 12) {
        timePeriods.morning.push(entry.painScale);
      } else if (curHr < 18) {
        timePeriods.afternoon.push(entry.painScale);
      } else {
        timePeriods.evening.push(entry.painScale);
      }
    }
  });

  const [currentTimePeriods] = useState(timePeriods);

  return (
    <Card newStyle={{ padding: "4.5rem" }}>
      <Typography variant="h4">Pain Intensity - Time Periods</Typography>

      <div className={styles["time-periods-container"]}>
        <div className={styles["time-container"]}>
          <h4>Occurrences:</h4>
          <p>{currentTimePeriods.earlyMorning.length}</p>
          <h4>Average: </h4>
          <p>{calculateAverage(currentTimePeriods.earlyMorning)}</p>
          <h4>00:00 - 06:00</h4>
          <p>Early Morning</p>
        </div>
        <div className={styles["time-container"]}>
          <h4>Occurrences:</h4>
          <p>{currentTimePeriods.morning.length}</p>
          <h4>Average: </h4>
          <p>{calculateAverage(currentTimePeriods.morning)}</p>

          <h4>06:00 - 12:00</h4>
          <p>Morning</p>
        </div>
        <div className={styles["time-container"]}>
          <h4>Occurrences:</h4>
          <p>{currentTimePeriods.afternoon.length}</p>
          <h4>Average: </h4>
          <p>{calculateAverage(currentTimePeriods.afternoon)}</p>

          <h4>12:00 - 18:00</h4>
          <p>Afternoon</p>
        </div>
        <div className={styles["time-container"]}>
          <h4>Occurrences:</h4>
          <p>{currentTimePeriods.evening.length}</p>
          <h4>Average: </h4>
          <p>{calculateAverage(currentTimePeriods.evening)}</p>
          <h4>18:00 - 00:00</h4>
          <p>Evening</p>
        </div>
      </div>
    </Card>
  );
};

export default TimePeriods;
