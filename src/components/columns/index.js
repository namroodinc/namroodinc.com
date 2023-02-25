import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Columns = (props) => {
  return (
    <div
      className={styles.columns}
      data-number-of-columns={props.numberOfColumns}
    >
      {props.children}
    </div>
  );
};

Columns.propTypes = {
  children: PropTypes.node,
  numberOfColumns: PropTypes.number
};

Columns.defaultProps = {
  children: null,
  numberOfColumns: 3
};

export default Columns;
