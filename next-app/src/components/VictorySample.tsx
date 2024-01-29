'use client';

import { VictoryChart, VictoryAxis, VictoryContainer, VictoryLine, VictoryTheme } from "victory";

import { getDeviceDrawLine, Story } from '@/utils/drawSequenceDiagram';

interface IProps {
  story: Story;
}

export default function VictorySample(props: IProps) {
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ y: 30 }}
      containerComponent={<VictoryContainer
        responsive={false}
      />}
    >
      <VictoryAxis
        dependentAxis
      />
      <VictoryAxis
        domain={[0, 2100]}
      />
      <VictoryLine
        data={getDeviceDrawLine<boolean>(props.story)}
        x="time"
        y="val"
        style={{
          data: {
            stroke: "#c43a31",
            strokeWidth: 2
          }
        }}
        categories={{
          y: ["true", "false"]
        }}
      />
    </VictoryChart>
  );
}
