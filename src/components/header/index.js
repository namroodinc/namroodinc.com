import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";
import Button from "../button";

import { ReactComponent as SunIcon } from "../../icons/sun.svg";
import { ReactComponent as CrescentIcon } from "../../icons/crescent.svg";

const Header = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <header className={styles.header}>
      <h1 className="header__title">
        <Link to="/">{siteStore.siteName}</Link>
      </h1>

      <Button
        icon={siteStore.theme === "light" ? <CrescentIcon /> : <SunIcon />}
        label={siteStore.theme === "light" ? "Dark mode" : "Light mode"}
        onClick={() =>
          siteStore.setTheme(siteStore.theme === "light" ? "dark" : "light")
        }
      />
    </header>
  );
});

export default Header;
