import React, { useEffect, useState } from "react";

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
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [activeMobileMenu, setActiveMobileMenu] = useState(true);

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
    // {
    //   key: "exchanges",
    //   icon: <MoneyCollectOutlined />,
    //   label: <Link to="/exchanges"> Exchanges </Link>,
    // },
    {
      key: "news",
      icon: <BulbOutlined />,
      label: <Link to="/news"> News </Link>,
    },
  ];

  useEffect(() => {
    const handleScreenSize = () => setScreenSize(window.innerWidth);

    handleScreenSize();

    window.addEventListener("resize", handleScreenSize);

    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMobileMenu(false);
    } else {
      setActiveMobileMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={logo} />
        <Typography.Title level={1} size={"medium"}>
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        {screenSize < 768 && (
          <Button
            onClick={() => setActiveMobileMenu(!activeMobileMenu)}
            className="menu-control-container"
          >
            <MenuOutlined style={{ color: "#fff" }} />
          </Button>
        )}
      </div>
      {activeMobileMenu && (
        <Menu
          className="mobile-menu"
          onClick={() => {
            screenSize < 768 && setActiveMobileMenu(!activeMobileMenu);
          }}
          items={menuItems}
          theme="dark"
        />
      )}
    </div>
  );
};

export default Navbar;
