import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PlayingArea from "../PlayingArea";

const DataMaker = () => {
  const { sport } = useParams();
  const [data, setData] = useState("x,y");

  return (
    <div>
      <h1>Data Maker</h1>
      <PlayingArea
        sport={sport}
        onClick={(event) => {
          const { x, y } = event;

          // if number is 0.92131231 make it 92
          const xRounded = Math.round(x * 100);
          const yRounded = Math.round(y * 100);

          setData(`${data}\n${xRounded},${yRounded}`);
        }}
      />

      <textarea readOnly value={data} />
    </div>
  );
};

export default DataMaker;
