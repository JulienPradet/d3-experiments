import { active } from "d3-transition";
import { interpolateNumber } from "d3-interpolate";

function incrementTo(number, node) {
  return node
    .transition()
    .duration(1000)
    .on("start", function() {
      active(this).tween("text", function() {
        const i = interpolateNumber(node.text(), number);
        return function(t) {
          node.text(Math.round(i(t)));
        };
      });
    });
}

export default incrementTo;
