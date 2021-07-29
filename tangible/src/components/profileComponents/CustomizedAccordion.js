import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    width: "100%",
    display: "block",
  },
  block: {
    display: "block",
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
        <Typography className={classes.heading}>
          {props.accordionTitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.block}>
        <Typography className={classes.heading}>{props.bodyText}</Typography>
        <main>{props.children}</main>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomizedAccordion;
