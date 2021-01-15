import React from 'react';
import InputField from './InputField';
import CloseProceedControl from './CloseProceedControl';

const TransactionTemplate = ({ onInputChangeUpdateField, 
                        fields, 
                        defaultGasLimit,
                        defaultGasPrice,
                        inProgress,
                        closeTransfer,
                        onProceed,
                        proceedTitle,
                        children
                    }) => (
    <div className="panel-block is-paddingless is-12">
        <div className="column is-12" id="token-lists">
            <InputField onInputChange={onInputChangeUpdateField}
                fields={fields} name="receiver" placeholder="Address" />

            { children }

            <InputField onInputChange={onInputChangeUpdateField}
                default={defaultGasPrice}
                fields={fields} name="gasPrice"
                placeholder="Gas Price In Gwei"
                addon="Gas Price(gwei)" />
            <InputField onInputChange={onInputChangeUpdateField}
                default={defaultGasLimit}
                fields={fields} name="gasLimit"
                placeholder="Gas Limit" />
            
            <CloseProceedControl
                inProgress={inProgress}
                onClose={closeTransfer} 
                onProceed={onProceed} 
                proceedTitle={proceedTitle}
            />   
        </div>
    </div>
)

export default TransactionTemplate;