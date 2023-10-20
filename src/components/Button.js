import React from 'react';
import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

function Button({ text, onClick, className, type, bgColor, disabled, rounded = true }) {
    const colors = useColorContext();

    const backgroundColor = bgColor || colors.BGBlue;

    return (
        <button
            className={`text-white font-bold py-2 px-4 ${rounded ? 'rounded' : 'rounded-none'} focus:outline-none focus:shadow-outline ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={{
                backgroundColor: backgroundColor,
            }}
        >
            {text}
        </button>
    );
}

export default Button;
