'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { barGraph } from '@/utils/d3Bar';

interface IProps {
  data?: number[];
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
