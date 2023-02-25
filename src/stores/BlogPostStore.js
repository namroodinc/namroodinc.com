import { action, makeObservable, observable } from "mobx";

export class BlogPostStore {
  blogPostList = [];
  blogPost = null;
  skip = 0;
  limit = 3; //12;
  showMore = true;
  sortOrder = "-sys.createdAt";
  tags = [];

  constructor() {
    makeObservable(this, {
      blogPostList: observable,
      blogPost: observable,
      skip: observable,
      limit: observable,
      showMore: observable,
      fetchBlogPostList: action,
      fetchBlogPost: action,
      fetchTags: action,
      setBlogPostAsNull: action,
      sortOrder: observable,
      tags: observable
    });

    this.fetchBlogPostList();
    this.fetchTags();
  }

  fetchTags = async (tags) => {
    const url = `/api/contentful/tags`;
    const response = await fetch(url);
    const data = await response.json();

    this.tags = data.map((item) => {
      return {
        id: item.sys.id,
        name: item.name
      };
    });
  };

  fetchBlogPostList = async () => {
    const url = `/api/contentful/blogPostList/${this.skip}/${this.limit}/${this.sortOrder}`;
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
          createdAt: item.sys.createdAt,
          mainImageId: item.fields.mainImage.sys.id,
          description: item.fields.description
        };
      })
    ];
  };

  fetchBlogPost = async (id) => {
    const url = `/api/contentful/blogPost/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    this.blogPost = {
      id: data.sys.id,
      headline: data.fields.headline,
      createdAt: data.sys.createdAt,
      body: data.fields.blogPostBody,
      mainImageId: data.fields.mainImage.sys.id,
      description: data.fields.description,
      tags: data.metadata.tags.map((tag) => {
        return this.tags.find((item) => item.id === tag.sys.id);
      })
    };
  };

  setBlogPostAsNull = () => {
    this.blogPost = null;
  };
}
