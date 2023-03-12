import React, { useMemo } from "react";
import propTypes from "prop-types";
import * as d3 from "d3";

import { playingAreaConfig } from "./utils";

function Marker({
  // basics
  brandColor,
  fullPitchView,
  height,
  isLandscape,
  marker,
  markerProps,
  markerShape,
  markerSize,
  width,

  // additionals
  lineFrom,
  showPlayerNames,
  team,
  teamIndex,
  teams
}) {
  let x =
    (fullPitchView
      ? teams.length > 1
        ? width / teams.length
        : width * 0.75
      : width / 2) *
    (marker.x / 100);
  let y = height * ((isLandscape ? marker.y : 100 - marker.y) / 100);

  if (teamIndex > 0) {
    x = width - x;
    y = height - y;
  }

  const markerShapeSwitch = useMemo(() => {
    const defaultMarkerProps = {
      fill: marker.position === "GK" ? "green" : team.brandColor || brandColor,
      stroke: "#fff",
      strokeWidth: 0
    };

    const defaultMarkerPropsWithOverrides = {
      ...defaultMarkerProps,
      ...markerProps
    };

    switch (markerShape) {
      case "square":
        return (
          <rect
            x={isLandscape ? x - markerSize : y - markerSize}
            y={isLandscape ? y - markerSize : x - markerSize}
            width={markerSize * 2}
            height={markerSize * 2}
            {...defaultMarkerPropsWithOverrides}
          />
        );
      case "star":
        return (
          <path
            d={d3
              .symbol()
              .type(d3.symbolStar)
              .size(Math.pow(markerSize, 2) * 2)()}
            transform={`translate(${isLandscape ? x : y}, ${
              isLandscape ? y : x
            })`}
            {...defaultMarkerPropsWithOverrides}
          />
        );
      case "triangle":
        return (
          <path
            d={d3
              .symbol()
              .type(d3.symbolTriangle)
              .size(Math.pow(markerSize, 2) * 2)()}
            transform={`translate(${isLandscape ? x : y}, ${
              isLandscape ? y : x
            })`}
            {...defaultMarkerPropsWithOverrides}
          />
        );
      case "circle":
      default:
        return (
          <circle
            cx={isLandscape ? x : y}
            cy={isLandscape ? y : x}
            r={markerSize}
            {...defaultMarkerPropsWithOverrides}
          />
        );
    }
  }, [
    brandColor,
    markerProps,
    markerShape,
    markerSize,
    marker,
    team,
    isLandscape,
    x,
    y
  ]);

  return (
    <g>
      <g>
        {lineFrom && (
          <g>
            <line
              x1={isLandscape ? x : y}
              y1={isLandscape ? y : x}
              x2={isLandscape ? lineFrom.x : lineFrom.y}
              y2={isLandscape ? lineFrom.y : lineFrom.x}
              stroke={team.brandColor || brandColor}
              strokeWidth={1}
            />
            <circle
              cx={isLandscape ? lineFrom.x : lineFrom.y}
              cy={isLandscape ? lineFrom.y : lineFrom.x}
              r={markerSize / 4}
              fill={team.brandColor || brandColor}
              stroke="#fff"
              strokeWidth={1}
            />
            <text
              x={isLandscape ? (x + lineFrom.x) / 2 : (y + lineFrom.y) / 2}
              y={isLandscape ? (y + lineFrom.y) / 2 : (x + lineFrom.x) / 2}
              dx={0}
              dy={0}
              textAnchor="middle"
              alignmentBaseline="central"
              fontSize={10}
              fill={team.brandColor || brandColor}
              transform={`rotate(${
                isLandscape
                  ? Math.atan((y - lineFrom.y) / (x - lineFrom.x)) *
                    (180 / Math.PI)
                  : Math.atan((x - lineFrom.x) / (y - lineFrom.y)) *
                    (180 / Math.PI)
              }, ${
                isLandscape ? (x + lineFrom.x) / 2 : (y + lineFrom.y) / 2
              }, ${isLandscape ? (y + lineFrom.y) / 2 : (x + lineFrom.x) / 2})`}
            >
              77'
            </text>
          </g>
        )}
        {markerShapeSwitch}
        {marker.number && (
          <text
            x={isLandscape ? x : y}
            y={isLandscape ? y : x}
            dx={0}
            dy={0}
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize={10}
            fill="#fff"
          >
            {marker.number}
          </text>
        )}
      </g>
      {showPlayerNames && (
        <g>
          <text
            x={isLandscape ? x : y}
            y={isLandscape ? y : x}
            dx={0}
            dy={-20}
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize={10}
            fill="#fff"
          >
            {marker.firstName[0]}. {marker.lastName}
          </text>
        </g>
      )}
    </g>
  );
}

Marker.propTypes = {
  // basics
  brandColor: propTypes.string,
  fullPitchView: propTypes.bool,
  height: propTypes.number,
  marker: propTypes.object,
  markerProps: propTypes.object,
  markerShape: propTypes.oneOf(["circle", "square", "star", "triangle"]),
  markerSize: propTypes.number,
  isLandscape: propTypes.bool,
  width: propTypes.number,

  // additionals
  lineFrom: propTypes.shape({
    outcome: propTypes.oneOf(["success", "failure"]),
    text: propTypes.string,
    x: propTypes.number,
    y: propTypes.number
  }),
  showPlayerNames: propTypes.bool,
  team: propTypes.object,
  teamIndex: propTypes.number,
  teams: propTypes.array
};

Marker.defaultProps = {
  // basics
  brandColor: "#000",
  fullPitchView: false,
  height: 0,
  isLandscape: true,
  marker: {},
  markerProps: {},
  markerShape: "circle",
  markerSize: 10,
  width: 0,

  // additionals
  lineFrom: {
    outcome: null,
    text: null,
    x: 0,
    y: 0
  },
  showPlayerNames: false,
  team: {},
  teamIndex: 0,
  teams: []
};

function PlayingArea(props) {
  const {
    brandColor,
    gridColumns,
    gridRows,
    fullPitchView,
    isLandscape,
    dataLayer,
    markers,
    onClick,
    padding,
    showGrid,
    showPlayerNames,
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
      viewBox={`0 0 ${widthWithPadding} ${heightWithPadding}`}
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
        {teams.length > 0 &&
          teams.map((team, teamIndex) => (
            <g key={teamIndex}>
              {team.players.map((player, j) => {
                return (
                  <Marker
                    key={j}
                    fullPitchView={fullPitchView}
                    height={height}
                    isLandscape={isLandscape}
                    marker={player}
                    markerProps={{
                      strokeWidth: 2
                    }}
                    showPlayerNames={showPlayerNames}
                    team={team}
                    teamIndex={teamIndex}
                    teams={teams}
                    width={width}
                  />
                );
              })}
            </g>
          ))}
        {markers.length &&
          markers.map((marker, i) => (
            <Marker
              key={i}
              brandColor={brandColor}
              fullPitchView={fullPitchView}
              height={height}
              isLandscape={isLandscape}
              marker={marker}
              markerShape="square"
              width={width}
              lineFrom={{
                // random x and y
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height)
              }}
            />
          ))}
      </g>
    </svg>
  );
}

PlayingArea.defaultProps = {
  brandColor: "#000",
  dataLayer: {},
  fillColor: null,
  gridColumns: 16,
  gridRows: 12,
  fullPitchView: true,
  isLandscape: true,
  markers: [],
  onClick: () => {},
  padding: 20,
  showGrid: false,
  showPlayerNames: false,
  sport: "soccer",
  strokeColor: null,
  strokeWidth: 2,
  teams: []
};

PlayingArea.propTypes = {
  brandColor: propTypes.string,
  dataLayer: propTypes.object,
  fillColor: propTypes.string,
  gridColumns: propTypes.number,
  gridRows: propTypes.number,
  fullPitchView: propTypes.bool,
  isLandscape: propTypes.bool,
  markers: propTypes.array,
  padding: propTypes.number,
  onClick: propTypes.func,
  showGrid: propTypes.bool,
  showPlayerNames: propTypes.bool,
  sport: propTypes.oneOf(["soccer", "basketball"]),
  strokeColor: propTypes.string,
  strokeWidth: propTypes.number,
  teams: propTypes.array
};

export default PlayingArea;
