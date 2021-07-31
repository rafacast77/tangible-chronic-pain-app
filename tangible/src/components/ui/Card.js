import React from "react";
import classes from "./Card.module.css";

function Card(props) {
  const newStyles = props.newStyle;

  return (
    <div className={classes.card} style={newStyles}>
      {props.children}
    </div>
  );
}

export default Card;
