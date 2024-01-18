'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface IProps {
    data?: number[];
}

type D3Selection = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

function barGraph(selection: D3Selection, data: number[]) {
    // const dataset = [5, 25, 45, 65, 85];
    const dataset = data;
    // const div = d3.create('div')
    selection.style('background-color', '#eef')
      .style('padding', '1em')

      selection.selectAll("div")
      .data(dataset)
      .join("div")
      .text(d => d)
      // .style("background-color", (d) => d <= 30 ? 'red' : 'blue')
      .style("background-color", (d, i) => i % 2 ? 'blue' : 'orange')
      .style('margin-bottom', '1px')
      .style('width', d => `${d * 5}px`)
      .style('color', 'white')
      .style('font-family', 'sans-serif')
      .style('text-align', 'right')
      .style('padding-right', '0.5em')
    return selection.node();
  }

/* Component */
export const MyD3Graph = (props: IProps) => {
    const d3Container = useRef(null);

    useEffect(
        () => {
            if (props.data && d3Container.current) {
                const selection = d3.select(d3Container.current);
                barGraph(selection, props.data);
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
        <div
            className="d3-component"
            ref={d3Container}
        />
    );
}
