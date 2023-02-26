import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useStore } from "../../stores";
import Asset from "../asset";
import Columns from "../columns";

import styles from "./styles.module.scss";

const Page = observer((props) => {
  const pageStore = useStore("pageStore");
  const { page } = pageStore;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <Asset imageId={node.data.target.sys.id} />
      )
    }
  };

  useEffect(() => {
    pageStore.fetchPage(props.id);
  }, [pageStore, props.id]);

  useEffect(() => {
    return () => {
      pageStore.setPageAsNull();
    };
  }, [pageStore]);

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <Columns numberOfColumns={1}>
        <h1>{page.headline}</h1>
        <Asset imageId={page.mainImageId} />
        {documentToReactComponents(page.body, options)}
      </Columns>
    </div>
  );
});

Page.propTypes = {
  id: PropTypes.string.isRequired
};

Page.defaultProps = {
  id: null
};

export default Page;
