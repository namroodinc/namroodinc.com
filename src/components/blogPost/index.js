import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../stores";

const BlogPost = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <div className="BlogPost">
      <h2>{siteStore.siteName}</h2>
      <p>Hey, I am a post.</p>
    </div>
  );
});

BlogPost.propTypes = {};

BlogPost.defaultProps = {};

export default BlogPost;
