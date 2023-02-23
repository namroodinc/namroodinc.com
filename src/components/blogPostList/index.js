import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Link } from "react-router-dom";
import Asset from "../asset";
import Card from "../card";
import Button from "../button";

const BlogPostList = observer(() => {
  const blogPostStore = useStore("blogPostStore");

  return (
    <div className="blog-post-list">
      {blogPostStore.blogPostList.map((post) => {
        return (
          <Card
            key={post.id}
            title={post.headline}
            image={<Asset imageId={post.mainImageId} />}
            footer={<Link to={`/post/${post.id}`}>Read More</Link>}
          />
        );
      })}
      {blogPostStore.showMore && (
        <Button
          fullWidth
          label="Fetch Blog Post List"
          onClick={blogPostStore.fetchBlogPostList}
        />
      )}
    </div>
  );
});

BlogPostList.propTypes = {};

BlogPostList.defaultProps = {};

export default BlogPostList;
