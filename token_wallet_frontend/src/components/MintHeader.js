import React from "react";
import Header from "./shards/Header";

const MintHeader = ({ token: { symbol }}) => (
    <Header title={`Mint ${symbol.toUpperCase()}`}
            description={`Only send ${symbol.toUpperCase()} to an Ethereum address.`}
    />
);

export default MintHeader;