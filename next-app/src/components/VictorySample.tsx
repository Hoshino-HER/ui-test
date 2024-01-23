'use client';

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

import { getDeviceDrawLine, Story } from '@/utils/drawSequenceDiagram';

interface IProps {
  story: Story;
}

export default function VictorySample(props: IProps) {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        data={getDeviceDrawLine<boolean>(props.story)}
        x="time"
        y="val"
      />
    </VictoryChart>
  );
}
