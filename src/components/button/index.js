import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Button = ({ fullWidth, icon, label, onClick, size }) => {
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
  fullWidth: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"])
};

Button.defaultProps = {
  fullWidth: false,
  size: "medium"
};

export default Button;
