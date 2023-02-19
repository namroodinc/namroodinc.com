import React from "react";
// import propTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";

const Post = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <div className="post">
      <h2>{siteStore.siteName}</h2>
    </div>
  );
});

Post.propTypes = {};

Post.defaultProps = {};

export default Post;
