import { MyD3Graph } from "@/components/d3Graph";
import SequenceDiagram from "@/components/SequenceDiagram";

export default function Home() {
  return (
    <div>
      {/* <MyD3Graph /> */}
      <SequenceDiagram
        name="Device"
        story={{
          name: "Story A",
          sequence: [
            { time: 0, scene: { device: "Lamp-A", val: false } },
            { time: 1000, scene: { device: "Lamp-A", val: true } },
            { time: 2000, scene: { device: "Lamp-A", val: false } }
          ]
        }}
      />
    </div>
  )
}
