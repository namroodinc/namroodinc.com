import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
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
            image={<Asset imageId={post.mainImageId} />}
            {...post}
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
