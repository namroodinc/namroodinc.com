import { action, makeObservable, observable } from "mobx";

export class HeatMapStore {
  heatMapData = [];

  constructor() {
    makeObservable(this, {
      heatMapData: observable,
      fetchHeatMap: action,
      resetHeatMap: action
    });
  }

  fetchHeatMap = async (sport, heatmapType) => {
    const url = `/api/static/${sport}/heatmaps/${heatmapType}`;
    const response = await fetch(url);
    const data = await response.json();

    this.heatMapData = data;
  };

  resetHeatMap = () => {
    this.heatMapData = [];
  };
}
