import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontWeight: theme.typography.fontWeightBold,
  },
  accordion: {
    width: "100%",
    display: "block",
  },
  accordionText: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  mainAccordion: {
    backgroundColor: ({ accordionColor }) => accordionColor,
  },
}));

const CustomizedAccordion = (props) => {
  const classes = useStyles({ accordionColor: props.accordionColor });

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      className={classes.mainAccordion}
      expanded={expanded === props.panel}
      onChange={handleChange(props.panel)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" className={classes.heading}>
          {props.accordionTitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          <Typography variant="body1" className={classes.accordionText}>
            {props.bodyText}
          </Typography>
          <main>{props.children}</main>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomizedAccordion;
