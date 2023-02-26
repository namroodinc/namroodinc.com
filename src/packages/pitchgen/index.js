import React from "react";

import { BasketballCourt, SoccerPitch } from "./PlayingArea";

export default function PitchGen() {
  return (
    <>
      {" "}
      <>
        <h2>Soccer</h2>
        <SoccerPitch fillColor="#252525" strokeColor="#fbfbfb" teams={[]} />
        <SoccerPitch width={360} height={240} isHorizontal={false} teams={[]} />
        <SoccerPitch fillColor="#252525" strokeColor="#fbfbfb" teams={[]} />
        <SoccerPitch width={360} height={240} isHorizontal={false} teams={[]} />
      </>{" "}
      <>
        <h2>Basketball</h2>
        <BasketballCourt />
        <BasketballCourt
          fillColor="orange"
          width={360}
          height={192}
          isHorizontal={false}
        />
      </>
    </>
  );
}
