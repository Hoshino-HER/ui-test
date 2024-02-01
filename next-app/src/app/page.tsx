'use client';
import { Story } from '@/utils/drawSequenceDiagram';
import Example from '@/components/Example';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

const story: Story = {
  name: "Story A",
  sequence: [
    { time: 0, scene: { device: "Lamp-A", val: false } },
    { time: 1000, scene: { device: "Lamp-A", val: true } },
    { time: 2000, scene: { device: "Lamp-A", val: false } }
  ]
};

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '95%', height: '500px', background: 'white' }}>
      Visx Sample
      <ParentSize>{({ width, height }) => <Example compact={false} width={width} height={height} />}</ParentSize>
    </div>
  )
}
