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
  // const [forceUpdate, setForceUpdate] = useState(0);

  const classes = useStyles();

  // State management
  const [rawData, setRawData] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(currentFormattedMonth);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [monthHasEntries, setMonthHasEntries] = useState();
  const [isMount, setIsMount] = useState(true);
  const [isloading, setIsloading] = useState(true);
  const [appHasEntries, setAppHasEntries] = useState(false);

  const goToNextPage = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };
  const goToPrevPage = () => {
    setCurrentMonth(getNextMonth(currentMonth, false));
  };

  const getDay = (entries) => {
    const records = [];

    for (const day in entries) {
      records.push(<RecordDays currentDay={day} entries={entries[day]} />);
    }

    return records;
  };

  // Takes in data from fetch and sorts
  const dataHandler = (data) => {
    const millisecondDates = [];
    const sortedStringDates = [];
    const sortedDates = [];

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
      console.log(data, "ALLDATA");
      let sortedEverything = data.map((el) => {
        const monthName = new Date(el.date.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        console.log(regex.test(monthName), "REGEX MONTH NAME");

        if (regex.test(currentMonth)) {
          //currentPainEntries.push(data[el]);
          return { [monthName]: el };
        }
      });

      const currentMonthEntries = [];
      console.log(sortedEverything, "sortedEverything");

      sortedEverything.map((el) => {
        if (regex.test(Object.keys(el))) {
          currentMonthEntries.push(el);
        }
      });

      console.log(`to Sort:`, currentMonthEntries);

      const sortedMonthEntries = currentMonthEntries.reduce(
        (accumulatorObject, thisEvent) => {
          // here, we need to check if the accumulator object contains this key:
          const key = Object.keys(thisEvent)[0];
          if (accumulatorObject[key]) {
            // if our object has this key, we've already
            //  started an array for this date. Simply add
            //  this object to that array.
            accumulatorObject[key] = [
              ...accumulatorObject[key],
              thisEvent[key],
            ];
          } else {
            // this is a new key. Create the property, and
            //  create the array.
            accumulatorObject[key] = [thisEvent[key]];
          }
          // and we have to return the object, so its
          //  available for the next iteration of reduce.
          return accumulatorObject;
        },
        {}
      );

      console.log("sorted:", sortedMonthEntries);

      setCurrentEntries(sortedMonthEntries, "currentPainEntries");
    }
  };

  // This first of two effects handles fetching the data only one time
  // this will only run once, as it has no dependencies
  useEffect(() => {
    console.count("FIRST USEEFFECT");

    fetch(
      `https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/${userID}/pain-entries.json`
    )
      .then((response) => {
        // If the response of the http request is 200 (ok)
        if (response.ok) {
          // get the json of that response
          return response.json();
        } else {
          // If the response status is bad, throw an error
          throw new Error();
        }
      })
      .then((data) => {
        const extractedData = [];
        for (const el in data) {
          const tempData = {
            ...data[el],
          };
          extractedData.push(tempData);
        }

        setAppHasEntries(true);
        setRawData(extractedData);
        setIsloading(false);
      })
      .catch((e) => {
        console.error(e);
        setAppHasEntries(false);
        setIsloading(false);
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
    if (appHasEntries) {
      dataHandler(rawData);
    }
  }, [rawData, currentMonth]);

  if (isloading) {
    return <CircularProgress />;
  }

  // Test current entries value
  // console.log(currentEntries, "currentEntries");

  // console.log(currentEntries, "currentEntries");

  if (appHasEntries) {
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
            {monthHasEntries && getDay(currentEntries)}

            {!monthHasEntries && (
              <Typography variant="h5">
                No pain was recorded this month
              </Typography>
            )}
          </Card>
        </Grid>
      </Container>
    );
  }

  if (!appHasEntries) {
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
            <Typography variant="h5">
              No pain was recorded this month
            </Typography>
          </Card>
        </Grid>
      </Container>
    );
  }
};

export default Records;
