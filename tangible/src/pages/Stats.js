import React, { useEffect, useState } from "react";
import AffectingFactors from "../components/statisticsPageComponents/AffectingFactors";
import ScaleFrequency from "../components/statisticsPageComponents/ScaleFrequency";
import TimePeriods from "../components/statisticsPageComponents/TimePeriods";
import {
  locationCounter,
  factorEffectAverage,
} from "../components/statisticsPageComponents/StatisticHelperFunctions";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const Stats = () => {
  // List of all pain entries
  const [painEntriesStats, setPainEntriesStats] = useState({
    listOfEntries: null,
    locationFrequency: null,
    negativeEffectFrequency: null,
    positiveEffectFrequency: null,
    ineffectualFactorFrequency: null,
  });

  // boolean for the loading component
  const [isloading, setIsloading] = useState(true);

  // GET request for the list of locations when Page loads for the first time.
  useEffect(() => {
    fetch(
      "https://tangible-47447-default-rtdb.europe-west1.firebasedatabase.app/pain-entries.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const recordedLocations = [];
        const recordedMedicine = [];
        const recordedTreatment = [];
        const listOfEntries = [];
        for (const key in data) {
          const entries = {
            ...data[key],
          };
          listOfEntries.push(entries);
          if (data[key].painLocation) {
            recordedLocations.push(...data[key].painLocation);
          }
          if (data[key].medicine) {
            recordedMedicine.push(...data[key].medicine);
          }

          if (data[key].treatment) {
            recordedTreatment.push(...data[key].treatment);
          }
        }

        setPainEntriesStats({
          listOfEntries: listOfEntries,
          locationFrequency: locationCounter(
            recordedLocations,
            listOfEntries.length
          ),
          negativeEffectFrequency: factorEffectAverage(
            recordedMedicine,
            recordedTreatment,
            "Worse"
          ),
          positiveEffectFrequency: factorEffectAverage(
            recordedMedicine,
            recordedTreatment,
            "Better"
          ),
          ineffectualFactorFrequency: factorEffectAverage(
            recordedMedicine,
            recordedTreatment,
            "No Change"
          ),
        });
        setIsloading(false);
      });
  }, []);

  // Shows a loader while the Fetching
  if (isloading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="lg">
      <Grid>
        <ScaleFrequency listOfPainEntries={painEntriesStats} />
        <TimePeriods listOfPainEntries={painEntriesStats} />
        <AffectingFactors
          statsTitle="Pain Locations"
          frequencyData={painEntriesStats.locationFrequency}
          barColor="#004777"
        />
        <AffectingFactors
          statsTitle="Negative Effects"
          frequencyData={painEntriesStats.negativeEffectFrequency}
          barColor="#A30000"
        />
        <AffectingFactors
          statsTitle="Positive Effects"
          frequencyData={painEntriesStats.positiveEffectFrequency}
          barColor="#8AEA92"
        />
        <AffectingFactors
          statsTitle="Ineffectual Factors"
          frequencyData={painEntriesStats.ineffectualFactorFrequency}
          barColor="#946E83"
        />
      </Grid>
    </Container>
  );
};

export default Stats;
