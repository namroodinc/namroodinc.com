import { createContext, useContext } from "react";

import { HeatMapStore } from "./stores/HeatMapStore";
import { TeamsStore } from "./stores/TeamsStore";

export const pitchLabStores = Object.freeze({
  heatMapStore: new HeatMapStore(),
  teamsStore: new TeamsStore()
});

export const PitchLabStoresContext = createContext(pitchLabStores);

export const PitchLabStoresProvider = PitchLabStoresContext.Provider;

export const usePitchLabStore = (store) =>
  useContext(PitchLabStoresContext)[store];
