import * as d3 from 'd3';

type D3Selection = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
interface IScatterData {
  id?: string;
  x: number;
  y: number;
  z: number;
}
type DSVArray = d3.DSVParsedArray<IScatterData>;

export function scatterGraph(bg: HTMLElement, dataset: DSVArray) {
  const [minX, maxX] = d3.extent(dataset, d => d.x);
  const [minY, maxY] = d3.extent(dataset, d => d.y);
  const [minZ, maxZ] = d3.extent(dataset, d => d.z);
  if ([minX, maxX, minY, maxY, minZ, maxZ].some(d => d === undefined)) {
    return;
  }

  const root = d3.select(bg);
  const bgRect = bg.getBoundingClientRect();

  const old = root.selectAll("svg");
  old.remove();

  const width = bgRect.width;
  const height = bgRect.height < 200 ? 200 : bgRect.height;
  const margin = { top: 10, right: 10, bottom: 20, left: 30 };

  const svg = root.append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("color", "black");

  // 背景
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#CFF");

  // スケール設定
  const yScale = d3
    .scaleLinear()
    .domain([minY, maxY])
    .range([height - margin.bottom, margin.top]);
  const xScale = d3
    .scaleLinear()
    .domain([minX, maxX])
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

  svg
    .append('g')
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(0))
    .attr("r", 2)
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr("cy", (d) => yScale(d.y))

  return svg.node();
}

