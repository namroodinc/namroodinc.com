import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// import styles from "./styles.module.scss";

const Svg = ({ width = 120, height = 80 }) => {
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);

    const strokeWidth = 1;

    svgElement
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "green")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", width * 0.0833)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("line")
      .attr("x1", width / 2)
      .attr("y1", 0)
      .attr("x2", width / 2)
      .attr("y2", height)
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("rect")
      .attr("x", 0)
      .attr("y", height / 2 - height * 0.275)
      .attr("width", width * 0.15)
      .attr("height", height * 0.55)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("rect")
      .attr("x", 0)
      .attr("y", height / 2 - height * 0.125)
      .attr("width", width * 0.05)
      .attr("height", height * 0.25)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("rect")
      .attr("x", width - width * 0.15)
      .attr("y", height / 2 - height * 0.275)
      .attr("width", width * 0.15)
      .attr("height", height * 0.55)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("rect")
      .attr("x", width - width * 0.05)
      .attr("y", height / 2 - height * 0.125)
      .attr("width", width * 0.05)
      .attr("height", height * 0.25)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("circle")
      .attr("cx", width * 0.1)
      .attr("cy", height / 2)
      .attr("r", width * 0.0025)
      .attr("fill", "white")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("path")
      .attr(
        "d",
        d3.arc()({
          innerRadius: 0,
          outerRadius: width * 0.0833,
          startAngle: 0,
          endAngle: Math.PI / 1
        })
      )
      .attr("transform", `translate(${width * 0.1}, ${height / 2})`)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("circle")
      .attr("cx", width * 0.9)
      .attr("cy", height / 2)
      .attr("r", width * 0.0025)
      .attr("fill", "white")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", width * 0.0025)
      .attr("fill", "white")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", width * 0.0025)
      .attr("fill", "white")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("path")
      .attr(
        "d",
        d3.arc()({
          innerRadius: 0,
          outerRadius: width * 0.00833,
          startAngle: Math.PI / 2,
          endAngle: Math.PI
        })
      )
      .attr("transform", `translate(0, 0)`)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("path")
      .attr(
        "d",
        d3.arc()({
          innerRadius: 0,
          outerRadius: width * 0.00833,
          startAngle: Math.PI,
          endAngle: Math.PI * 1.5
        })
      )
      .attr("transform", `translate(${width}, 0)`)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("path")
      .attr(
        "d",
        d3.arc()({
          innerRadius: 0,
          outerRadius: width * 0.00833,
          startAngle: Math.PI * 1.5,
          endAngle: Math.PI * 2
        })
      )
      .attr("transform", `translate(${width}, ${height})`)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);

    svgElement
      .append("path")
      .attr(
        "d",
        d3.arc()({
          innerRadius: 0,
          outerRadius: width * 0.00833,
          startAngle: 0,
          endAngle: Math.PI / 2
        })
      )
      .attr("transform", `translate(0, ${height})`)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", strokeWidth);
  }, [height, width]);

  return <svg height={height} width={width} ref={ref} />;
};

export default function PitchGen() {
  return (
    <>
      <Svg width={360} height={240} />
      <Svg width={720} height={480} />
    </>
  );
}
