import { action, makeObservable, observable } from "mobx";

export class SiteStore {
  email = process.env.REACT_APP_MY_EMAIL;
  github = process.env.REACT_APP_MY_GITHUB;
  linkedIn = process.env.REACT_APP_MY_LINKEDIN;
  name = process.env.REACT_APP_MY_NAME;
  theme = localStorage.getItem("theme") || "light";
  twitter = process.env.REACT_APP_MY_TWITTER;
  siteName = "namrood,inc.";

  constructor() {
    makeObservable(this, {
      email: observable,
      github: observable,
      linkedIn: observable,
      name: observable,
      twitter: observable,
      theme: observable,
      setTheme: action,
      siteName: observable
    });
  }

  setTheme = (theme) => {
    this.theme = theme;
    localStorage.setItem("theme", theme);
  };
}
