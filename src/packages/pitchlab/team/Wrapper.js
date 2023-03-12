import React from "react";
import { Link } from "react-router-dom";
// import propTypes from "prop-types";

import styles from "./styles.module.scss";

const TeamWrapper = (props) => {
  const linkTo = `/packages/pitchlab/${props.sport}/team/${props.teamId}`;
  return (
    <div className={styles.teamWrapper}>
      <div className={styles.teamWrapperHeader}>
        <Link to={linkTo}>
          <img
            src={props.logo}
            alt={`${props.fullName} logo`}
            title={`${props.fullName} logo`}
          />
        </Link>
        <Link to={linkTo}>{props.fullName}</Link>
      </div>
      <div className={styles.teamWrapperContent}>{props.children}</div>
    </div>
  );
};

TeamWrapper.propTypes = {};

TeamWrapper.defaultProps = {};

export default TeamWrapper;
