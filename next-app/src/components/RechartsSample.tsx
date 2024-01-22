'use client';

import { LineChart, Line, XAxis, YAxis, Label, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { getDeviceDrawLine, Story } from '@/utils/drawSequenceDiagram';

interface IProps {
  story: Story;
}

const data = [
  {
    name: "false",
    time: 0
  },
  {
    name: "true",
    time: 1000
  },
  {
    name: "false",
    time: 2000
  }
];
export default function RechartSample(props: IProps) {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100}
        data={getDeviceDrawLine<boolean>(props.story)}
        // data={data}
      >
        <Line type="linear" dataKey="time" stroke="#8884d8" strokeWidth={2} />
        <YAxis dataKey="time">
          <Label value={props.story.name}></Label>
        </YAxis>
        <XAxis dataKey="val" />
      </LineChart>
    </ResponsiveContainer>
  );
}
