import * as d3 from 'd3';

type D3Selection = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
interface IScatterData {
  id?: string;
  x: number;
  y: number;
}
type DSVArray = d3.DSVParsedArray<IScatterData>;

export function scatterGraph(root: D3Selection, dataset: DSVArray) {
  const maxX = d3.max(dataset, d => d.x);
  const minX = d3.min(dataset, d => d.x);
  const maxY = d3.max(dataset, d => d.y);
  const minY = d3.min(dataset, d => d.y);
  if (
    maxX === undefined || maxY === undefined
    || minX === undefined || minY === undefined
  ) {
    return;
  }

  const old = root.select("svg");
  old.remove();

  const width = 200;
  const height = 200;
  const margin = { top: 10, right: 10, bottom: 20, left: 30 };

  const svg = root.append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

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
    .call(xAxis);

  svg
    .selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y))
    .attr("r", 2);

  return svg.node();
}

