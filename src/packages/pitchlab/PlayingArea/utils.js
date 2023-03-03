import * as d3 from "d3";

export const playingAreaConfig = {
  soccer: {
    width: 720, // a soccer pitch is 120 yards long
    height: 480, // a soccer pitch is 80 yards wide
    padding: 20,
    full: ({ fillColor, height, strokeColor, strokeWidth, width }) => (
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
    ),
    half: ({
      fillColor,
      fullPitchView,
      height,
      strokeColor,
      strokeWidth,
      width
    }) => (
      <>
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
            startAngle: 0,
            endAngle: Math.PI / 2
          })}
          transform={`translate(0, ${height})`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
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
        {!fullPitchView && (
          <g>
            <rect
              x={0}
              y={0}
              width={width / 2}
              height={height}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d={d3.arc()({
                innerRadius: 0,
                outerRadius: width * 0.0833,
                startAngle: 0,
                endAngle: -Math.PI
              })}
              transform={`translate(${width / 2}, ${height / 2})`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <path
              d={d3.arc()({
                innerRadius: 0,
                outerRadius: width * 0.0025,
                startAngle: 0,
                endAngle: -Math.PI
              })}
              transform={`translate(${width / 2}, ${height / 2})`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </g>
        )}
      </>
    )
  },
  basketball: {
    width: 720, // a basketball court is 30.62 yards long
    height: 384, // a basketball court is 16.4 yards wide
    padding: 20,
    full: ({ fillColor, height, strokeColor, strokeWidth, width }) => (
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
    ),
    half: ({
      fillColor,
      fullPitchView,
      height,
      strokeColor,
      strokeWidth,
      width
    }) => (
      <>
        <g>
          {!fullPitchView && (
            <rect
              x={0}
              y={0}
              width={width / 2}
              height={height}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          )}
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
            transform={`translate(${width * 0.2067}, ${
              height / 2
            }) scale(-1, 1)`}
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
              innerRadius: width * 0.24,
              outerRadius: width * 0.24,
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
            x2={width * 0.106}
            y2={height * 0.06}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <line
            x1={0}
            y1={height - height * 0.06}
            x2={width * 0.106}
            y2={height - height * 0.06}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </g>
        <g>
          <path
            d={d3.arc()({
              innerRadius: 0,
              outerRadius: height * 0.1285,
              startAngle: 0,
              endAngle: -Math.PI
            })}
            transform={`translate(${width / 2}, ${height / 2})`}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </g>
      </>
    )
  }
};
