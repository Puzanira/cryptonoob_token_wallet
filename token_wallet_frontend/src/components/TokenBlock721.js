import React from 'react';

const TokenBlock721 = ({ tokens721, newTransfer721, newApprove721, newMint721 }) => (
    <div className="panel-block is-paddingless is-12">
        <div className="column is-12" id="token-lists">
            {tokens721.map((token, index) => {
                return (
                    <div key={index} className="columns token">
                        <div className="column is-2 has-text-centered">
                            <img alt={token.symbol} src={'icons/' + token.icon} className="token-icon" />
                        </div>
                        <div className="column is-2 is-size-5 is-ellipsis">
                            {token.symbol}
                        </div>
                        <div className="row">
                            <div className="column is-20 is-size-16 is-ellipsis">
                                <div>
                                    ID {token.tokenid}
                                </div>
                                <div className="is-size-20">
                                    {token.metadata}
                                </div>
                            </div>            
                        </div>

                        <div className="column is-1.03 has-text-centered">
                            <button onClick={() => newTransfer721(index)}
                                className="button is-outlined is-small is-danger">
                                    Send
                            </button>
                        </div>
                        <div className="column is-1.03 has-text-centered">
                            <button onClick={() => newApprove721(index)}
                                className="button is-outlined is-small is-danger">
                                    Approve
                            </button>
                        </div>
                        <div className="column is-1.03 has-text-centered">
                            <button onClick={() => newMint721(index)}
                                className="button is-outlined is-small is-danger">
                                    Mint
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
);

export default TokenBlock721;