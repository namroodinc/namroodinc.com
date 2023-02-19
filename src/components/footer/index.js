import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";

const Footer = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <footer className="footer">
      <p className="footer__text">{siteStore.siteName}</p>
      <ul>
        <li>
          <a href={`${siteStore.linkedIn}`} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={`${siteStore.github}`} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={`${siteStore.twitter}`} target="_blank" rel="noreferrer">
            Twitter
          </a>
        </li>
        <li>
          <a href={`mailto:${siteStore.email}`}>Email</a>
        </li>
      </ul>
    </footer>
  );
});

export default Footer;
