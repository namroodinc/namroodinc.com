import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";

const BlogPostList = observer(() => {
  const blogPostStore = useStore("blogPostStore");

  return (
    <div className="blog-post-list">
      <button onClick={blogPostStore.fetchBlogPostList}>
        Fetch Blog Post List
      </button>
      {blogPostStore.blogPostList.map((post) => (
        <div className="blog-post" key={post.id}>
          <h3>{post.headline}</h3>
        </div>
      ))}
    </div>
  );
});

BlogPostList.propTypes = {};

BlogPostList.defaultProps = {};

export default BlogPostList;
