'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface IProps {
  data?: number[];
}

type D3Selection = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

function barGraph(root: D3Selection, data: number[]) {

  const old = root.select("svg");
  old.remove();

  const width = 400;
  const height = 100;

  const svg = root.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, 100, 100]);

  svg
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 20)
    .attr("fill", "yellow")
    .attr("stroke", "orange")
    .attr("stroke-width", 2);
  return svg.node();
}

/* Component */
export const MyD3Graph = (props: IProps) => {
  const d3Container = useRef(null);

  useEffect(
    () => {
      if (props.data && d3Container.current) {
        const root = d3.select(d3Container.current);
        barGraph(root, props.data);
      }
    },

    /*
        useEffect has a dependency array (below). It's a list of dependency
        variables for this useEffect block. The block will run after mount
        and whenever any of these variables change. We still have to check
        if the variables are valid, but we do not have to compare old props
        to next props to decide whether to rerender.
    */
    [props.data, d3Container.current])

  return (
    <svg
      className="d3-component"
      width={400}
      height={200}
      ref={d3Container}
    />
  );
}
