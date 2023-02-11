import React, { useRef } from "react";
import * as d3 from "d3";

export const SoccerPitch = ({ height = 480, padding = 0, width = 720 }) => {
  const ref = useRef();
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
        stroke="white"
        strokeWidth={strokeWidth}
      />
      <rect
        x={0}
        y={height / 2 - height * 0.275}
        width={width * 0.15}
        height={height * 0.55}
        fill="none"
        stroke="white"
        strokeWidth={strokeWidth}
      />
      <rect
        x={0}
        y={height / 2 - height * 0.125}
        width={width * 0.05}
        height={height * 0.25}
        fill="none"
        stroke="white"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={width * 0.1}
        cy={height / 2}
        r={width * 0.0025}
        fill="none"
        stroke="white"
        strokeWidth={strokeWidth}
      />
    </>
  );

  const heightWithPadding = height + padding * 2;
  const widthWithPadding = width + padding * 2;

  return (
    <svg height={heightWithPadding} width={widthWithPadding} ref={ref}>
      <g>
        <rect
          x={0}
          y={0}
          width={widthWithPadding}
          height={heightWithPadding}
          fill="green"
        />
      </g>
      <g transform={`translate(${padding}, ${padding})`}>
        <g>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
          />
          <line
            x1={width / 2}
            y1={0}
            x2={width / 2}
            y2={height}
            stroke="white"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={width * 0.0833}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={width / 2}
            cy={height / 2}
            r={width * 0.0025}
            fill="white"
            stroke="white"
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
            stroke="white"
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
            stroke="white"
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
            stroke="white"
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
            stroke="white"
            strokeWidth={strokeWidth}
          />
        </g>
      </g>
    </svg>
  );
};
