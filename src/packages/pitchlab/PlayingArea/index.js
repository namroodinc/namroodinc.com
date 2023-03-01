import React, { useMemo } from "react";
import propTypes from "prop-types";
import * as d3 from "d3";

import { PlayerGrouper } from "../Players";
import { playingAreaConfig } from "./utils";

function PlayingArea(props) {
  const {
    fillColor,
    gridColumns,
    gridRows,
    isLandscape,
    mapLayerData,
    mapLayerType,
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

  const heightWithPadding = (isLandscape ? height : width) + padding * 2;
  const widthWithPadding = (isLandscape ? width : height) + padding * 2;

  const { mapLayerDataHighestValue, mapLayerDataLowestValue } = useMemo(() => {
    if (mapLayerData.length && mapLayerType === "perceivedThreat") {
      return {
        mapLayerDataHighestValue: Math.max(
          ...mapLayerData.map((row) => Math.max(...row))
        ),
        mapLayerDataLowestValue: Math.min(
          ...mapLayerData.map((row) => Math.min(...row))
        )
      };
    } else {
      return {
        mapLayerDataHighestValue: 0,
        mapLayerDataLowestValue: 0
      };
    }
  }, [mapLayerData, mapLayerType]);

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
          isLandscape
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
                {d3.range(0, width, width / gridColumns).map((x, i) => (
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
                {d3.range(0, height, height / gridRows).map((y, i) => (
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
          {mapLayerType === "heatMap" && (
            <g
              transform={
                isLandscape
                  ? ""
                  : `translate(0, ${height}) rotate(180) scale(-1, 1)`
              }
            >
              {/* create a 2d density map using the x and y co-ordinates */}
              {d3
                .contourDensity()
                .x((d) => d.x)
                .y((d) => d.y)
                .size([width, height])
                .bandwidth(20)(
                  mapLayerData.reduce((acc, player) => {
                    if (player.x && player.y) {
                      acc.push({
                        x: width * (player.x / 100),
                        y: height * (player.y / 100)
                      });
                    }
                    return acc;
                  }, [])
                )
                .map((contour, i) => (
                  <path
                    key={i}
                    d={d3.geoPath()(contour)}
                    fill={d3
                      .scaleLinear()
                      .domain([0, 1])
                      .range(["rgba(0, 0, 255, 0.05)", "#FFFF00", "#FF0000"])(
                      contour.value
                    )}
                  />
                ))}
            </g>
          )}
          {mapLayerType === "perceivedThreat" && (
            <g
              transform={
                isLandscape
                  ? ""
                  : `translate(0, ${height}) rotate(180) scale(-1, 1)`
              }
            >
              {mapLayerData.map((row, i) =>
                row.map((cell, j) => (
                  <g key={`${i}-${j}`}>
                    <rect
                      x={j * (width / gridColumns)}
                      y={i * (height / gridRows)}
                      width={width / gridColumns}
                      height={height / gridRows}
                      fill={d3
                        .scaleLinear()
                        .domain([
                          mapLayerDataLowestValue,
                          mapLayerDataHighestValue
                        ])
                        .range(["rgba(0, 0, 255, 0.05)", "#FFFF00"])(cell)}
                    />
                    <text
                      x={j * (width / gridColumns)}
                      y={i * (height / gridRows)}
                      dx={width / gridColumns / 2}
                      dy={height / gridRows / 2}
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
          )}
        </g>
      </g>
      <g transform={`translate(${padding}, ${padding})`}>
        {teams.map((team, i) => (
          <PlayerGrouper
            key={i}
            height={height}
            isLandscape={isLandscape}
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
  gridColumns: 16,
  gridRows: 12,
  isLandscape: true,
  mapLayerData: [],
  mapLayerType: "heatMap",
  padding: 20,
  showGrid: false,
  sport: "soccer",
  strokeColor: "white",
  teams: []
};

PlayingArea.propTypes = {
  fillColor: propTypes.string,
  gridColumns: propTypes.number,
  gridRows: propTypes.number,
  isLandscape: propTypes.bool,
  mapLayerData: propTypes.array,
  mapLayerType: propTypes.oneOf(["heatMap", "perceivedThreat"]),
  padding: propTypes.number,
  showGrid: propTypes.bool,
  sport: propTypes.oneOf(["soccer", "basketball"]),
  strokeColor: propTypes.string,
  teams: propTypes.array
};

export default PlayingArea;
