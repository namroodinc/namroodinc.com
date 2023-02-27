import React from "react";
import Columns from "../../components/columns";
import Page from "../../components/page";

import { BasketballCourt, SoccerPitch } from "./PlayingArea";

export default function PitchLab() {
  return (
    <Columns numberOfColumns={1}>
      <Page id="6oNticgshX3y7r3h405ljH" />{" "}
      <div>
        <h2>Soccer</h2>
        <SoccerPitch
          fillColor="#252525"
          showGrid
          strokeColor="#fbfbfb"
          teams={[]}
        />
        <SoccerPitch
          width={360}
          height={240}
          showGrid
          isHorizontal={false}
          teams={[]}
        />
        <SoccerPitch fillColor="#252525" strokeColor="#fbfbfb" teams={[]} />
        <SoccerPitch width={360} height={240} isHorizontal={false} teams={[]} />

        <h2>Basketball</h2>
        <BasketballCourt />
        <BasketballCourt
          fillColor="orange"
          width={360}
          height={192}
          isHorizontal={false}
        />
      </div>
    </Columns>
  );
}
