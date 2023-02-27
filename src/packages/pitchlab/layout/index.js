import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../../../components/button";

const PitchLabLayout = () => {
  return (
    <>
      <div>
        <Button
          buttonType="link"
          label="Home"
          size="small"
          to="/packages/pitchlab"
        />
        <Button
          buttonType="link"
          label="Soccer"
          size="small"
          to="/packages/pitchlab/soccer"
        />
        <Button
          buttonType="link"
          label="Basketball"
          size="small"
          to="/packages/pitchlab/basketball"
        />
      </div>
      <Outlet />
    </>
  );
};

export default PitchLabLayout;
