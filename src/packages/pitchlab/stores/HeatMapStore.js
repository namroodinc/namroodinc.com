import { action, computed, makeObservable, observable } from "mobx";

export class HeatMapStore {
  heatMapData = [];

  constructor() {
    makeObservable(this, {
      heatMapData: observable,
      fetchHeatMap: action,
      resetHeatMap: action,
      heatMapDataUnpack: computed
    });
  }

  fetchHeatMap = async (sport, heatmapType) => {
    const url = `/api/static/${sport}/heatmaps/${heatmapType}`;
    const response = await fetch(url);
    const data = await response.json();

    this.heatMapData = data;
  };

  get heatMapDataUnpack() {
    return {
      heatMapData: this.heatMapData,
      heatMapDataHighestValue: Math.max(
        ...this.heatMapData.map((row) => Math.max(...row))
      ),
      heatMapDataLowestValue: Math.min(
        ...this.heatMapData.map((row) => Math.min(...row))
      ),
      heatMapNumberOfColumns: this.heatMapData[0]?.length,
      heatMapNumberOfRows: this.heatMapData.length
    };
  }

  resetHeatMap = () => {
    this.heatMapData = [];
  };
}
