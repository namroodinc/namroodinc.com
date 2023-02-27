import React from "react";
import propTypes from "prop-types";
import * as d3 from "d3";
import { PlayerGrouper } from "../Players";

// SoccerPitch is a React component that renders a soccer pitch.
// The pitch is 120 yards long and 80 yards wide. The default width and height for the React component are 720px and 480px, respectively.

function SoccerPitch(props) {
  const {
    fillColor,
    heatMapData,
    heatMapDataHighestValue,
    heatMapDataLowestValue,
    heatMapNumberOfColumns,
    heatMapNumberOfRows,
    height,
    isHorizontal,
    padding,
    showGrid,
    strokeColor,
    teams,
    width
  } = props;

  const strokeWidth = 1;

  const half = (
    <>
      <path
        d={d3.arc()({
          innerRadius: 0,
          outerRadius: width * 0.0833,
          startAngle: 0,
          endAngle: Math.PI / 1
        })}
        transform={`translate(${width * 0.1}, ${height / 2})`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <rect
        x={0}
        y={height / 2 - height * 0.275}
        width={width * 0.15}
        height={height * 0.55}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        id="rect"
      />
      <rect
        x={0}
        y={height / 2 - height * 0.125}
        width={width * 0.05}
        height={height * 0.25}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={width * 0.1}
        cy={height / 2}
        r={width * 0.0025}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
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
              r={width * 0.0833}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={width / 2}
              cy={height / 2}
              r={width * 0.0025}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </g>
          <g>{half}</g>
          <g transform={`translate(${width}, 0) scale(-1, 1)`}>{half}</g>
          <g>
            <path
              d={d3.arc()({
                innerRadius: 0,
                outerRadius: width * 0.00833,
                startAngle: Math.PI / 2,
                endAngle: Math.PI
              })}
              transform={`translate(0, 0)`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d={d3.arc()({
                innerRadius: 0,
                outerRadius: width * 0.00833,
                startAngle: Math.PI,
                endAngle: Math.PI * 1.5
              })}
              transform={`translate(${width}, 0)`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d={d3.arc()({
                innerRadius: 0,
                outerRadius: width * 0.00833,
                startAngle: Math.PI * 1.5,
                endAngle: Math.PI * 2
              })}
              transform={`translate(${width}, ${height})`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d={d3.arc()({
                innerRadius: 0,
                outerRadius: width * 0.00833,
                startAngle: 0,
                endAngle: Math.PI / 2
              })}
              transform={`translate(0, ${height})`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </g>
          {showGrid && (
            <g>
              <g>
                {d3
                  .range(0, width, width / heatMapNumberOfColumns)
                  .map((x, i) => (
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
                {d3
                  .range(0, height, height / heatMapNumberOfRows)
                  .map((y, i) => (
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
              {/* <g>
                {d3
                  .range(0, width, width / heatMapNumberOfColumns)
                  .map((x, i) =>
                    d3
                      .range(0, height, height / heatMapNumberOfRows)
                      .map((y, j) => (
                        <rect
                          key={`${i}-${j}`}
                          x={x}
                          y={y}
                          width={width / heatMapNumberOfColumns}
                          height={height / heatMapNumberOfRows}
                          fill={
                            ["red", "green", "blue", "yellow"][
                              Math.floor(Math.random() * 4)
                            ]
                          }
                        />
                      ))
                  )}
              </g> */}
              <g>
                {heatMapData.map((row, i) =>
                  row.map((cell, j) => (
                    <g key={`${i}-${j}`}>
                      <rect
                        x={j * (width / heatMapNumberOfColumns)}
                        y={i * (height / heatMapNumberOfRows)}
                        width={width / heatMapNumberOfColumns}
                        height={height / heatMapNumberOfRows}
                        fill={d3
                          .scaleLinear()
                          .domain([
                            heatMapDataLowestValue,
                            heatMapDataHighestValue
                          ])
                          .range(["rgba(0, 0, 255, 0.05)", "#FFFF00"])(cell)}
                      />
                      {/* also have the value text horizontally/vertically positioned above the above rectangle */}
                      <text
                        x={j * (width / heatMapNumberOfColumns)}
                        y={i * (height / heatMapNumberOfRows)}
                        dx={width / heatMapNumberOfColumns / 2}
                        dy={height / heatMapNumberOfRows / 2}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        fontSize={10}
                        fill="#000"
                      >
                        {cell}%
                      </text>
                    </g>
                  ))
                )}
              </g>
            </g>
          )}
        </g>
      </g>
      {/* players layer */}
      <g transform={`translate(${padding}, ${padding})`}>
        {teams.map((team, i) => (
          <PlayerGrouper
            key={i}
            height={height}
            isHorizontal={isHorizontal}
            padding={padding}
            width={width / teams.length}
            index={i}
            {...team}
          />
        ))}
      </g>
    </svg>
  );
}

SoccerPitch.defaultProps = {
  fillColor: "green",
  heatMapData: [],
  heatMapDataHighestValue: 1,
  heatMapDataLowestValue: 0,
  heatMapNumberOfColumns: 16,
  heatMapNumberOfRows: 12,
  height: 480, // a soccer pitch is 80 yards wide
  isHorizontal: true,
  padding: 20,
  showGrid: false,
  strokeColor: "white",
  teams: [],
  width: 720 // a soccer pitch is 120 yards long
};

SoccerPitch.propTypes = {
  fillColor: propTypes.string,
  heatMapData: propTypes.arrayOf(propTypes.array),
  heatMapDataHighestValue: propTypes.number,
  heatMapDataLowestValue: propTypes.number,
  heatMapNumberOfColumns: propTypes.number,
  heatMapNumberOfRows: propTypes.number,
  height: propTypes.number,
  isHorizontal: propTypes.bool,
  padding: propTypes.number,
  showGrid: propTypes.bool,
  strokeColor: propTypes.string,
  teams: propTypes.array,
  width: propTypes.number
};

export default SoccerPitch;
