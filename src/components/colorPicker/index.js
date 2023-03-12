import React from "react";
import propTypes from "prop-types";

import styles from "./styles.module.scss";

function ColorPicker(props) {
  const { colors, onClick } = props;

  return (
    <div>
      <label className={styles.colorPickerLabel}>{props.label}</label>
      <div className={styles.colorPicker}>
        {colors.map((color) => (
          <button
            className={styles.colorPickerButton}
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => onClick(color)}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  colors: propTypes.arrayOf(propTypes.string).isRequired,
  label: propTypes.string,
  onClick: propTypes.func.isRequired
};

ColorPicker.defaultProps = {
  // give me an array of 16 vibrant colors
  colors: [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
    "#FF1493",
    "#A52A2A",
    "#D2691E",
    "#FF4500",
    "#2E8B57",
    "#008B8B",
    "#4169E1",
    "#8A2BE2",
    "#FF69B4"
  ],
  label: "Color Picker"
};

export default ColorPicker;
