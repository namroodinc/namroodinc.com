import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Button = ({ buttonType, fullWidth, icon, label, onClick, size, to }) => {
  if (buttonType === "link") {
    return (
      <Link className={`${styles.button} ${styles[size]}`} to={to}>
        {icon && icon}
        {label && label}
      </Link>
    );
  }

  return (
    <button
      className={`${styles.button} ${styles[size]} ${
        styles[fullWidth ? "fullWidth" : "inline"]
      }
    `}
      onClick={onClick}
    >
      {icon && icon}
      {label && label}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.oneOf(["button", "link"]),
  fullWidth: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  to: PropTypes.string
};

Button.defaultProps = {
  buttonType: "button",
  fullWidth: false,
  size: "medium",
  icon: null,
  label: null,
  to: null
};

export default Button;
