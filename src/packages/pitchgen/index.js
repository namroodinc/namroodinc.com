import React from "react";

import { SoccerPitch } from "./PlayingArea";

export default function PitchGen() {
  return (
    <>
      <SoccerPitch />
      <SoccerPitch width={360} height={240} isHorizontal={false} />
    </>
  );
}
