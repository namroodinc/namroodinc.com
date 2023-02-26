import React from "react";
import { chelsea, manchesterUnited } from "./data";

import { BasketballCourt, SoccerPitch } from "./PlayingArea"; //

export default function PitchGen() {
  return (
    <>
      {" "}
      <>
        <h2>Soccer</h2>
        <SoccerPitch
          fillColor="#252525"
          strokeColor="#fbfbfb"
          teams={[chelsea, manchesterUnited]}
        />
        <SoccerPitch
          width={360}
          height={240}
          isHorizontal={false}
          teams={[chelsea]}
        />
        <SoccerPitch
          fillColor="#252525"
          strokeColor="#fbfbfb"
          teams={[manchesterUnited]}
        />
        <SoccerPitch
          width={360}
          height={240}
          isHorizontal={false}
          teams={[chelsea, manchesterUnited]}
        />
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
