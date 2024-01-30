import { Story } from '@/utils/drawSequenceDiagram';
import VisxSample from "@/components/VisxSample";

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
    <div style={{ position: 'relative', width: '100%', height: '300px', background: 'white' }}>
      Visx Sample
      <VisxSample story={story} />
    </div>
  )
}
