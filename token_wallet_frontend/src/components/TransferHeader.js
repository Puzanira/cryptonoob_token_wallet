import React from "react";
import Header from "./shards/Header";

const TransferHeader = ({ token: { symbol }}) => (
    <Header title={`Send ${symbol.toUpperCase()}`}
            description={`Only send ${symbol.toUpperCase()} to an Ethereum address.`}
    />
);

export default TransferHeader;