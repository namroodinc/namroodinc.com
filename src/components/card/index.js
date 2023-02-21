import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

// create card component which has a title, image, content and footer
const Card = ({ title, image, content, footer }) => {
  return (
    <div className={styles.card}>
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
      </div>
      <div className={styles.cardImage}>{image}</div>
      <div>
        <p className="card__text">{content}</p>
      </div>
      <div className="card__footer">{footer}</div>
    </div>
  );
};

// set prop types
Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  footer: PropTypes.element.isRequired
};

export default Card;
