import React from 'react';

const InputField = ({ name: fieldName, fields, placeholder, addon, onInputChange, default: defaultValue}) => {
    let value = (fields && fields[fieldName]) || '';

    let handleChange = e => {
        onInputChange(fieldName, e.target.value);
    };

    return (
        <div className="field has-addons is-12">
            <p className="control is-expanded">
            <input  defaultValue={defaultValue || value}
                    onInput={handleChange}
                    placeholder={placeholder}
                    className="Input"
                    type="text">
            </input>
            </p>
            <p className="control">
                {addon ? (
                    <a className="button is-static">
                        {addon}
                    </a>
                ) : ''}
            </p>
        </div>
    )
}

export default InputField;