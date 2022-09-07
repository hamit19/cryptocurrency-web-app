import React from "react";
import { useGetExchangesQuery } from "../services/cryptoAPI";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  console.log(data?.data);

  return <div>Exchanges</div>;
};

export default Exchanges;
