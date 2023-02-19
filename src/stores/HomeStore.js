import { computed, makeObservable, observable } from "mobx";

export class HomeStore {
  name = "";

  constructor(name = "HomeStore") {
    makeObservable(this, {
      name: observable,
      nameComp: computed
    });
    this.name = name;
  }

  get nameComp() {
    return this.name + " oh yeah";
  }
}
