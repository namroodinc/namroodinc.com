import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Link } from "react-router-dom";

const BlogPostList = observer(() => {
  const blogPostStore = useStore("blogPostStore");

  return (
    <div className="blog-post-list">
      {blogPostStore.showMore && (
        <button onClick={blogPostStore.fetchBlogPostList}>
          Fetch Blog Post List
        </button>
      )}
      {blogPostStore.blogPostList.map((post) => (
        <div className="blog-post" key={post.id}>
          {/* <img src={post.image.url} alt={post.headline} /> */}
          <h3>
            <Link to={`/post/${post.id}`}>{post.headline}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
});

BlogPostList.propTypes = {};

BlogPostList.defaultProps = {};

export default BlogPostList;
