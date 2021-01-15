import React from 'react';

const InstallMetamask = () => (
    <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-content">
            <p className="image download-metamask">
                <a href="https://metamask.io" rel="noopener noreferrer" target="_blank">
                    <img src="/icons/metamask.png" alt="" />
                </a>
            </p>
        </div>
        <button className="modal-close is-large" aria-label="close" />
    </div>
);

export default InstallMetamask;