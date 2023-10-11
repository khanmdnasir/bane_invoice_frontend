import React from 'react';

const TextInput = ({ClassName, id, name, type, placeholder, value, onChange, error,disabled,readOnly }) => {
    return (
        <div >
            <input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                onChange={onChange}
                className={`block w-full border-b-2 border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 ${error ? 'border-red-500' : ''
                    }${ClassName}`}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
};

export default TextInput;