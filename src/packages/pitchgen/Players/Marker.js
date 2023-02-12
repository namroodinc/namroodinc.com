import React from "react";

const Marker = (props) => {
  const { ...rest } = props;
  return (
    <g {...rest}>
      <circle cx={0} cy={0} r={5} fill="red" />
    </g>
  );
};

export default Marker;
