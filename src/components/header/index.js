import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import Button from "../button";

const Header = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <header className={styles.header}>
      <h1 className="header__title">
        <Link to="/">{siteStore.siteName}</Link>
      </h1>

      <Button
        label={siteStore.theme === "light" ? "🌙" : "☀️"}
        onClick={() =>
          siteStore.setTheme(siteStore.theme === "light" ? "dark" : "light")
        }
      />
    </header>
  );
});

export default Header;
