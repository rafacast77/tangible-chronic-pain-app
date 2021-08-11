import { Typography, ButtonBase, Paper, Grid, Avatar } from "@material-ui/core";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 700,
    marginBottom: "2rem",
    borderRadius: "56px",
    boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
    border: "1px solid #f3f3f3",
  },
  painCircle: {
    fontSize: "2rem",
    width: 70,
    height: 70,
    backgroundColor: ({ circleColor }) => circleColor,
    color: "black",
  },
  time: {
    marginTop: ".5rem",
    color: "#333",
  },
  remove: {
    color: "#f44336",
  },
  medicine: {
    color: "#077d0b",
    fontFamily: "Roboto",
    fontSize: "19px",
    marginRight: ".5rem",
  },
  treatment: {
    color: "#077d0b",
    fontFamily: "Roboto",
    fontSize: "19px",
  },
}));

const colorHandler = (painScale) => {
  if (painScale === 0) {
    return "rgba(6, 209, 255, 0.496)";
  } else if (painScale === 1 || painScale === 2 || painScale === 3) {
    return "rgba(6, 255, 43, 0.496)";
  } else if (painScale === 4 || painScale === 5 || painScale === 6) {
    return " rgba(255, 234, 6, 0.626)";
  } else if (painScale === 7 || painScale === 8 || painScale === 9) {
    return "rgba(255, 176, 6, 0.728)";
  } else if (painScale === 10) {
    return "rgba(255, 6, 6, 0.633)";
  }
};

const RecordEntry = ({ entry }) => {
  console.log(entry, "currententry");

  const classes = useStyles({ circleColor: colorHandler(entry.painScale) });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={5}>
          {/* Left column */}
          <Grid xs={2} item direction="column">
            <Avatar className={classes.painCircle}>{entry.painScale}</Avatar>
            <Typography className={classes.time} variant="body1">
              {entry.date.time}
            </Typography>
          </Grid>
          {/* Middle column */}
          <Grid align="left" item xs={8} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {entry.painLocation && entry.painLocation.length === 1
                    ? "Pain location:"
                    : "Pain locations:"}
                </Typography>
                <Typography color="blueGrey" gutterBottom variant="body1">
                  {entry.painLocation
                    ? entry.painLocation.join(" - ")
                    : "No location specified"}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Comments:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {entry.comments !== "" ? entry.comments : "No comments"}
                </Typography>
                {/* Medicine grid */}
                <Typography gutterBottom variant="subtitle1">
                  Medicine:
                </Typography>
                <Grid container xs direction="row">
                  <Grid item xs={6}>
                    <Typography className={classes.medicine} gutterBottom>
                      {entry.medicine && entry.medicine.length !== 0
                        ? entry.medicine[0].medicationName
                        : "No medicine specified"}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      {entry.medicine && entry.medicine.length !== 0
                        ? "Dose: " + entry.medicine[0].dose
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" gutterBottom>
                      {entry.medicine && entry.medicine.length !== 0
                        ? "Effect: " + entry.medicine[0].effect
                        : ""}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Medicine grid */}
                <Typography gutterBottom variant="subtitle1">
                  Treatment:
                </Typography>
                <Grid container xs direction="row">
                  <Grid item xs={8}>
                    <Typography className={classes.treatment} gutterBottom>
                      {entry.treatment && entry.treatment.length !== 0
                        ? entry.treatment[0].treatmentName
                        : "No treatment specified"}{" "}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle1" gutterBottom>
                      {entry.treatment && entry.treatment.length !== 0
                        ? "Effect: " + entry.treatment[0].effect
                        : " "}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Right column */}
            <Grid item xs={2} align="right">
              <Typography variant="subtitle1">
                <Typography
                  variant="body2"
                  style={{ cursor: "pointer" }}
                  className={classes.remove}
                >
                  <ClearIcon fontSize="large" />
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default RecordEntry;
