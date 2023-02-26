import React from "react";
import { Outlet } from "react-router-dom";

const PitchGenLayout = () => {
  return (
    <>
      <p>I'm in pitchgen</p>
      <Outlet />
    </>
  );
};

export default PitchGenLayout;
