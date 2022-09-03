import React, { useState } from "react";
import millify from "millify";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Select } from "antd";
import { useGetCryptoDetailsQuery } from "../services/cryptoAPI";
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

const { Title, Text } = Typography;
const { Option } = Typography;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  console.log(data);

  return <div>CryptoDetails: {coinId}</div>;
};

export default CryptoDetails;
