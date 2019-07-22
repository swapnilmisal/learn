import React from "react";
import { connect } from "react-redux";
import Chart from "react-google-charts";

function Card(props) {
  let state = props.state.map(data => {
    return [new Date(data.time), data.usd];
  });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Chart
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[["y", "$"], ...state]}
        options={{
          hAxis: {
            title: "Time"
          },
          vAxis: {
            title: "Value $"
          }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}
const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Card);
