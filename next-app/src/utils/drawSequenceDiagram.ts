import exp from 'constants';
import * as d3 from 'd3';

export type Scene = {
  device: string;
  val: boolean | number;
}

export type Frame = {
  time: number;
  scene: Scene;
}
export type Story = {
  name: string;
  sequence: Array<Frame>;
}

export type DrawPoint<T> = {
  val: T;
  time: number;
}
export type DrawLine<T> = DrawPoint<T>[];


export function getDeviceDrawLine<T>(story: Story, device: string | null = null): DrawLine<T> {
  const drawLine: DrawLine<T> = [];
  let prev: DrawPoint<T> | null = null;

  for (const frame of story.sequence) {
    if (device !== null && frame.scene.device !== device) {
      continue;
    }

    if (prev === null) {
      prev = { val: frame.scene.val as T, time: frame.time };
      drawLine.push(prev);
    } else if (prev.val !== frame.scene.val) {
      prev = { val: prev.val as T, time: frame.time };
      drawLine.push(prev);
      prev = { val: frame.scene.val as T, time: frame.time };
      drawLine.push(prev);
    }
  }

  return drawLine;
}


export function drawSequenceDiagram(
  bg: SVGSVGElement, name: string, story: Story, currentTime: number = 0
): SVGSVGElement | null {
  const root = d3.select(bg);
  const bgRect = bg.getBoundingClientRect();

  // const old = root.selectAll("svg");
  // old.remove();

  const width = bgRect.width;
  const height = bgRect.height < 200 ? 200 : bgRect.height;
  const margin = { top: 10, right: 10, bottom: 20, left: 30 };

  const stMinTime = d3.min(story.sequence, d => d.time) ?? 0;
  const stMaxTime = d3.max(story.sequence, d => d.time) ?? 0;
  const minTime = stMinTime;
  const maxTime = stMaxTime > currentTime ? stMaxTime : currentTime;

  const svg = root.append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)

  // 背景
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#DDD");

  // スケール設定
  const yScale = d3
    .scaleBand()
    .domain(["OFF", "ON"])
    .range([height - margin.bottom, margin.top]);
  const xScale = d3
    .scaleLinear()
    .domain([minTime, maxTime])
    .range([margin.left, width - margin.right])

  // 軸の設定
  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(3)
    .tickSizeOuter(10)
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(3)
    .tickSizeOuter(0);

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis);

  svg
    .append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  // // 時系列データ
  // const path = svg.append("g")
  //   .datum(story.data)
  //   .attr("fill", "none")
  //   .attr("stroke", "steelblue")
  //   .attr("stroke-width", 1.5)
  //   .attr("d

  return svg.node();
}
