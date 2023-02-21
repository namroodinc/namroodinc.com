import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Link } from "react-router-dom";

const BlogPostList = observer(() => {
  const assetsStore = useStore("assetsStore");
  const blogPostStore = useStore("blogPostStore");

  return (
    <div className="blog-post-list">
      {blogPostStore.showMore && (
        <button onClick={blogPostStore.fetchBlogPostList}>
          Fetch Blog Post List
        </button>
      )}
      {blogPostStore.blogPostList.map((post) => {
        const mainImage = assetsStore.assets.find(
          (asset) => asset.id === post.mainImageId
        );
        return (
          <div className="blog-post" key={post.id}>
            {mainImage && (
              <img src={`${mainImage.url}?w=500`} alt={post.headline} />
            )}
            <h3>
              <Link to={`/post/${post.id}`}>{post.headline}</Link>
            </h3>
          </div>
        );
      })}
    </div>
  );
});

BlogPostList.propTypes = {};

BlogPostList.defaultProps = {};

export default BlogPostList;
