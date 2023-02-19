import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useStore } from "../../stores";
import { useParams } from "react-router-dom";

const BlogPost = observer((props) => {
  const blogPostStore = useStore("blogPostStore");
  const { blogPost } = blogPostStore;
  const { id } = useParams();

  useEffect(() => {
    blogPostStore.fetchBlogPost(id);
  }, [blogPostStore, id]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="BlogPost">
      <h1>{blogPost.headline}</h1>
      {documentToReactComponents(blogPost.body)}
    </div>
  );
});

BlogPost.propTypes = {};

BlogPost.defaultProps = {};

export default BlogPost;
