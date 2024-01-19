'use client';

import React, { useRef, useState, useEffect } from 'react';
import { drawSequenceDiagram, Story } from '@/utils/drawSequenceDiagram';

interface IProps {
  name: string;
  story: Story;
}

export default function SequenceDiagram(props: IProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
      if (ref.current) {
        const width = ref.current.parentElement?.getBoundingClientRect().width ?? 0;
        const height = ref.current.parentElement?.getBoundingClientRect().height ?? 0;
        setWidth(width < 100 ? 100 : width);
        setHeight(height < 500 ? 500 : height);
        // console.log(`parentElement: ${ref.current.parentElement}`)
        // console.log(`parentRect: ${ref.current.parentElement?.getBoundingClientRect()}`)
        console.log(`SVG: width: ${width}, height: ${height}`);
        const d3Node = () => {
          if (ref.current) {
            drawSequenceDiagram(ref.current, props.name, props.story);
          }
        }
        d3Node();
      }
    },
    [props.name, props.story]
  )

  return (
    <svg
      width={width}
      height={height}
      className="d3-component"
      ref={ref}
    />
  );
}
