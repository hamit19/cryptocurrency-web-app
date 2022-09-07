import React from "react";
import { Line } from "react-chartjs-2";
import { Typography, Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function LineChart({ coinName, coinHistory, currentPrice }) {
  const cionPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history.length; i++) {
    cionPrice.push(coinHistory.data.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: cionPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#075985",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: "linear",
        position: "left",
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-changes">
            {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>

      {coinHistory?.data?.history ? (
        <Line data={data} options={options} />
      ) : (
        <Loader />
      )}
    </>
  );
}

export default LineChart;
