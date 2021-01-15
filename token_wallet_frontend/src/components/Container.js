import React from 'react';

import AddressBar from './shards/AddressBar';
import SortTokenBlock from './shards/SortTokenBlock';
import SuccessTransaction from './shards/SuccessTransaction';

import TokenBlock20 from './TokenBlock20';
import TokenBlock721 from './TokenBlock721';
import TransferHeader from './TransferHeader';
import TransferToken from './TransferToken';
import MintHeader from './MintHeader';
import MintToken from './MintToken';
import ApproveHeader from './ApproveHeader';
import ApproveToken from './ApproveToken';


const Container = ({ 
    tx20,
    tx721,
    tokens20,
    tokens721,

    account,
    fields,
    closeTransfer,
    inProgress,
    defaultGasLimit,
    defaultGasPrice,
    onInputChangeUpdateField,

    transferDetail20,
    transferDetail721,
    Transfer,
    mintDetail20,
    mintDetail721,
    Mint,
    approveDetail20,
    approveDetail721,
    Approve,

    newApprove20,
    newApprove721,
    newMint20,
    newMint721,
    newTransfer20,
    newTransfer721
}) => {
    const defaultPropsPack = {
        closeTransfer,
        fields,
        account,
        inProgress,
        defaultGasPrice,
        defaultGasLimit,
        onInputChangeUpdateField,
    };

    return (
        <section className="container">
            <div className="columns">
                <div className="is-half column">
                    <div className="panel is-multiline">
                        {tx20 ? <SuccessTransaction tx={tx20} /> : ''}

                        <AddressBar account={account} tx={tx20} />

                        {transferDetail20 && (
                            <div>
                                <TransferHeader token={transferDetail20} />
                                <TransferToken 
                                    transferDetail20={transferDetail20}
                                    Transfer={Transfer}
                                    {...defaultPropsPack}
                                />    
                            </div>
                        )}

                        {mintDetail20 && (
                            <div>
                                <MintHeader token={mintDetail20} />
                                <MintToken 
                                    mintDetail20={mintDetail20}
                                    Mint={Mint}
                                    {...defaultPropsPack}
                                />    
                            </div>
                        )}

                        {approveDetail20 && (
                            <div>
                                <ApproveHeader token={approveDetail20} />
                                <ApproveToken 
                                    approveDetail20={approveDetail20}
                                    Approve={Approve}
                                    {...defaultPropsPack}
                                />    
                            </div>
                        )}

                        {!(transferDetail20 || mintDetail20 || approveDetail20) && (
                            <div className={tx20 ? "is-hidden" : ''}>
                                <SortTokenBlock />
                                <TokenBlock20
                                    tokens20={tokens20}
                                    newTransfer20={newTransfer20} 
                                    newMint20={newMint20} 
                                    newApprove20={newApprove20}
                                />
                            </div>        
                        )}
                    </div>
                </div>

                <div className="is-half is-offset-one-half column">
                    <div className="panel is-multiline">
                        {tx721 ? <SuccessTransaction tx={tx721} /> : ''}

                        <AddressBar account={account} tx={tx721} />

                        {transferDetail721 && (
                            <div>
                                <TransferHeader token={transferDetail721} />
                                <TransferToken 
                                    transferDetail721={transferDetail721}
                                    Transfer={Transfer}
                                    {...defaultPropsPack}
                                />    
                            </div>
                        )}

                        {mintDetail721 && (
                            <div>
                                <MintHeader token={mintDetail721} />
                                <MintToken 
                                    mintDetail721={mintDetail721}
                                    Mint={Mint}
                                    {...defaultPropsPack}
                                />    
                            </div>
                        )}

                        {approveDetail721 && (
                            <div>
                                <ApproveHeader token={approveDetail721} />
                                <ApproveToken 
                                    approveDetail721={approveDetail721}
                                    Approve={Approve}
                                    {...defaultPropsPack}
                                />    
                            </div>
                        )}

                        {!(transferDetail721 || mintDetail721 || approveDetail721) && (
                            <div className={tx721 ? "is-hidden" : ''}>
                                <SortTokenBlock />
                                <TokenBlock721
                                    tokens721={tokens721}
                                    newTransfer721={newTransfer721} 
                                    newMint721={newMint721} 
                                    newApprove721={newApprove721}
                                />
                            </div>        
                        )}
                    </div>
                </div>
            </div>        
        </section>
    );
};

export default Container;
