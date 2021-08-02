import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import Card from "../../components/ui/Card";
import RecordEntry from "./RecordEntry";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChevronLeftTwoToneIcon from "@material-ui/icons/ChevronLeftTwoTone";
import ChevronRightTwoToneIcon from "@material-ui/icons/ChevronRightTwoTone";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  swapBar: {
    marginLeft: theme.spacing(4.2),
    marginRight: theme.spacing(4.2),
  },
}));

// This function formats a date to "DD Month YYYY"
const formatDate = (element) => {
  return new Date(element).toLocaleDateString("en-gb", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// This function takes in a date and returns its next calendar day
const getNextDay = (currentDay, add = true) => {
  const date = new Date(currentDay);
  add ? date.setDate(date.getDate() + 1) : date.setDate(date.getDate() - 1);
  return formatDate(date);
};

// This function takes in a date and returns its next calendar month
const getNextMonth = (currentMonth, add = true) => {
  let date = new Date(currentMonth);
  date = add
    ? new Date(date.getFullYear(), date.getMonth() + 1, 1).toLocaleDateString(
        "en-GB",
        {
          month: "long",
          year: "numeric",
        }
      )
    : new Date(date.getFullYear(), date.getMonth() - 1, 1).toLocaleDateString(
        "en-GB",
        {
          month: "long",
          year: "numeric",
        }
      );
  return date;
};

// Current day and month formatted to "Month YYYY"
const currentFormattedMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
});

let sortedDates = [];
let millisecondDates = [];

const Records = () => {
  const classes = useStyles();
  let currentPainEntries = useMemo(() => [], []);

  // State management
  const [isloading, setIsloading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(currentFormattedMonth);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [monthHasEntries, setMonthHasEntries] = useState(false);

  // GET request for the list of dates
  useEffect(() => {
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-entries.json"
    )
      .then((response) => response.json())
      .then((data) => {
        for (const el in data) {
          // Convert fetched dates to ms for easier sort
          millisecondDates.push(Date.parse(new Date(data[el].date.date)));
        }

        // Sort ms dates array
        millisecondDates.sort(function (a, b) {
          return a - b;
        });

        // Push array of converted ms dates to new array
        millisecondDates.forEach((element) => {
          sortedDates.push(formatDate(element));
        });

        // Verify whether a month contains any entries
        const regex = new RegExp(`${currentMonth}`);
        const monthContainsEntries = regex.test(sortedDates);

        // Render entries fallback dynamically
        setMonthHasEntries(monthContainsEntries);

        // If the month contains entries, put those entries in an array
        if (monthContainsEntries) {
          for (const el in data) {
            if (
              regex.test(
                new Date(data[el].date.date).toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })
              )
            ) {
              console.log(data[el]);
              currentPainEntries.push(data[el]);
            }
          }
        }

        // Resets
        setCurrentEntries(currentPainEntries);
        setIsloading(false);
      });

    // useEffect clean-up function
    return () => {
      setCurrentEntries([]);
      sortedDates = [];
      millisecondDates = [];
    };
  }, [currentMonth, currentPainEntries]);

  // Shows a loader while the Fetching
  if (isloading) {
    return <CircularProgress />;
  }

  // console.log(currentEntries);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Card>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              Pain records
            </Typography>
          </Grid>
        </Card>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.swapBar}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<ChevronLeftTwoToneIcon />}
            onClick={() => setCurrentMonth(getNextMonth(currentMonth, false))}
          >
            Back
          </Button>
          <Typography variant="h4">{currentMonth}</Typography>
          <Button
            size="large"
            variant="contained"
            color="primary"
            endIcon={<ChevronRightTwoToneIcon />}
            onClick={() => setCurrentMonth(getNextMonth(currentMonth))}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <Card newStyle={{ textAlign: "center", padding: "5rem 0" }}>
          {monthHasEntries &&
            currentEntries.map((el) => <p>Pain scale: {el.painScale}</p>)}
          {!monthHasEntries && <p>No pain was recorded this month</p>}
        </Card>
      </Grid>
    </Container>
  );
};

export default Records;
