import { action, makeObservable, observable } from "mobx";

export class HeatMapStore {
  heatMapData = {
    data: [],
    dataLayerType: ""
  };

  constructor() {
    makeObservable(this, {
      heatMapData: observable,
      fetchHeatMap: action,
      resetHeatMap: action
    });
  }

  fetchHeatMap = async (sport, dataLayer, id = "01") => {
    const url = `/api/static/${sport}/${dataLayer}/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    this.heatMapData = data;
  };

  resetHeatMap = () => {
    this.heatMapData = {
      data: [],
      dataLayerType: ""
    };
  };
}
