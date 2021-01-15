import React from "react";
import Header from "./shards/Header";

const ApproveHeader = ({ token: { symbol }}) => (
    <Header 
        title={`Approve ${symbol.toUpperCase()}`}
        description={`Approve an Ethereum address to send ${symbol.toUpperCase()} from your address.`}
    />
);

export default ApproveHeader;