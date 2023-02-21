import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";
import { Link } from "react-router-dom";

const Header = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/">{siteStore.siteName}</Link>
      </h1>

      <button
        className="header__theme-toggle"
        onClick={() => {
          siteStore.setTheme(siteStore.theme === "light" ? "dark" : "light");
        }}
      >
        {siteStore.theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
});

export default Header;
