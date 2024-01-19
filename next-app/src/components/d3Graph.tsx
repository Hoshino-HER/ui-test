'use client';

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
// import { barGraph } from '@/utils/d3Bar';
import { scatterGraph } from '@/utils/d3Scatter';

interface IProps {
  data?: number[];
}

/* Component */
export const MyD3Graph = (props: IProps) => {
  const d3Container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = async () => {
      if (d3Container.current) {

        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRgABhzZkXwZihskMCzNWKcL5lqRwyHRF-bygd7uxZ1rq7DbgcZXpSLClyh9FPJlw_JroNhDK73QUq-/pub?gid=0&single=true&output=tsv";
        const dataset = await d3.tsv(url, d3.autoType)

        scatterGraph(d3Container.current, dataset);
      }
    }
    data();
  }, [props.data])

  return (
    <div
      // width={800}
      // height={800}
      className="d3-component"
      ref={d3Container}
    />
  );
}
