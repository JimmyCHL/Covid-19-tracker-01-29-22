import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import Chart from "chart.js/auto";
import { styled } from "@mui/material/styles";

//https://disease.sh/v3/covid-19/historical/all?lastdays=120
const LineGraph = ({ casesType }) => {
  console.log(casesType);
  const [data, setData] = useState([]);

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
      // console.log(date);
      if (lastDataPoint || lastDataPoint === 0) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    console.log(chartData);
    return chartData;
  };

  // The following code is for old version react-chart
  // const options = {
  //   legend: {
  //     display: false,
  //   },
  //   elements: {
  //     points: {
  //       radius: 0,
  //     },
  //   },
  //   maintainAspectRatio: false,
  //   tooltips: {
  //     mode: "index",
  //     intersect: false,
  //     callbacks: {
  //       label: function (tooltipItem, data) {
  //         return numeral(tooltipItem.value).format("+0,0");
  //       },
  //     },
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         type: "time",
  //         time: {
  //           format: "MM/DD/YY",
  //           tooltipFormat: "ll",
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //         },
  //         ticks: {
  //           //Include a dollar sign in the ticks
  //           callback: function (value, index, values) {
  //             return numeral(value).format("0a");
  //           },
  //         },
  //       },
  //     ],
  //   },
  // };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        //clever stuff here
        console.log(data);
        const chartData = buildChartData(data, casesType);
        console.log(chartData);
        setData(chartData);
      });
  }, [casesType]);

  return (
    <Container style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {data.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.2)",
                fill: true,
                borderColor: casesType === "recovered" ? "green" : "#CC1034",
                data: data,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "covid - cases last 120 days",
              },
              tooltips: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                  },
                },
              },
            },
            scales: {
              y: {
                grid: {
                  display: false,
                },
                min: 0,
                ticks: {
                  callback: function (value, index, values) {
                    return numeral(value).format("0a");
                  },
                },
              },
            },
          }}
        />
      )}
    </Container>
  );
};

export default LineGraph;

const Container = styled("div")`
  canvas {
    flex: 1;
  }
`;
