import { action, makeObservable, observable } from "mobx";

export class PageStore {
  page = null;

  constructor() {
    makeObservable(this, {
      page: observable,
      setPageAsNull: action
    });
  }

  fetchPage = async (id) => {
    const url = `/api/contentful/blogPost/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    this.page = {
      id: data.sys.id,
      headline: data.fields.headline,
      body: data.fields.pageBodyCopy,
      mainImageId: data.fields.mainImage?.sys?.id
    };
  };

  setPageAsNull = () => {
    this.page = null;
  };
}
