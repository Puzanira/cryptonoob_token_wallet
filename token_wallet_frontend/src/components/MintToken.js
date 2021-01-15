import React from 'react';
import InputField from './shards/InputField';
import TransactionTemplate from './shards/TransactionTemplate';

const MintToken = ({ onInputChangeUpdateField, 
                    fields, 
                    mintDetail20,
                    defaultGasLimit,
                    defaultGasPrice,
                    inProgress,
                    closeTransfer,
                    Mint
                }) => (
    <TransactionTemplate
        onInputChangeUpdateField={onInputChangeUpdateField}
        fields={fields}
        defaultGasLimit={defaultGasLimit}
        defaultGasPrice={defaultGasPrice}
        inProgress={inProgress}
        closeTransfer={closeTransfer}
        onProceed={Mint}
        proceedTitle="Mint"
    >
        { mintDetail20 ? (
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="amount" placeholder="Amount To Mint"
                addon={mintDetail20.symbol.toUpperCase()} />
            ) : (
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="metadata" placeholder="Metadata" />
        )}
    </TransactionTemplate>      
)

export default MintToken;
