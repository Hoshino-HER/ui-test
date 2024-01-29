import { Story } from '@/utils/drawSequenceDiagram';
import { scaleLinear } from '@visx/scale';
import { Axis, AxisLeft } from '@visx/axis';
import { Text } from '@visx/text';
import { scaleBand } from '@visx/scale';
import { LinePath, Line } from '@visx/shape';
import { curveLinear } from '@visx/curve';

import { getDeviceDrawLine } from '@/utils/drawSequenceDiagram';


interface IProps extends React.SVGProps<SVGSVGElement> {
  story?: Story;
}

const yScale = scaleBand({
  range: [0, 100],
  domain: ["false", "true"],
})

const xScale = scaleLinear({
  range: [60, 260],
  round: true,
  domain: [0, 2500]
})

const axisLeftProps = {
  left: 60,
  top: 0,
  hideTicks: false,
  numTicks: 2,
  scale: yScale,
  label: "Value",
  rangePadding: 10
};

const axisBottomProps = {
  left: 0,
  top: 0,
  hideTicks: false,
  numTicks: 6,
  scale: xScale,
  label: "Time [ms]",
  rangePadding: 10
};

export default function VisxSample(props: IProps) {
  const explain = JSON.stringify(props, null, 2).split('\n');
  const lineData = props.story ? getDeviceDrawLine<boolean>(props.story) : [];
  const drawData = lineData.map(d => { return { x: d.time, y: yScale(d.val.toString()) } });

  return <>
    <AxisLeft {...axisLeftProps} />
    <Axis {...axisBottomProps} />
    <LinePath
      data={ lineData }
      // data={[{x: 0, y: 50}, {x: 400, y: 50}, {x: 400, y: 100}, {x: 0, y: 100}]}
      x={ d => xScale(d.time) ?? 0 }
      y={ d => yScale(d.val.toString()) ?? 0 }
      curve={ curveLinear }
      fill="transparent" stroke="red" strokeWidth="2"
    />
    {lineData.map((line, i) =>
      <Text
        fontSize={6}
        // key={i} x={ line.search(/\S|$/) * 5} y={i * 7 + 50} 
        key={i} x={0} y={i * 7 + 80}
        width={100} height={100} verticalAnchor="start">
        {`${line.time} ${line.val} ${yScale(line.val.toString())}`}
      </Text>)}
  </>;
}
