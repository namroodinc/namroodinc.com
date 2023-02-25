import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useParams } from "react-router-dom";

import { useStore } from "../../stores";
import Asset from "../asset";
import Columns from "../columns";
import Button from "../button";

import styles from "./styles.module.scss";

const BlogPost = observer(() => {
  const blogPostStore = useStore("blogPostStore");
  const { blogPost } = blogPostStore;
  const { id } = useParams();

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <Asset imageId={node.data.target.sys.id} />
      )
    }
  };

  useEffect(() => {
    blogPostStore.fetchBlogPost(id);
  }, [blogPostStore, id]);

  useEffect(() => {
    return () => {
      blogPostStore.setBlogPostAsNull();
    };
  }, [blogPostStore]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.blogPost}>
      <Columns numberOfColumns={1}>
        <h1>{blogPost.headline}</h1>
        <span className={styles.blogPostDateTime}>{blogPost.createdAt}</span>
        <Asset imageId={blogPost.mainImageId} />
        {documentToReactComponents(blogPost.body, options)}
        {blogPost.tags.length > 0 && (
          <div className={styles.tags}>
            <h6>Tags</h6>
            {blogPost.tags.map((tag) => {
              return (
                <Button
                  buttonType="link"
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  to={`/posts/${tag.id}`}
                />
              );
            })}
          </div>
        )}
      </Columns>
    </div>
  );
});

BlogPost.propTypes = {};

BlogPost.defaultProps = {};

export default BlogPost;
