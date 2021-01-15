import React from 'react';
import InputField from './shards/InputField';
import TransactionTemplate from './shards/TransactionTemplate';

const TransferToken = ({ onInputChangeUpdateField, 
                    fields, 
                    transferDetail20,
                    defaultGasLimit,
                    defaultGasPrice,
                    inProgress,
                    closeTransfer,
                    Transfer
                }) => (
    <TransactionTemplate
        onInputChangeUpdateField={onInputChangeUpdateField}
        fields={fields}
        defaultGasLimit={defaultGasLimit}
        defaultGasPrice={defaultGasPrice}
        inProgress={inProgress}
        closeTransfer={closeTransfer}
        onProceed={Transfer}
        proceedTitle="Transfer"
    >
        { transferDetail20 ? (
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="amount" placeholder="Amount To Transfer"
                addon={transferDetail20.symbol.toUpperCase()} />
        ) : (
            <>
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="metadata" placeholder="Metadata" />
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="tokenId" placeholder="Token ID" />
            </>
        )}
    </TransactionTemplate>      
)

export default TransferToken;
