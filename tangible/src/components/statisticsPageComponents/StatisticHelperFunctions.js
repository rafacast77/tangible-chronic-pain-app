/**
 * This File contains helper functions used to create the logic and math of the
 * Statistical graphs shown on the Statistics page
 */

// Counts the total occurrences of each pain location in pain entries and returns
// an array of objects with location, percentage frequency and total occurrences
export function locationCounter(recordedLocations, entriesLength) {
  const locationsCount = {};
  const locationArray = [];
  for (const num of recordedLocations) {
    locationsCount[num] = locationsCount[num] ? locationsCount[num] + 1 : 1;
  }
  for (let key in locationsCount) {
    let count = locationsCount[key];
    let frequencyPercentage = (count / entriesLength) * 100;
    let location = key;
    locationArray.push({
      name: location,
      factorAverage: frequencyPercentage,
      count,
    });
  }
  locationArray.sort(compare);
  return locationArray;
}

// Returns an array containing effect and renaming the name of medicine and treatment
const createListMedTreat = (recordedMedicine, recordedTreatment) => {
  // Changes medicine name to name to concatenate with treatment
  const medication = recordedMedicine.map((item) => {
    return { name: item.medicationName, effect: item.effect };
  });

  // Changes treatment name to name to concatenate with medicine
  const treatment = recordedTreatment.map((item) => {
    return { name: item.treatmentName, effect: item.effect };
  });

  // Concatenates medicine and treatment array
  return medication.concat(treatment);
};

// Returns an array of objects containing factor name, occurrances of selected effect and
// total of effect for each factor
const createListFactorEffects = (treatAndMed, effect) => {
  // Contains name of factor and the occurances for better and total
  const medAndTreatBetterAndTotal = [];
  // Creates an object for each factor and adds the occurrances of better and total.
  treatAndMed.forEach((factor) => {
    // findIndex returns -1 if the factor is not found in the array.
    let factorIndex = medAndTreatBetterAndTotal.findIndex(
      (med) => med.name === factor.name
    );
    // Adds a factor if not in the array and +1 to selected and total effect.
    if (factorIndex === -1 && factor.effect === effect) {
      medAndTreatBetterAndTotal.push({
        name: factor.name,
        effecttoAVG: 1,
        total: 1,
        effectName: effect,
      });
      // Adds a factor if it doesen't exists and +1 to the total occurance
    } else if (factorIndex === -1 && factor.effect !== effect) {
      medAndTreatBetterAndTotal.push({
        name: factor.name,
        effecttoAVG: 0,
        total: 1,
        effectName: effect,
      });
      // If the factor already exist and contains the selected effect
    } else if (factorIndex !== -1 && factor.effect === effect) {
      medAndTreatBetterAndTotal[factorIndex].effecttoAVG++;
      medAndTreatBetterAndTotal[factorIndex].total++;
      // If the factor already exist and does not contains the selected effect
    } else {
      medAndTreatBetterAndTotal[factorIndex].total++;
    }
  });
  return medAndTreatBetterAndTotal;
};
// Arranges array of objects
function compare(a, b) {
  if (a.factorAverage > b.factorAverage) {
    return -1;
  }
  if (a.factorAverage < b.factorAverage) {
    return 1;
  }
  return 0;
}

// Returns an array containing  the factor name and average of effects
export function factorEffectAverage(
  recordedMedicine,
  recordedTreatment,
  effect
) {
  // Contains the factor name and average of effect: better
  const factorAndEffectAverage = [];
  // Returns a restructured / combined array of medicines and treatments
  const treatAndMed = createListMedTreat(recordedMedicine, recordedTreatment);
  // Returns an array of object containing the factor name, and occurances of effects
  const factorEffects = createListFactorEffects(treatAndMed, effect);
  // Returns an array with the name and average of effect occurances.
  factorEffects.forEach((factor) => {
    // The if statement below prevents empty factors of showing up in the charts
    if (factor.effecttoAVG !== 0) {
      // Gets the average of each factor occurnces
      const effectAverage = (factor.effecttoAVG / factor.total) * 100;
      factorAndEffectAverage.push({
        name: factor.name,
        factorAverage: effectAverage,
      });
    }
  });
  // Arranges effects in decreasing order
  factorAndEffectAverage.sort(compare);

  return factorAndEffectAverage;
}
