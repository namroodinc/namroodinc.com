import React from "react";

import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Asset from "../asset";
import Button from "../button";
import Columns from "../columns";

import styles from "./styles.module.scss";

const ContentDisplay = (content) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <Asset imageId={node.data.target.sys.id} />
      )
    }
  };

  return (
    <main role="main" className={styles.contentDisplay}>
      <Columns numberOfColumns={1}>
        <h1>{content.headline}</h1>
        <span className={styles.contentDateTime}>{content.createdAt}</span>
        <Asset imageId={content.mainImageId} />
        {documentToReactComponents(content.body, options)}
        {content.tags?.length > 0 && (
          <div className={styles.tags}>
            <h6>Tags</h6>
            {content.tags.map((tag) => {
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
    </main>
  );
};

export default ContentDisplay;
