import { select, selectAll } from "d3-selection";
import { json } from "d3-fetch";
import {
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
  forceCenter
} from "d3-force";

const size = 500;
const radius = 10;

const displayCollection = (data, node) => {
  const collectionSvg = node
    .append("div")
    .attr("width", size)
    .attr("height", size);

  const collection = {
    x: size / 2,
    y: size / 2,
    r: 10
  };

  const nodes = data.map(element => {
    const radiusPosition = (Math.sqrt(Math.random()) * size) / 2;
    const theta = Math.random() * 2 * Math.PI;

    return {
      r: radius,
      x: Math.round(size / 2 + radiusPosition * Math.cos(theta)),
      y: Math.round(size / 2 + radiusPosition * Math.sin(theta))
    };
  });

  function handleOeuvreHover(d, index) {
    select(this).attr("r", radius * 2);
    console.log(data[index].info);
  }

  const oeuvres = collectionSvg
    .append("svg")
    .attr("width", size)
    .attr("height", size)
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", d => d.r)
    .attr("fill", "red")
    .on("mouseover", handleOeuvreHover);
  // .on("mouseout", handleMouseOut);

  const simulation = forceSimulation(nodes)
    .velocityDecay(0.2)
    .force("x", forceX().strength(0.01))
    .force("y", forceY().strength(0.01))
    .force("center", forceCenter(size / 2, size / 2))
    .force(
      "collide",
      forceCollide()
        .radius(d => d.r + 5)
        .iterations(2)
    )
    .on("tick", ticked);

  function ticked() {
    oeuvres.attr("cx", d => Math.round(d.x)).attr("cy", d => Math.round(d.y));
  }
};

export default displayCollection;
