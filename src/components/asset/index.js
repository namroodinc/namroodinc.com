import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import { useStore } from "../../stores";

const Asset = observer(({ imageId, width }) => {
  const assetsStore = useStore("assetsStore");
  const image = assetsStore.assets.find((asset) => asset.id === imageId);
  return (
    image && (
      <img
        src={`${image.file.url}?w=${width}`}
        alt={image.description}
        title={image.description}
      />
    )
  );
});

Asset.propTypes = {
  imageId: PropTypes.string,
  width: PropTypes.number
};

Asset.defaultProps = {
  imageId: "",
  width: 500
};

export default Asset;
