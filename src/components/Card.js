import React from 'react';
import { useColorContext } from '../context/ColorContextProvider';

function Card({ children, className, bgColor }) {
    const colors = useColorContext();
    const backgroundColor = bgColor ? bgColor : 'white';

    return (
        <div className={`rounded-2xl ${className}`} style={{ backgroundColor: backgroundColor }}>
            {children}
        </div>
    );
};

export default Card;
