import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  textMargin: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  subTitle1: {
    color: "#1c4966",
  },
  subTitle2: {
    color: "#296d98",
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const UserGuideFormat = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.userGuideText.map((text) => {
        return (
          <Grid className={classes.textMargin}>
            <Typography variant="h5" className={classes.title}>
              {text.title}
            </Typography>
            <Typography variant="h5" className={classes.subTitle1}>
              {text.subTitle1}
            </Typography>
            <Typography variant="h6" className={classes.subTitle2}>
              {text.subTitle2}
            </Typography>
            <Typography variant="body1">{text.description}</Typography>
          </Grid>
        );
      })}
    </>
  );
};

export default UserGuideFormat;
