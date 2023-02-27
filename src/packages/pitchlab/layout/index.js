import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../../../components/button";
import { pitchLabStores, PitchLabStoresProvider } from "../stores";

const PitchLabLayout = () => {
  return (
    <PitchLabStoresProvider value={pitchLabStores}>
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
    </PitchLabStoresProvider>
  );
};

export default PitchLabLayout;
