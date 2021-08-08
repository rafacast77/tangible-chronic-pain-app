import React, { useState, useEffect, useContext, useMemo } from "react";
import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import Card from "../../components/ui/Card";
import RecordDays from "./RecordDays";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChevronLeftTwoToneIcon from "@material-ui/icons/ChevronLeftTwoTone";
import ChevronRightTwoToneIcon from "@material-ui/icons/ChevronRightTwoTone";
import AuthContext from "../../store/Auth-context";

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

// let currentPainEntries = [];
const Records = () => {
  const authCtx = useContext(AuthContext);
  let userID;
  if (authCtx.isPainUser) {
    userID = authCtx.userUID;
  } else {
    userID = authCtx.userToSpectUID;
  }

  // This state is used to re-render the page after selectedLocationHandler
  const [forceUpdate, setForceUpdate] = useState(0);

  // let millisecondDates = [];
  let millisecondDates = useMemo(() => [], []);

  const classes = useStyles();

  // State management
  const [rawData, setRawData] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(currentFormattedMonth);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [monthHasEntries, setMonthHasEntries] = useState();
  const [isMount, setIsMount] = useState(true);
  const [isloading, setIsloading] = useState(true);

  const goToNextPage = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };
  const goToPrevPage = () => {
    setCurrentMonth(getNextMonth(currentMonth, false));
  };

  // Takes in data from fetch and sorts
  const dataHandler = (data) => {
    const millisecondDates = [];
    const sortedStringDates = [];
    const sortedDates = [];
    const currentPainEntries = [];

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
      sortedStringDates.push(formatDate(element));
      sortedDates.push(element);
    });

    // console.log(sortedStringDates, "All dates sorted");
    // console.log(sortedDates, "All dates sorted");

    const regex = new RegExp(`${currentMonth}`);
    const monthContainsEntries = regex.test(sortedStringDates);
    setMonthHasEntries(monthContainsEntries);

    // If the month contains entries
    if (monthContainsEntries) {
      // For each object entry
      // for (const el in data) {
      //   // If that entry contains the current month
      //   if (
      //     regex.test(
      //       new Date(data[el].date.date).toLocaleDateString("en-GB", {
      //         month: "long",
      //         year: "numeric",
      //       })
      //     )
      //   ) {
      //     // console.log(data[el]);
      //     currentPainEntries.push(data[el]);
      //   }
      // }
      let sortedEverything = data.map((el) => {
        console.log("data", data);
        const dayNumber = new Date(el.date.date).toLocaleDateString("en-GB", {
          day: "numeric",
        });
        const monthNumber = new Date(el.date.date).toLocaleDateString("en-GB", {
          month: "numeric",
        });
        const yearNumber = new Date(el.date.date).toLocaleDateString("en-GB", {
          year: "numeric",
        });

        const monthName = new Date(el.date.date).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        });

        if (regex.test(monthName)) {
          // console.log(data[el]);
          //currentPainEntries.push(data[el]);
          return { [monthName]: el };
        }
      });

      console.log(sortedEverything);
      // sortedEverything.sort(function (a, b) {
      //   return a - b;
      // });
      // console.log(`sortedEverything2`, sortedEverything);

      setCurrentEntries(currentPainEntries, "currentPainEntries");
    }
  };

  // This first of two effects handles fetching the data only one time
  // this will only run once, as it has no dependencies
  useEffect(() => {
    console.count("FIRST USEEFFECT");

    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${userID}/pain-entries.json`
    )
      .then((response) => response.json())
      .then((data) => {
        const that = [];
        for (const el in data) {
          const thiss = {
            ...data[el],
          };
          that.push(thiss);
        }
        setRawData(that);
      });
  }, []);

  // The second effect handles the data we get in the first effect's fetch
  // We skip the first mount, and change it every time a dependency changes
  useEffect(() => {
    console.count("SECOND USEEFFECT");

    // This isMount state allows to skip the first render
    // of this effect and run it starting from the second.
    if (isMount) {
      setIsMount(false);
      return;
    }

    // This handler receives the data extracted from Firebase,
    // and handles and renders it by setting the relevant states
    dataHandler(rawData);

    setIsloading(false);
  }, [rawData, currentMonth]);

  if (isloading) {
    return <CircularProgress />;
  }

  // Test current entries value
  // console.log(currentEntries, "currentEntries");

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Card newStyle={{ marginTop: "4rem" }}>
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
            onClick={goToPrevPage}
          >
            Back
          </Button>
          <Typography variant="h4">{currentMonth}</Typography>
          <Button
            size="large"
            variant="contained"
            color="primary"
            endIcon={<ChevronRightTwoToneIcon />}
            onClick={goToNextPage}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <Card newStyle={{ textAlign: "center", padding: "2.5rem 0" }}>
          {monthHasEntries && <RecordDays monthEntries={currentEntries} />}

          {!monthHasEntries && (
            <Typography variant="h5">
              No pain was recorded this month
            </Typography>
          )}
        </Card>
      </Grid>
    </Container>
  );
};

export default Records;
