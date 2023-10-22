import React from 'react';
import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

function Button({ text, onClick, className, type, bgColor, disabled, rounded = true, linkTo }) {
    const colors = useColorContext();

    const backgroundColor = bgColor || colors.BGBlue;
    if (linkTo) {
        return (
            <a href={linkTo}>
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
            </a>
        );
    } else {
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
    };
}

export default Button;
