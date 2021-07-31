import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "../ui/Card";
import "react-calendar/dist/Calendar.css";

const useStyles = makeStyles((theme) => ({
  outerGrid: {
    padding: theme.spacing(5),
  },
  timeGrid: {
    marginTop: theme.spacing(4),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: "1rem 0",
    width: 340,
  },
  calendar: {
    height: "300px",
    width: "550px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
}));

/**
 * This component allows the user to choose the date and the time
 * when the pain episode occurred. The component is initialized
 * with the current date and time.
 */
const DatesPicker = (props) => {
  const currentTime = new Date().toLocaleTimeString().substr(0, 5);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(`${currentTime}`);
  const [dateTime, setDateTime] = useState({ date, time });

  const dateChangeHandler = (e) => {
    const offsetDate = new Date(e.getTime() - e.getTimezoneOffset() * 60000);
    setDate(offsetDate);
    setDateTime((prevState) => {
      return { ...prevState, date: offsetDate };
    });
  };

  const timeChangeHandler = (event) => {
    setTime(event.target.value);
    setDateTime((prevState) => {
      return { ...prevState, time: event.target.value };
    });
  };

  const classes = useStyles();

  useEffect(() => {
    props.getDateTime(dateTime);
  }, [props, dateTime]);

  return (
    <>
      <Grid className={classes.outerGrid}>
        <Grid>
          <Calendar
            utcOffset={0}
            className={classes.calendar}
            onChange={dateChangeHandler}
            value={date}
            minDate={new Date("1 Jan 2019")}
          />
        </Grid>
        <Grid className={classes.timeGrid}>
          <TextField
            id="time"
            label="Time of the pain"
            type="time"
            defaultValue={`${currentTime}`}
            className={classes.textField}
            onChange={timeChangeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(DatesPicker);
