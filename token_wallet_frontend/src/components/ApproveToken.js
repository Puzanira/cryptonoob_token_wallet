import React from 'react';
import InputField from './shards/InputField';
import TransactionTemplate from './shards/TransactionTemplate';

const ApproveToken = ({ onInputChangeUpdateField, 
                        fields, 
                        approveDetail20,
                        defaultGasLimit,
                        defaultGasPrice,
                        inProgress,
                        closeTransfer,
                        Approve
                    }) => (
    <TransactionTemplate
        onInputChangeUpdateField={onInputChangeUpdateField}
        fields={fields}
        defaultGasLimit={defaultGasLimit}
        defaultGasPrice={defaultGasPrice}
        inProgress={inProgress}
        closeTransfer={closeTransfer}
        onProceed={Approve}
        proceedTitle="Approve"
    >
        { approveDetail20 ? (
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="amount" placeholder="Amount To Approve"
                addon={approveDetail20.symbol.toUpperCase()} />
        ) : (
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="tokenId" placeholder="Token ID" />
        )}
    </TransactionTemplate>                
)

export default ApproveToken;

