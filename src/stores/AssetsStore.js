import { observable, action, makeObservable } from "mobx";

export class AssetsStore {
  assets = [];

  constructor() {
    makeObservable(this, {
      assets: observable,
      fetchAssets: action
    });

    this.fetchAssets();
  }

  fetchAssets = async () => {
    const url = `/api/contentful/assets`;
    const response = await fetch(url);
    const data = await response.json();

    this.assets = data.items.map((item) => {
      return {
        id: item.sys.id,
        ...item.fields
      };
    });
  };
}
