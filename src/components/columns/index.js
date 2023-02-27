import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Columns = (props) => {
  return (
    <div
      className={styles.columns}
      data-gap={props.gap}
      data-number-of-columns={props.numberOfColumns}
      data-vertical-alignment={props.verticalAlignment}
    >
      {props.children}
    </div>
  );
};

Columns.propTypes = {
  children: PropTypes.node,
  gap: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  numberOfColumns: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  verticalAlignment: PropTypes.oneOf(["top", "center", "bottom"])
};

Columns.defaultProps = {
  children: null,
  gap: "xl",
  numberOfColumns: 3,
  verticalAlignment: "top"
};

export default Columns;
