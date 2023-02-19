import { action, makeObservable, observable } from "mobx";

export class SiteStore {
  name = "Ashoor Namrood";
  email = "ashoornamrood@gmail.com";
  siteName = "namrood---inc";

  constructor() {
    makeObservable(this, {
      name: observable,
      email: observable,
      siteName: observable,
      changeSiteName: action
    });
  }

  changeSiteName = (name) => {
    this.siteName = name;
  };
}
