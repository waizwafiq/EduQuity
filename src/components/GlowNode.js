import React, { useState, useEffect } from 'react';

function GlowNode({ top, left, imgSrc, showElement, glow, onClick }) {
    const handleOnClick = () => {
        // Execute the provided onClick function when the element is clicked
        if (onClick) {
            onClick();
        }
    };

    const [isSwitch, setSwitch] = useState(true);

    useEffect(() => {
        if (showElement) {
            setTimeout(() => {
                setSwitch(false);
            }, 1000); // Wait for 1 second (adjust the delay as needed)
        }
    }, [showElement]);

    return (
        <div>
            {showElement && (
                <div
                    className={`z-50 absolute h-14 w-14 rounded-full glow rising`}
                    style={{
                        top: top,
                        left: left,
                        transform: 'translate(-50%, -50%)',
                        animation: isSwitch ? 'riseUp 1s ease forwards' : 'glowing 2s infinite',
                        // animation: 'glowing 2s infinite',
                        // animation: 'riseUp 1s ease forwards',
                    }}
                    onClick={ handleOnClick }
                >
                    <div className='bg-white bg-opacity-70 hover:cursor-pointer rounded-full flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                        <img src={imgSrc} alt="Your Image" className="h-10 w-10" />
                    </div>
                </div>
            )}
        </div>
    );
}
export default GlowNode;
