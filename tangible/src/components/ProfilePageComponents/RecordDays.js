import { Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const RecordDays = ({ monthEntries }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    console.log(monthEntries);

    let monthDays = [];
    let whatsThis = [];
    let daysOftheWeek = [];

    const monthEntries2 = monthEntries.map((el) => {
      return { ...el, dayOfWeek: days[new Date(el.date.date).getDay()] };
      //monthDays.push(new Date(el.date.date).getDay());
      // sortedMonthDays = monthDays.sort((a, b) => {
      //   return a - b;
      // });

      daysOftheWeek.push(days[+new Date(el.date.date).getDay()]);

      // monthDays = [days[];
      // monthDays = sortedMonthDays;

      // whatsThis = new Date(el.date.date).toLocaleDateString("en-GB", {
      //   day: "numeric",
      // });

      days.push(whatsThis);
    });

    console.log("monthEntries2", monthEntries2);

    // setEntries();
  }, [monthEntries]);

  return <Typography variant="h5">Month has entries</Typography>;
};

export default RecordDays;
