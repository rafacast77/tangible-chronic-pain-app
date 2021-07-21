import React, { useState } from "react";
import Calendar from "react-calendar";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Card from "../ui/Card";
import "react-calendar/dist/Calendar.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: "1rem 0",
    width: 340,
  },
}));

const DatesPicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("7:30");
  const [dateTime, setDateTime] = useState({ date, time });

  const currentTime = new Date().toLocaleTimeString().substr(0, 5);

  const dateChangeHandler = (e) => {
    setDate(e);
    setDateTime((prevState) => {
      return { ...prevState, date: e };
    });
  };

  const timeChangeHandler = (event) => {
    setTime(event.target.value);
    setDateTime((prevState) => {
      return { ...prevState, time: event.target.value };
    });
  };

  const classes = useStyles();

  props.getDateTime(dateTime);

  return (
    <Card>
      <h1>Hello Conor Mcgregor! </h1>
      <p>Which part of your leg hurts today?</p>
      <Calendar onChange={dateChangeHandler} value={date} />

      <TextField
        id="time"
        label="Alarm clock"
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
    </Card>
  );
};

export default React.memo(DatesPicker);
