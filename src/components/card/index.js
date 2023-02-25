import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import Button from "../button";
import Columns from "../columns";

const Card = ({
  createdAt,
  description,
  headline,
  id,
  image,
  showReadMore
}) => {
  return (
    <div className={styles.card}>
      <Columns numberOfColumns={1} gap="lg">
        {image && (
          <div className={styles.cardImage}>
            <Link to={`/post/${id}`}>{image}</Link>
          </div>
        )}
        {headline && (
          <div className={styles.cardHeadline}>
            <h3>
              <Link to={`/post/${id}`}>{headline}</Link>
            </h3>
          </div>
        )}
        <span className={styles.cardDescription}>
          {createdAt}
          {description && (
            <>
              <br />
              {description}
            </>
          )}
        </span>
        {showReadMore && (
          <div className={styles.cardFooter}>
            <Button buttonType="link" label="Read More" to={`/post/${id}`} />
          </div>
        )}
      </Columns>
    </div>
  );
};

Card.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.element,
  content: PropTypes.element,
  showReadMore: PropTypes.bool
};

Card.defaultProps = {
  description: null,
  image: null,
  content: null,
  showReadMore: true
};

export default Card;
