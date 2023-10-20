import React from 'react';
import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

function Subtitle({ text, className }) {
    const colors = useColorContext();

    return (
        <p className={`ml-14 mb-8 text-gray-600 text-base font-semibold ${className}`} style={{ color: colors.GreyFont }}>{text}</p>
    );
}

export default Subtitle;
