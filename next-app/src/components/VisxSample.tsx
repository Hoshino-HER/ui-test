'use client';
import { Story } from '@/utils/drawSequenceDiagram';
import { scaleLinear } from '@visx/scale';
import { Axis, AxisLeft } from '@visx/axis';
import { Text } from '@visx/text';
import { scaleBand } from '@visx/scale';
import { LinePath, Line } from '@visx/shape';
import { curveLinear } from '@visx/curve';
import { ParentSize } from '@visx/responsive';
import { GridColumns, GridRows } from '@visx/grid';
import { Zoom } from '@visx/zoom';
// import { RectClipPath } from '@visx/clip-path';
import { ProvidedZoom } from '@visx/zoom/lib/types';
import { getDeviceDrawLine } from '@/utils/drawSequenceDiagram';


export interface IPropsVisxSample extends React.SVGProps<SVGSVGElement> {
  story?: Story;
}

interface IPropsVisxSampleClient extends IPropsVisxSample {
  width: number;
  height: number;
  zoom: ProvidedZoom<SVGSVGElement>;
}

const yScale = scaleBand({
  range: [20, 100],
  domain: ["true", "false"],
  round: false,
  padding: 0.2,
})

const xScale = scaleLinear({
  range: [60, 260],
  round: true,
  domain: [0, 2500]
})

const axisLeftProps = {
  left: 60,
  top: (0 - ((yScale.bandwidth() ?? 0) / 2)),
  hideTicks: false,
  numTicks: 2,
  scale: yScale,
  label: "Value",
  rangePadding: 10,
};

const axisBottomProps = {
  left: 0,
  top: 90,
  hideTicks: false,
  numTicks: 6,
  scale: xScale,
  label: "Time [ms]",
  tickLength: 5,
  rangePadding: 50,
};

const gridColumnProps = {
  left: 0,
  top: 0,
  stroke: '#e0e0e0',
  rangePadding: 10,
  scale: xScale,
  numTicks: 6,
  round: true,
}

const gridRowsProps = {
  left: 60,
  top: (0 - ((yScale.bandwidth() ?? 0) / 2)),
  stroke: '#e0e0e0',
  rangePadding: 10,
  tickValues: yScale.domain().map(d => d ?? 'false'),
  scale: yScale
}

const initialTransform = {
  scaleX: 1.27,
  scaleY: 1.27,
  translateX: 12,
  translateY: -13,
  skewX: 0,
  skewY: 0,
};

export default function VisxSample(props: IPropsVisxSample) {
  return <ParentSize>
    {({ width, height }) => {
      return (<div className='absolute'>
        <Zoom<SVGSVGElement>
          width={width} height={height}
          scaleXMin={1} scaleXMax={2} scaleYMin={1} scaleYMax={10}
          initialTransformMatrix={initialTransform}
        >
          {zoom => {
            return (<>
              {/* <RectClipPath id="zoom-clip" width={width} height={height} /> */}
              <svg ref={zoom.containerRef}>
                <g transform={zoom.toString()}>
                  <VisxSampleClient
                    {...props} width={width} height={height} zoom={zoom}
                  />
                </g>
              </svg>
              {`zoom: ${zoom.toString()}`}
            </>)
          }}
        </Zoom>
      </div>)
    }}
  </ParentSize>
}

function VisxSampleClient(props: IPropsVisxSampleClient) {
  const lineData = props.story ? getDeviceDrawLine<boolean>(props.story) : [];

  return (
    <g>
      <GridColumns
        width={props.width} height={props.height}
        {...gridColumnProps}
      />
      <GridRows
        width={props.width} height={props.height}
        {...gridRowsProps}
      />
      <AxisLeft {...axisLeftProps} />
      <Axis {...axisBottomProps} />
      <LinePath
        data={lineData}
        // data={[{x: 0, y: 50}, {x: 400, y: 50}, {x: 400, y: 100}, {x: 0, y: 100}]}
        x={d => xScale(d.time) ?? 0}
        y={d => yScale(d.val.toString()) ?? 0}
        curve={curveLinear}
        fill="transparent" stroke="red" strokeWidth="2"
      />
      {lineData.map((line, i) =>
        <Text
          fontSize={6}
          // key={i} x={ line.search(/\S|$/) * 5} y={i * 7 + 50} 
          key={i} x={0} y={i * 7 + 80}
          width={300} height={100} verticalAnchor="start">
          {`${line.time} ${line.val} ${yScale(line.val.toString())?.toFixed(1)}`}
        </Text>
      )}
      <Text
        fontSize={20}
        // key={i} x={ line.search(/\S|$/) * 5} y={i * 7 + 50} 
        x="10" y="5"
        width={200} height={100} verticalAnchor="start"
        stroke='red' fill='red'
      >
        {`yScale: ${yScale.bandwidth().toFixed(1)}, ${yScale.step().toFixed(1)}`}
      </Text>
    </g>
  );
}
