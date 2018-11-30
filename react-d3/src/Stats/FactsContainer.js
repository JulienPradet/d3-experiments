import { Component } from "react";
import dc from "dc";
import crossfilter from "crossfilter";

class FactsContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  componentDidCatch(error, info) {
    console.error(error);
    console.log(info);
  }

  componentDidMount() {
    dc.renderAll();
  }

  componentDidUpdate() {
    dc.renderAll();
  }

  render() {
    const facts = crossfilter(this.props.data);
    return this.props.children(facts);
  }
}

export default FactsContainer;
