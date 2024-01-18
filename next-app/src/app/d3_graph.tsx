'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface IProps {
  data?: number[];
}

type D3Selection = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

function barGraph(root: D3Selection, dataset: Array<number>) {

  const maxnum = d3.max(dataset);
  if (maxnum === undefined) {
    return;
  }

  const old = root.select("svg");
  old.remove();

  const width = 400;
  const height = 100;
  const barPadding = 1;
  const margin = { top: 8, right: 8, bottom: 8, left: 8 };

  const svg = root.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  // 背景
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#AFF");

  // 棒グラフ
  const rects = svg.append('g').selectAll('rect.bar')
    .data(dataset)
    .join('rect')
    .attr("class", "bar");

  // スケール設定
  const yScale = d3
    .scaleLinear()
    .domain([0, maxnum])
    .range([height - margin.bottom, margin.top]);
  const xScale = d3
    .scaleBand()
    .domain(dataset)
    .range([margin.left, width - margin.right])
    .padding(0.1);

  rects
    .attr('x', xScale)
    .attr('y', yScale)
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(0) - yScale(d))
    .attr('fill', d => `hsl(220, 50%, ${60 - (d / maxnum) * 40}%)`)
    .on("mouseenter", function (event) {
      d3.select(this).attr("fill", "yellow");
    })
    .on("mouseleave", function (event) {
      d3.select(this).attr("fill", (d) => `hsl(220, 50%, ${60 - (d / maxnum) * 40}%)`);
    });

  svg
    .selectAll('text')
    .data(dataset)
    .join('text')
    .attr(
      'x',
      (d) =>
        xScale(d) + xScale.bandwidth() / 2
    )
    .attr('y', (d) => yScale(d) + 13)
    .attr('font-family', 'sans-serif')
    .attr('font-size', 11)
    .attr('font-weight', 'bold')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .text(d => d);

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
      if (d3Container.current) {
        const dataset = d3.shuffle(d3.range(40, 200, 10));
        const root = d3.select(d3Container.current);
        barGraph(root, dataset);
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
