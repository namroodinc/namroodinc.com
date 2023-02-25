import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Columns = (props) => {
  return (
    <div
      className={styles.columns}
      data-gap={props.gap}
      data-number-of-columns={props.numberOfColumns}
    >
      {props.children}
    </div>
  );
};

Columns.propTypes = {
  children: PropTypes.node,
  gap: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  numberOfColumns: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

Columns.defaultProps = {
  children: null,
  gap: "xl",
  numberOfColumns: 3
};

export default Columns;
