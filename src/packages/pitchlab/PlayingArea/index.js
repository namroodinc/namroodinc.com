import React, { useMemo } from "react";
import propTypes from "prop-types";
import * as d3 from "d3";

import { PlayerGrouper } from "../Players";
import { playingAreaConfig } from "./utils";

function PlayingArea(props) {
  const {
    fillColor,
    heatMapData,
    isHorizontal,
    padding,
    showGrid,
    sport,
    strokeColor,
    teams
  } = props;

  const strokeWidth = 1;

  const { width, height, playingAreaDecorators, playingAreaHalf } =
    useMemo(() => {
      const { width, height, decorators, half } = playingAreaConfig[sport];
      const playingAreaDecorators = decorators({
        width,
        height,
        strokeWidth,
        strokeColor,
        fillColor
      });
      const playingAreaHalf = half({
        width,
        height,
        strokeWidth,
        strokeColor,
        fillColor
      });
      return { width, height, playingAreaDecorators, playingAreaHalf };
    }, [sport, fillColor, strokeColor]);

  const heightWithPadding = (isHorizontal ? height : width) + padding * 2;
  const widthWithPadding = (isHorizontal ? width : height) + padding * 2;

  const {
    heatMapDataHighestValue,
    heatMapDataLowestValue,
    heatMapNumberOfColumns,
    heatMapNumberOfRows
  } = useMemo(() => {
    if (heatMapData.length) {
      return {
        heatMapDataHighestValue: Math.max(
          ...heatMapData.map((row) => Math.max(...row))
        ),
        heatMapDataLowestValue: Math.min(
          ...heatMapData.map((row) => Math.min(...row))
        ),
        heatMapNumberOfColumns: heatMapData[0]?.length,
        heatMapNumberOfRows: heatMapData.length
      };
    } else {
      return {
        heatMapDataHighestValue: 0,
        heatMapDataLowestValue: 0,
        heatMapNumberOfColumns: 16,
        heatMapNumberOfRows: 12
      };
    }
  }, [heatMapData]);

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
          {playingAreaDecorators}
          <g>{playingAreaHalf}</g>
          <g transform={`translate(${width}, 0) scale(-1, 1)`}>
            {playingAreaHalf}
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
            </g>
          )}
          <g
            transform={
              isHorizontal
                ? ""
                : `translate(0, ${height}) rotate(180) scale(-1, 1)`
            }
          >
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
                      .domain([heatMapDataLowestValue, heatMapDataHighestValue])
                      .range(["rgba(0, 0, 255, 0.05)", "#FFFF00"])(cell)}
                  />
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
      </g>
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

PlayingArea.defaultProps = {
  fillColor: "green",
  heatMapData: [],
  isHorizontal: true,
  padding: 20,
  showGrid: false,
  sport: "soccer",
  strokeColor: "white",
  teams: []
};

PlayingArea.propTypes = {
  fillColor: propTypes.string,
  heatMapData: propTypes.arrayOf(propTypes.array),
  isHorizontal: propTypes.bool,
  padding: propTypes.number,
  showGrid: propTypes.bool,
  sport: propTypes.oneOf(["soccer", "basketball"]),
  strokeColor: propTypes.string,
  teams: propTypes.array
};

export default PlayingArea;
