import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button className={styles.button} onClick={props.handleClick}>
      {props.name}
    </button>
  );
}

export default Button;
