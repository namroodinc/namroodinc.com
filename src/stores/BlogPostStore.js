import { action, makeObservable, observable } from "mobx";

export class BlogPostStore {
  blogPostList = [];

  constructor() {
    makeObservable(this, {
      blogPostList: observable,
      fetchBlogPostList: action
    });
  }

  fetchBlogPostList = async () => {
    const url = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}&content_type=blogPost&order=-sys.createdAt`;
    const response = await fetch(url);
    const data = await response.json();

    this.blogPostList = data.items.map((item) => {
      return {
        id: item.sys.id,
        headline: item.fields.headline,
        createdAt: item.sys.createdAt
      };
    });
  };
}
