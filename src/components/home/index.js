import React from "react";
import BlogPostList from "../blogPostList";

import styles from "./styles.module.scss";

const Home = (props) => {
  return (
    <div className={styles.home}>
      <BlogPostList />
    </div>
  );
};

export default Home;
