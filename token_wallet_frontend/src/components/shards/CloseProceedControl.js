import React from "react";

const CloseProceedControl = ({ onClose, onProceed, proceedTitle, inProgress }) => (
    <div className="field is-grouped is-pulled-right is-offset">
        <p className="control">
            <a className="button is-light" disabled={inProgress}
                onClick={() => onClose()}>
                    Back
            </a>
        </p>
        <p className="control">
            <a className={inProgress ? "button is-danger is-loading" : "button is-danger"} 
                disabled={inProgress}
                onClick={() => onProceed()}>
                    {proceedTitle}
            </a>
        </p>
    </div>
);

export default CloseProceedControl;