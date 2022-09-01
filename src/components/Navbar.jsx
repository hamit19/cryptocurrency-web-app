import React from "react";

import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import logo from "../images/cryptocurrency.png";

const Navbar = () => {
  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/"> Home </Link>,
    },
    {
      key: "cryptocurrencies",
      icon: <FundOutlined />,
      label: <Link to="/cryptocurrencies"> Cryptocurrencies </Link>,
    },
    {
      key: "exchanges",
      icon: <MoneyCollectOutlined />,
      label: <Link to="/exchanges"> Exchanges </Link>,
    },
    {
      key: "news",
      icon: <BulbOutlined />,
      label: <Link to="/news"> News </Link>,
    },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={logo} />
        <Typography.Title level={1} size={"medium"}>
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        {/* <Button className="menu-control-container">

        </Button> */}
      </div>
      <Menu items={menuItems} theme="dark" />
    </div>
  );
};

export default Navbar;
