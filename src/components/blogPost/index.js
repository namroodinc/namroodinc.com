import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useStore } from "../../stores";
import { useParams } from "react-router-dom";

const BlogPost = observer(() => {
  const blogPostStore = useStore("blogPostStore");
  const { blogPost } = blogPostStore;
  const { id } = useParams();

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
      <h1>{blogPost.headline}</h1>
      {documentToReactComponents(blogPost.body)}
      <img src={`${blogPost.image.url}?w=500`} alt={blogPost.headline} />
    </div>
  );
});

BlogPost.propTypes = {};

BlogPost.defaultProps = {};

export default BlogPost;
