import React from "react";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useStore } from "../../stores";
import Footer from "../footer";
import Header from "../header";

// import styles module
import styles from "./styles.module.scss";

const Layout = observer(() => {
  const siteStore = useStore("siteStore");

  return (
    <div className={styles.layout} data-theme={siteStore.theme}>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
});

export default Layout;
