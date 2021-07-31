import Card from "../ui/Card";
import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Records = () => {
  // boolean for the loading component
  const [isloading, setIsloading] = useState(true);

  const [painEntriesRecords, setPainEntriesRecords] = useState([]);
  // Convert month num to name
  function monthName(mon) {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][mon];
  }

  const sortedDates = [];
  const millisecondDates = [];

  // GET request for the list of dates
  useEffect(() => {
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-entries.json"
    )
      .then((response) => response.json())
      .then((data) => {
        for (const el in data) {
          // console.log(
          //   monthName(new Date(data[el].date.date).getMonth()),
          //   "test"
          // );

          // dates.push(new Date(data[el].date.date));
          millisecondDates.push(Date.parse(new Date(data[el].date.date)));
        }

        millisecondDates.sort(function (a, b) {
          return a - b;
        });

        millisecondDates.forEach((element) => {
          sortedDates.push(new Date(element));
        });

        console.log(millisecondDates, "Sorted millisecond Dates");
        console.log(sortedDates, "Sorted Dates");

        // dates.sort(function (a, b) {
        //   return Date.parse(a) > Date.parse(b);
        // });
        // console.log(dates);

        setIsloading(false);
      });
  }, []);

  // Shows a loader while the Fetching
  if (isloading) {
    return (
      <Card>
        <CircularProgress />
      </Card>
    );
  }
  return (
    <Card newStyle={{ textAlign: "center" }}>
      <h2>prev - DATE - next</h2>
      <br />
      <p>
        I think I could, if I know all the things I used to know. Tell me that
        first, and then, if I only know how to get dry again: they had a
        consultation about this, and after a few minutes to see anything; then
        she looked at the time it all seemed quite natural); but when the Rabbit
        was no longer to be seen: she found she had put on your shoes and
        stockings for you now, dears? `I wonder if I only know how to speak good
        English); `now I'm opening out like the largest telescope that ever was!
      </p>
    </Card>
  );
};

export default Records;
