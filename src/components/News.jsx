import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptosList } = useGetCryptosQuery(100);

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const demoImage =
    "https://www.journalducameroun.com/en/wp-content/uploads/2022/05/crpto.jpg";

  const { Title, Text } = Typography;
  const { Option } = Select;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            searchValue=""
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionLabelProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexof(input.toLowerCase())
            }
          >
            <Option value="Cryptocurrency"> Cryptocurrency </Option>
            {cryptosList?.data?.coins?.map((crypto) => (
              <Option key={crypto.uuid} value={crypto.name}>
                {" "}
                {crypto.name}{" "}
              </Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews?.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>
                  {news.name}
                </Title>
                <div className="image-wrapper">
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news thumbnail "
                  />
                </div>
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div className="provider-info-wrapper">
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="provider news"
                  />
                  <Text className="provider-name">{news.provider[0].name}</Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
