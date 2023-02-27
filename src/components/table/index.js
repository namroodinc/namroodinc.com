import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Table = ({ columns, rows }) => {
  return (
    <table className={styles.table}>
      {columns.length > 0 && (
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
      )}
      {rows.length > 0 && (
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((column, index) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.array)
};

Table.defaultProps = {
  columns: [],
  rows: []
};

export default Table;
