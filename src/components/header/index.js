import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores";

const Header = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <header className="header">
      <h1 className="header__title">{siteStore.siteName}</h1>
    </header>
  );
});

export default Header;
