import React from "react";

import { BasketballCourt, SoccerPitch } from "./PlayingArea";

export default function PitchGen() {
  return (
    <>
      {" "}
      <>
        <h2>Basketball</h2>
        <BasketballCourt />
        <BasketballCourt isHorizontal={false} />
      </>
      <>
        <h2>Soccer</h2>
        <SoccerPitch fillColor="#252525" strokeColor="#fbfbfb" />
        <SoccerPitch width={360} height={240} isHorizontal={false} />
      </>{" "}
    </>
  );
}
