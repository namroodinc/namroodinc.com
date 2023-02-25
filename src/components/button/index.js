import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Button = ({
  buttonType,
  fullWidth,
  icon,
  label,
  onClick,
  size,
  to,
  ...other
}) => {
  const content = (
    <>
      {icon && icon}
      {label && label}
    </>
  );

  if (buttonType === "anchor") {
    return (
      <a
        className={`${styles.button} ${styles[size]} ${
          styles[fullWidth ? "fullWidth" : "inline"]
        }
      `}
        data-button-type={buttonType}
        href={to}
        {...other}
      >
        {content}
      </a>
    );
  }

  if (buttonType === "link") {
    return (
      <Link
        className={`${styles.button} ${styles[size]} ${
          styles[fullWidth ? "fullWidth" : "inline"]
        }
      `}
        data-button-type={buttonType}
        to={to}
        {...other}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${styles.button} ${styles[size]} ${
        styles[fullWidth ? "fullWidth" : "inline"]
      }
    `}
      data-button={buttonType}
      onClick={onClick}
      {...other}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.oneOf(["anchor", "button", "link"]),
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
