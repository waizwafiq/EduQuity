import React from 'react';
import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

function Tabs({ text, onClick, className, type, bgColor, disabled, rounded = true }) {
    const colors = useColorContext();

    const backgroundColor = bgColor || colors.BGBlue;

    return (
        <p>hi</p>
    );
}

export default Tabs;
