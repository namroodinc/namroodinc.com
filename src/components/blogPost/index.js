import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useStore } from "../../stores";
import { useParams } from "react-router-dom";
import Asset from "../asset";

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
    <div className="BlogPost">
      <Asset imageId={blogPost.mainImageId} />
      <h1>{blogPost.headline}</h1>
      {documentToReactComponents(blogPost.body, options)}
    </div>
  );
});

BlogPost.propTypes = {};

BlogPost.defaultProps = {};

export default BlogPost;
