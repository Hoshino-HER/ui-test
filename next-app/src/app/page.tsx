import { MyD3Graph } from "@/components/d3Graph";
import { Story } from '@/utils/drawSequenceDiagram';
import VictorySample from "@/components/VictorySample";

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
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      Victory Sample
      <div style={{ position: 'absolute', top: '0px', width: '100%', height: '80%' }}>
        <VictorySample story={story} />
      </div>
      <div style={{ position: 'absolute', top: '50px', width: '100%', height: '80%' }}>
        <VictorySample story={story} />
      </div>
    </div>
  )
}
