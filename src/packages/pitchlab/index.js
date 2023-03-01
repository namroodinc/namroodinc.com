import React from "react";
import Columns from "../../components/columns";
import Page from "../../components/page";

import PlayingArea from "./PlayingArea";

export default function PitchLab() {
  return (
    <Columns numberOfColumns={1}>
      <Page id="6oNticgshX3y7r3h405ljH" />{" "}
      <div>
        <h2>Soccer</h2>
        <PlayingArea
          fillColor="#252525"
          showGrid
          strokeColor="#fbfbfb"
          teams={[]}
        />
        <PlayingArea
          width={360}
          height={240}
          showGrid
          isLandscape={false}
          teams={[]}
        />
        <PlayingArea
          fillColor="#252525"
          strokeColor="#fbfbfb"
          sport="basketball"
        />
        <PlayingArea width={360} height={240} isLandscape={false} teams={[]} />
      </div>
    </Columns>
  );
}
