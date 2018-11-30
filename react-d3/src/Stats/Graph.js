import React, { Component } from "react";
import dc from "dc";

class Graph extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentDidMount() {
    const chart = dc[this.props.type](this.graphContainer);
    chart
      .width(500)
      .height(200)
      .dimension(this.props.dimension)
      .group(this.props.group);

    if (typeof this.props.customize === "function") {
      this.props.customize(chart);
    }
  }

  render() {
    return <div ref={ref => (this.graphContainer = ref)} />;
  }
}

export default Graph;
