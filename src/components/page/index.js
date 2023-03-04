import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import { useStore } from "../../stores";

import ContentDisplay from "../contentDisplay";

const Page = observer((props) => {
  const pageStore = useStore("pageStore");
  const { page } = pageStore;

  useEffect(() => {
    pageStore.fetchPage(props.id);
  }, [pageStore, props.id]);

  useEffect(() => {
    return () => {
      pageStore.setPageAsNull();
    };
  }, [pageStore]);

  if (!page) {
    return <div>Loading...</div>;
  }

  return <ContentDisplay {...page} />;
});

Page.propTypes = {
  id: PropTypes.string.isRequired
};

Page.defaultProps = {
  id: null
};

export default Page;
