import React, { useState } from "react";
import millify from "millify";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Select } from "antd";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoAPI";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  if (isFetching) return <Loader/>;

  const cryptoDetails = data?.data?.coin;

  const volume = cryptoDetails?.["24hVolume"];

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: cryptoDetails.rank,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: ` ${volume && millify(volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: ` ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: ` ${millify(cryptoDetails.allTimeHigh.price)} `,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: " Approved  Supply ",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-details-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          <span>{cryptoDetails.name}</span> live price in US dollars, View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-time-period"
        placeholder="Select Time period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      <LineChart
        coinName={cryptoDetails.name}
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
      />

      <Col className="stats-container">
        <div className="">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name} </p>
          </Col>
          {stats.map(({ icon, value, title, uuid }) => (
            <Col className="coin-stats" key={uuid}>
              <Col className="coin-stats-name" key={uuid}>
                <Text> {icon} </Text>
                <Text> {title} </Text>
              </Col>
              <Text className="stats"> {value} </Text>
            </Col>
          ))}
        </div>
        <div className="">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name} </p>
          </Col>
          {genericStats.map(({ icon, value, title, uuid }) => (
            <Col className="coin-stats" key={uuid}>
              <Col className="coin-stats-name" key={uuid}>
                <Text> {icon} </Text>
                <Text> {title} </Text>
              </Col>
              <Text className="stats"> {value} </Text>
            </Col>
          ))}
        </div>
      </Col>
      <Col className="coin-desc-links">
        <Row className="coin-desc">
          <Title
            level={3}
            className="coin-details-heading"
            style={{ color: "#164e63" }}
          >
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} targe="_blank" rel="noreferror">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
