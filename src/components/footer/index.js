import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";

import styles from "./styles.module.scss";
import Button from "../button";

const Footer = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        <h6>Socials</h6>
        <Button
          buttonType="anchor"
          to={`${siteStore.linkedIn}`}
          label="LinkedIn"
          size="small"
          target="_blank"
          rel="noreferrer"
        />
        <Button
          buttonType="anchor"
          to={`${siteStore.github}`}
          label="GitHub"
          size="small"
          target="_blank"
          rel="noreferrer"
        />
        <Button
          buttonType="anchor"
          to={`${siteStore.twitter}`}
          label="Twitter"
          size="small"
          target="_blank"
          rel="noreferrer"
        />
        <Button
          buttonType="anchor"
          to={`mailto:${siteStore.email}`}
          label="Email"
          size="small"
        />
      </div>
    </footer>
  );
});

export default Footer;
