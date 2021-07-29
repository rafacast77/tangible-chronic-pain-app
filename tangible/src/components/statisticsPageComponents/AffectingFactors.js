import React from "react";
import Card from "../ui/Card";
import Grid from "@material-ui/core/Grid";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
/**
 * This reusable component renders the graphs showing treatment and medication
 * effects.
 */
const AffectingFactors = (props) => {
  // tickFormatter function for showing percentages with 0 decimal places
  const toPercent = (decimal) => {
    return `${decimal.toFixed(0)}%`;
  };
  return (
    <Card>
      <Grid>
        <h2>{props.statsTitle}</h2>

        <BarChart
          width={930}
          height={450}
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
          <YAxis type="category" dataKey="name" />
          <Tooltip
            cursor={{ stroke: "green", strokeWidth: 2 }}
            formatter={toPercent}
          />
          <Legend />
          <Bar dataKey="factorAverage" fill={props.barColor} />
        </BarChart>
      </Grid>
    </Card>
  );
};

export default AffectingFactors;
