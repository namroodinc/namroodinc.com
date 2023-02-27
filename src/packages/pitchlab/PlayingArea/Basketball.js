import React from "react";
import propTypes from "prop-types";
import * as d3 from "d3";

// BasketballCourt is a React component that renders a basketball court.
// The court is 30.62 yards long and 16.4 yards wide.
// The ratio of the width to the height is 0.5333.

function BasketballCourt(props) {
  const {
    fillColor,
    height,
    isHorizontal,
    padding,
    showGrid,
    strokeColor,
    width
  } = props;

  const strokeWidth = 2;

  const half = (
    <>
      <g>
        <rect
          x={0}
          y={height * 0.34}
          width={width * 0.2067}
          height={height * 0.32}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          id="rect"
        />
        <rect
          x={0}
          y={height / 2 - height * 0.1285}
          width={width * 0.2067}
          height={height * 0.257}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      <g>
        <path
          d={d3.arc()({
            innerRadius: width * 0.04464,
            outerRadius: width * 0.04464,
            startAngle: 0,
            endAngle: Math.PI / 1
          })}
          transform={`translate(${width * 0.05625}, ${height / 2})`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={width * 0.05625}
          cy={height / 2}
          r={height * 0.0152}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <rect
          x={width * 0.0325}
          y={height / 2 - height * 0.06}
          width={width * 0.0075}
          height={height * 0.1201}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <line
          x1={width * 0.05}
          y1={height / 2}
          x2={width * 0.0325 + width * 0.0075}
          y2={height / 2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      <g>
        <path
          d={d3.arc()({
            innerRadius: height * 0.1285,
            outerRadius: height * 0.1285,
            startAngle: 0,
            endAngle: Math.PI / 1
          })}
          transform={`translate(${width * 0.2067}, ${height / 2}) scale(-1, 1)`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray="10, 10"
        />
        <path
          d={d3.arc()({
            innerRadius: height * 0.1285,
            outerRadius: height * 0.1285,
            startAngle: 0,
            endAngle: Math.PI / 1
          })}
          transform={`translate(${width * 0.2067}, ${height / 2})`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
      <g>
        <path
          d={d3.arc()({
            innerRadius: width * 0.24107,
            outerRadius: width * 0.24107,
            startAngle: Math.PI / 15,
            endAngle: (14 * Math.PI) / 15
          })}
          transform={`translate(${width * 0.05625}, ${height / 2})`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <line
          x1={0}
          y1={height * 0.06}
          x2={width * 0.11}
          y2={height * 0.06}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <line
          x1={0}
          y1={height - height * 0.06}
          x2={width * 0.11}
          y2={height - height * 0.06}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
    </>
  );

  const heightWithPadding = (isHorizontal ? height : width) + padding * 2;
  const widthWithPadding = (isHorizontal ? width : height) + padding * 2;

  return (
    <svg height={heightWithPadding} width={widthWithPadding}>
      <g>
        <rect
          x={0}
          y={0}
          width={widthWithPadding}
          height={heightWithPadding}
          fill={fillColor}
        />
      </g>
      {showGrid && (
        <g>
          {d3.range(0, width, width / 15).map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={0}
              x2={x}
              y2={height}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray="2,2"
            />
          ))}
          {d3.range(0, height, height / 10).map((y, i) => (
            <line
              key={i}
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray="2,2"
            />
          ))}
        </g>
      )}
      <g
        transform={
          isHorizontal
            ? `translate(0, 0)`
            : `translate(0, 0) rotate(90) scale(1, -1)`
        }
      >
        <g transform={`translate(${padding}, ${padding})`}>
          <g>
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <line
              x1={width / 2}
              y1={0}
              x2={width / 2}
              y2={height}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={width / 2}
              cy={height / 2}
              r={height * 0.1285}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </g>
          <g>{half}</g>
          <g transform={`translate(${width}, 0) scale(-1, 1)`}>{half}</g>
        </g>
      </g>
    </svg>
  );
}

BasketballCourt.defaultProps = {
  fillColor: "blue",
  height: 384, // a basketball court is 16.4 yards wide
  isHorizontal: true,
  padding: 20,
  showGrid: false,
  strokeColor: "white",
  width: 720 // a basketball court is 30.62 yards long
};

BasketballCourt.propTypes = {
  fillColor: propTypes.string,
  height: propTypes.number,
  isHorizontal: propTypes.bool,
  padding: propTypes.number,
  showGrid: propTypes.bool,
  strokeColor: propTypes.string,
  width: propTypes.number
};

export default BasketballCourt;
