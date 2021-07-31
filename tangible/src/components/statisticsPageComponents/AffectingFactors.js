import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const useStyles = makeStyles((theme) => ({
  graphMargin: {
    left: "10",
  },
  graphTitle: {
    paddingBottom: "2rem",
  },
}));
/**
 * This reusable component renders the graphs showing treatment and medication
 * effects.
 */
const AffectingFactors = (props) => {
  const classes = useStyles();
  // tickFormatter function for showing percentages with 0 decimal places
  const toPercent = (decimal) => {
    return `${decimal.toFixed(0)}%`;
  };
  return (
    <>
      <Typography variant="h4" className={classes.graphTitle}>
        {props.statsTitle}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          margin={{ left: 20 }}
          data={props.frequencyData}
          layout="vertical"
          stackOffset="expand"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="factorAverage"
            tickFormatter={toPercent}
          />
          <YAxis type="category" dataKey="name" angle="-45" />
          <Tooltip
            cursor={{ stroke: "green", strokeWidth: 2 }}
            formatter={toPercent}
          />
          <Legend />
          <Bar dataKey="factorAverage" fill={props.barColor} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AffectingFactors;
