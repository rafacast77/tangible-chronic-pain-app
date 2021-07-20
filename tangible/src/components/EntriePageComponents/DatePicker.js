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
    width: 200,
  },
}));

const DatesPicker = () => {
  const [value, onChange] = useState(new Date());

  const changeHandler = (e) => {
    console.log(e);
  };

  const classes = useStyles();

  return (
    <Card>
      <h1>Hello Conor Mcgregor! </h1>
      <p>Which part of your leg hurts today?</p>
      <Calendar onChange={changeHandler} value={value} isOpen={true} />
      <TextField
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
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

export default DatesPicker;
