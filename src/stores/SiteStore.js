import { action, makeObservable, observable } from "mobx";

export class SiteStore {
  email = process.env.REACT_APP_MY_EMAIL;
  github = process.env.REACT_APP_MY_GITHUB;
  linkedIn = process.env.REACT_APP_MY_LINKEDIN;
  name = process.env.REACT_APP_MY_NAME;
  twitter = process.env.REACT_APP_MY_TWITTER;
  siteName = "namrood---inc";

  constructor() {
    makeObservable(this, {
      email: observable,
      github: observable,
      linkedIn: observable,
      name: observable,
      twitter: observable,
      siteName: observable,
      changeSiteName: action
    });
  }

  changeSiteName = (name) => {
    this.siteName = name;
  };
}
