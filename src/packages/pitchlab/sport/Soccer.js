import React, { useState } from "react";
import ColorPicker from "../../../components/colorPicker";
import Forms from "../../../components/forms";
import PlayingArea from "../PlayingArea";
// import propTypes from "prop-types";

// import { playingAreaConfig } from "./utils";

function SportSoccer(props) {
  const [pitchColor, setPitchColor] = useState("#FFF");
  const [strokeColor, setStrokeColor] = useState("#000");
  const [padding, setPadding] = useState(20);

  return (
    <>
      SportSoccer
      <>
        Show a pitch where you can make basic changes, i.e. change background
        colour, make it horizontal etc
      </>
      <>
        - colour picker for pitch colour - orientation of pitch
        (portrait/landscape)
      </>
      <ColorPicker
        label="Pitch Color"
        onClick={(color) => {
          setPitchColor(color);
        }}
      />
      <ColorPicker
        label="Stroke Color"
        onClick={(color) => {
          setStrokeColor(color);
        }}
      />
      <Forms
        name="padding"
        label="Padding"
        type="range"
        onChange={(event) => setPadding(parseInt(event.target.value))}
        value={padding}
      />
      <PlayingArea
        sport="soccer"
        fillColor={pitchColor}
        padding={padding}
        strokeColor={strokeColor}
      />
    </>
  );
}

SportSoccer.propTypes = {};

export default SportSoccer;
