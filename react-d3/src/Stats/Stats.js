import React, { Component } from "react";
import fetchStats from "./fetchStats";
import FactsContainer from "./FactsContainer";
import Graph from "./Graph";
const d3 = require("d3");

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.unsubscribe = fetchStats().subscribe(data => {
      this.setState({
        data: data.filter(row => row.dataset_id)
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <FactsContainer data={this.state.data}>
        {facts => {
          const volumeByExecutionTime = facts.dimension(row => {
            return row.exec_time;
          });

          const volumeByExecutionTimeGroup = volumeByExecutionTime.group();

          const volumeByDataset = facts.dimension(
            row => (row.dataset_id ? row.dataset_id : "autre")
          );
          const volumeByDatasetGroup = volumeByDataset.group();

          return (
            <div>
              <h2>By hour</h2>
              <Graph
                type="barChart"
                dimension={volumeByExecutionTime}
                group={volumeByExecutionTimeGroup}
                customize={chart =>
                  chart
                    .x(d3.scaleLinear().domain([0, 100]))
                    .y(d3.scaleLinear().domain([0, 6]))
                }
              />

              <h2>By hour</h2>
              <Graph
                type="rowChart"
                dimension={volumeByDataset}
                group={volumeByDatasetGroup}
              />
            </div>
          );
        }}
      </FactsContainer>
    );
  }
}

export default Stats;
