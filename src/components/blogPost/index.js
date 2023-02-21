import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useStore } from "../../stores";
import { useParams } from "react-router-dom";

const BlogPost = observer(() => {
  const assetsStore = useStore("assetsStore");
  const blogPostStore = useStore("blogPostStore");
  const { blogPost } = blogPostStore;
  const { id } = useParams();

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const image = assetsStore.assets.find(
          (asset) => asset.id === node.data.target.sys.id
        );
        return image && <img src={image.url} alt={blogPost.headline} />;
      }
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

  const mainImage = assetsStore.assets.find(
    (asset) => asset.id === blogPost.mainImageId
  );

  console.log(mainImage);

  return (
    <div className="BlogPost">
      {mainImage && (
        <img src={`${mainImage.url}?w=500`} alt={blogPost.headline} />
      )}
      <h1>{blogPost.headline}</h1>
      {documentToReactComponents(blogPost.body, options)}
    </div>
  );
});

BlogPost.propTypes = {};

BlogPost.defaultProps = {};

export default BlogPost;
