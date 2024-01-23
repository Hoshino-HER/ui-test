import { MyD3Graph } from "@/components/d3Graph";
import { Story } from '@/utils/drawSequenceDiagram';
import RechartSample from "@/components/RechartsSample";

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
    <div style={{ width: '100%', height: '250px', backgroundColor: "white" }}>
      Recharts Sample
      <RechartSample story={story}/>
      {/* <MyD3Graph /> */}
      {/* <SequenceDiagram
        name="Device"
        story={{
        }}
      /> */}
    </div>
  )
}
