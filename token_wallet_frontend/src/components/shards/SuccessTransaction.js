import React from 'react';

const SuccessTransaction = tx => (
    <div className="column is-12 is-ellipsis has-text-centered">
        <div className="notification is-info">
            <button className="delete" />
            <a title={tx} className="is-size-7">{tx}</a>
        </div>
    </div>
);

export default SuccessTransaction;
