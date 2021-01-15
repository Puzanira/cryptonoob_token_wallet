import React from 'react';

const AddressBar = ({ tx, account }) => (
    <p className={tx ? "is-hidden" : "panel-heading has-text-centered is-clipped is-size-7"}>
        ETH Account:
        <strong>{account}</strong>
    </p>
);

export default AddressBar;
