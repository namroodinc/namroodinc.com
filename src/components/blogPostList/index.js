import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import Asset from "../asset";
import Card from "../card";
import Button from "../button";
import Columns from "../columns";

const BlogPostList = observer(() => {
  const blogPostStore = useStore("blogPostStore");

  return (
    <Columns numberOfColumns={1}>
      <Columns>
        {blogPostStore.blogPostList.map((post) => {
          return (
            <Card
              key={post.id}
              image={<Asset imageId={post.mainImageId} />}
              {...post}
            />
          );
        })}
      </Columns>
      {blogPostStore.showMore && (
        <Button
          fullWidth
          label="Fetch Blog Post List"
          onClick={blogPostStore.fetchBlogPostList}
        />
      )}
    </Columns>
  );
});

BlogPostList.propTypes = {};

BlogPostList.defaultProps = {};

export default BlogPostList;
