import { action, makeObservable, observable } from "mobx";

export class BlogPostStore {
  assets = [];
  blogPostList = [];
  skip = 0;
  limit = 12;
  showMore = true;

  constructor() {
    makeObservable(this, {
      assets: observable,
      blogPostList: observable,
      skip: observable,
      limit: observable,
      showMore: observable,
      fetchBlogPostList: action
    });
  }

  fetchBlogPostList = async () => {
    const url = `/entries?skip=${this.skip}&limit=${this.limit}`;
    const response = await fetch(url);
    const data = await response.json();

    this.skip += this.limit;
    if (data.items.length < this.limit) {
      this.showMore = false;
    }

    this.blogPostList = [
      ...this.blogPostList,
      ...data.items.map((item) => {
        return {
          id: item.sys.id,
          headline: item.fields.headline,
          createdAt: item.sys.createdAt
        };
      })
    ];
  };
}
