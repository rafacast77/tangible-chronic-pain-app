/**
 * This component contains constant variables containing text used to populate
 * pain labels and ranges in the pain scale components.
 */
const MINOR_PAIN =
  "Nagging, annoying, but doesn't interfere with most daily living activities. Patient able to adapt to pain psychologically and with medication or devices such as cushions.";
const MODERATE_PAIN =
  "Interferes significantly with daily living activities. Requires lifestyle changes but patient remains independant. Patient unable to adapt pain.";
const SEVERE_PAIN =
  "Disabling; Unable to perform daily living activities.\n Unable to engage in normal activities Patient is disable and unable to function independently";

export const MARKS = [
  {
    value: 0,
    label: 0,
    painIntensity: "Pain Free",
    description: "Feeling perfectly normal.",
  },
  {
    value: 1,
    label: 1,
    painIntensity: "Very Mid",
    description: MINOR_PAIN,
  },
  {
    value: 2,
    label: 2,
    painIntensity: "Discomforting",
    description: MINOR_PAIN,
  },
  {
    value: 3,
    label: 3,
    painIntensity: "Tolerable",
    description: MINOR_PAIN,
  },
  {
    value: 4,
    label: 4,
    painIntensity: "Distressing",
    description: MODERATE_PAIN,
  },
  {
    value: 5,
    label: 5,
    painIntensity: "Very Distressing",
    description: MODERATE_PAIN,
  },
  {
    value: 6,
    label: 6,
    painIntensity: "Intense",
    description: MODERATE_PAIN,
  },
  {
    value: 7,
    label: 7,
    painIntensity: "Very Intense",
    description: SEVERE_PAIN,
  },
  {
    value: 8,
    label: 8,
    painIntensity: "Utterly Horrible",
    description: SEVERE_PAIN,
  },
  {
    value: 9,
    label: 9,
    painIntensity: "Excruciating Unbearable",
    description: SEVERE_PAIN,
  },
  {
    value: 10,
    label: 10,
    painIntensity: "Unimaginable Unspeakable",
    description: SEVERE_PAIN,
  },
];

export const PAGESWAPTITLES = [
  {
    question: "What was the day and time of your pain episode?",
    title: "Date and Time",
  },
  {
    question: "Where does it hurts?",
    title: "Pain Location",
  },
  {
    question: "How painful was the pain episode?",
    title: "Pain Scale",
  },
  {
    question: "What medicine did you take to ease the pain ?",
    title: "Medication",
  },
  {
    question: "Did you tried any treatment-method to ease the pain?",
    title: "Treatments",
  },
  {
    question: "Is there anything else you would like to add?",
    title: "Extra Comments",
  },
];
