import React from "react";

import { SoccerPitch } from "./PlayingArea";

export default function PitchGen() {
  return (
    <>
      <SoccerPitch padding={20} />
      <SoccerPitch width={360} height={240} />
    </>
  );
}
