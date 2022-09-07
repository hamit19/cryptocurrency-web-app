import React, { useEffect, useState } from "react";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoAPI";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    const filteredCryptosList = cryptosList?.data?.coins.filter((c) =>
      c.name.toLowerCase().includes(searchTerms.toLowerCase())
    );

    setCryptos(filteredCryptosList);
  }, [cryptosList, searchTerms]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search..."
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                className="crypto-card"
                title={` ${currency.rank}. ${currency.name} `}
                extra={
                  <img
                    className="crypto-image"
                    alt="currency icon"
                    src={` ${currency.iconUrl} `}
                  />
                }
                hoverable
              >
                <p>Title: {millify(currency.price)} </p>
                <p>Market Cap: {millify(currency.marketCap)} </p>
                <p>Daily Changes: {millify(currency.change)}% </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
