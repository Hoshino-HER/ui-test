import * as d3 from 'd3';

type D3Selection = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

export function barGraph(root: D3Selection, dataset: Array<number>) {

  const maxnum = d3.max(dataset);
  if (maxnum === undefined) {
    return;
  }

  const old = root.select("svg");
  old.remove();

  const width = 400;
  const height = 200;
  const margin = { top: 10, right: 10, bottom: 20, left: 30 };

  const svg = root.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  // 背景
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#AFF");

  // スケール設定
  const yScale = d3
    .scaleLinear()
    .domain([0, maxnum])
    .range([height - margin.bottom, margin.top]);
  const xScale = d3
    .scaleBand()
    .domain(dataset.map((d, i) => d.toString()))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  // 軸の設定
  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickSizeOuter(10)
    .tickFormat((d, i) => `${i + 1}番`);
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-width + margin.left + margin.right)
    .tickSizeOuter(0);

  // 棒グラフ
  const rects = svg.append('g')
    .selectAll('rect.bar')
    .data(dataset)
    .join('rect')
    .attr("class", "bar")

  rects
    .attr('x',
      (d) => xScale(d.toString()) ?? 0
    )
    .attr('y', yScale)
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(0) - yScale(d))
    .attr('fill', d => `hsl(220, 50%, ${60 - (d / maxnum) * 40}%)`)
    .on("mouseenter", function (event) {
      d3.select(this).attr("fill", "yellow");
    })
    .on("mouseleave", (event, d: number) => {
      d3.select(event.currentTarget)
        .attr(
          "fill",
          `hsl(220, 50%, ${60 - (d / maxnum) * 40}%)`
        );
    });

  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis);

  svg
    .append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

  svg
    .append('g')
    .selectAll('text')
    .data(dataset)
    .join('text')
    .attr(
      'x',
      (d) =>
        (xScale(d.toString()) ?? 0) + xScale.bandwidth() / 2
    )
    .attr('y', (d) => yScale(d) + 13)
    .attr('font-family', 'sans-serif')
    .attr('font-size', 11)
    .attr('font-weight', 'bold')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .text(d => d);

  svg
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 20)
    .attr("fill", "yellow")
    .attr("stroke", "orange")
    .attr("stroke-width", 2);

  return svg.node();
}
