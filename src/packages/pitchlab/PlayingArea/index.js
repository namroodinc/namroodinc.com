import React, { useMemo } from "react";
import propTypes from "prop-types";
import * as d3 from "d3";

import { playingAreaConfig } from "./utils";

function PlayingArea(props) {
  const {
    gridColumns,
    gridRows,
    fullPitchView,
    isLandscape,
    dataLayer,
    onClick,
    padding,
    showGrid,
    sport,
    strokeWidth,
    teams
  } = props;

  const fillColor = props.fillColor || playingAreaConfig[sport].fillColor;
  const strokeColor = props.strokeColor || playingAreaConfig[sport].strokeColor;

  const { height, width, playingAreaFull, playingAreaHalf } = useMemo(() => {
    const { height, width, full, half } = playingAreaConfig[sport];
    const playingAreaFull = full({
      fillColor,
      height,
      width,
      strokeColor,
      strokeWidth
    });
    const playingAreaHalf = half({
      fillColor,
      fullPitchView,
      height,
      width,
      strokeColor,
      strokeWidth
    });
    return { width, height, playingAreaFull, playingAreaHalf };
  }, [sport, fillColor, fullPitchView, strokeColor, strokeWidth]);

  const heightWithPadding =
    (isLandscape ? height : fullPitchView ? width : width / 2) + padding * 2;
  const widthWithPadding =
    (isLandscape ? (fullPitchView ? width : width / 2) : height) + padding * 2;

  const { dataLayerHighestValue, dataLayerLowestValue } = useMemo(() => {
    if (
      dataLayer?.data?.length &&
      dataLayer?.dataLayerType === "perceivedThreat"
    ) {
      return {
        dataLayerHighestValue: Math.max(
          ...dataLayer.data.map((row) => Math.max(...row))
        ),
        dataLayerLowestValue: Math.min(
          ...dataLayer.data.map((row) => Math.min(...row))
        )
      };
    } else {
      return {
        dataLayerHighestValue: 0,
        dataLayerLowestValue: 0
      };
    }
  }, [dataLayer]);

  return (
    <svg
      height={heightWithPadding}
      width={widthWithPadding}
      onClick={(event) => {
        const x =
          (event.clientX -
            event.target.getBoundingClientRect().left -
            padding) /
          width;
        const y =
          (event.clientY - event.target.getBoundingClientRect().top - padding) /
          height;
        onClick({ x, y });
      }}
    >
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
          <g>{playingAreaHalf}</g>
          {fullPitchView && (
            <>
              <g transform={`translate(${width}, 0) scale(-1, 1)`}>
                {playingAreaHalf}
              </g>
              {playingAreaFull}
            </>
          )}
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
                    strokeWidth={1}
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
                    strokeWidth={1}
                    strokeDasharray="2,2"
                  />
                ))}
              </g>
            </g>
          )}
          {dataLayer.dataLayerType === "heatMap" && (
            <g
              transform={
                isLandscape
                  ? ""
                  : `translate(0, ${height}) rotate(180) scale(-1, 1)`
              }
            >
              {d3
                .contourDensity()
                .x((d) => d.x)
                .y((d) => d.y)
                .size([width, height])
                .bandwidth(playingAreaConfig[sport].heatMapBandwidth || 20)(
                  dataLayer.data.reduce((acc, player) => {
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
          {dataLayer.dataLayerType === "perceivedThreat" && (
            <g
              transform={
                isLandscape
                  ? ""
                  : `translate(0, ${height}) rotate(180) scale(-1, 1)`
              }
            >
              {dataLayer.data.map((row, i) =>
                row.map((cell, j) => (
                  <g key={`${i}-${j}`}>
                    <rect
                      x={j * (width / gridColumns)}
                      y={i * (height / gridRows)}
                      width={width / gridColumns}
                      height={height / gridRows}
                      fill={d3
                        .scaleLinear()
                        .domain([dataLayerLowestValue, dataLayerHighestValue])
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
          <g key={i}>
            {team.players.map((player, j) => {
              let x =
                (fullPitchView ? width / teams.length : width / 2) *
                (player.x / 100);
              let y =
                height * ((isLandscape ? player.y : 100 - player.y) / 100);

              if (i > 0) {
                x = width - x;
                y = height - y;
              }

              return (
                <g key={j}>
                  <circle
                    cx={isLandscape ? x : y}
                    cy={isLandscape ? y : x}
                    r={10}
                    fill={team.brandColor}
                  />
                  <text
                    x={isLandscape ? x : y}
                    y={isLandscape ? y : x}
                    fontSize={10}
                    fill="#fff"
                    alignmentBaseline="bottom"
                    textAnchor="middle"
                  >
                    {player.lastName}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
}

PlayingArea.defaultProps = {
  dataLayer: {},
  fillColor: null,
  gridColumns: 16,
  gridRows: 12,
  fullPitchView: true,
  isLandscape: true,
  onClick: () => {},
  padding: 20,
  showGrid: false,
  sport: "soccer",
  strokeColor: null,
  strokeWidth: 2,
  teams: []
};

PlayingArea.propTypes = {
  dataLayer: propTypes.object,
  fillColor: propTypes.string,
  gridColumns: propTypes.number,
  gridRows: propTypes.number,
  fullPitchView: propTypes.bool,
  isLandscape: propTypes.bool,
  padding: propTypes.number,
  onClick: propTypes.func,
  showGrid: propTypes.bool,
  sport: propTypes.oneOf(["soccer", "basketball"]),
  strokeColor: propTypes.string,
  strokeWidth: propTypes.number,
  teams: propTypes.array
};

export default PlayingArea;
