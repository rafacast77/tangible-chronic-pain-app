import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RecordEntry from "./RecordEntry";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const useStyles = makeStyles((theme) => ({
  day: {
    color: "#666",
    margin: "auto",
    marginBottom: "3rem",
    width: 500,
    textAlign: "center",
    borderBottom: "2px solid #666",
    lineHeight: "0.1em",

    "&:first-child": {
      marginTop: "1.8rem",
    },
    "& span": {
      color: "#666",
      margin: "auto",
      background: "#fff",
      padding: "0 10px",
    },
  },
}));

const dateToWeekday = (date) => {
  return days[new Date(date).getDay()] + " " + new Date(date).getDate();
};

const RecordDays = ({ currentDay, entries }) => {
  const classes = useStyles({});

  return (
    <>
      <Typography className={classes.day} variant="h5">
        <span> {dateToWeekday(currentDay)}</span>
      </Typography>

      {entries.map((e) => {
        return <RecordEntry entry={e} />;
      })}
    </>
  );
};

export default RecordDays;
