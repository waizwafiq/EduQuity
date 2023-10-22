import React, { useEffect, useState } from 'react';
import {
    logo_no_text, logo_with_text,
    petaling1, bg_petaling1,
    pandan_jaya,
    seksyen19,
    keningau,
    sahoca,
} from '../assets';

import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

import {
    Navbar, Button, Header, Subtitle, Tabs, GlowNode, PopUp,
} from '../components';

import '../components/effects/Effects.css';


function Request({ themeStyles }) {
    const colors = useColorContext();
    // const [glow, setGlow] = useState(false);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setGlow((prevGlow) => !prevGlow);
    //     }, 2000); // Change the duration as needed

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);

    const [showElement, setShowElement] = useState(false);

    useEffect(() => {
        // Delay the appearance for a few seconds
        const delayTimeout = setTimeout(() => {
            setShowElement(true);
        }, 1000); // Adjust the delay as needed

        return () => {
            clearTimeout(delayTimeout);
        };
    }, []);


    const [popupVisible, setPopupVisible] = useState(false);

    // Function to toggle the visibility of the PopUpDiv
    const togglePopupVisibility = () => {
        setPopupVisible(!popupVisible);
    };

    return (
        <div className="min-h-screen" style={{ ...themeStyles, backgroundColor: colors.BGGrey }}>
            <Navbar />

            {/* <div className="bg-white ml-3 mr-3 p-6 rounded-lg shadow-lg text-center"> */}
            <div className="ml-8 mr-8 pl-6 pr-6 pt-6 pb-2 flex justify-between items-center">
                <Header text='Resource Radar' />
                {/* <Button
                    text='Download Report'
                    className='text-base'
                    rounded={false} /> */}
            </div>
            <Subtitle text='Find nearby schools and request resources as needed.' />

            {/* <div className="mx-14 text-center grid grid-cols-2 gap-x-3 md:grid-cols-1 lg:grid-cols-3" style={{ height: '' }}> */}
            <div className="mx-14 text-center pb-8 grid grid-cols-5" style={{ height: '' }}>
                <div>
                    <p className='text-left font-medium'>Note: The closer the school icon to the center, the better choice for borrowing resources!</p>
                </div>

                <div className='flex items-center justify-center col-span-3'>
                    <div className="relative" style={{ width: '750px', height: '750px' }}>


                        {/* Outermost Ring */}
                        <div className="z-0 w-full h-full rounded-full absolute shadow-xl" style={{ backgroundColor: '#bfc0ea' }}>

                        </div>

                        {/* Second Ring (inner) */}
                        <div
                            style={{ width: '70%', height: '70%', backgroundColor: '#aaaae4' }}
                            className="z-10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        ></div>

                        {/* Third Ring (inner) */}
                        <div
                            style={{ width: '40%', height: '40%', backgroundColor: '#9998e3' }}
                            className="z-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        ></div>

                        {/* Innermost Ring */}
                        <div
                            style={{ width: '20%', height: '20%' }}
                            className="z-50 bg-indigo-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        >
                            <img src={logo_no_text} alt="Logo" />
                        </div>

                        {/* BLACK LINE */}
                        <div
                            className="z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                width: '50%',
                                height: '2px',
                                transform: 'translate(0%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <p className="text-center text-sm text-gray-500">Scale of Suitability</p>
                        </div>

                        {/* <div
                            style={{ width: '21%', height: '21%' }}
                            className="z-40 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        >
                            
                        </div> */}

                        {/* Radar Effect Div */}
                        <div
                            style={{ width: '20%', height: '20%', animation: 'ripple 2s ease-out infinite', animationDelay: '1s' }}
                            className="z-40 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        >
                            <div className=''></div>
                        </div>


                        {/* LOGO HERE */}
                        {/* <div>
                            {showElement && (
                                <div
                                    className={`z-50 absolute h-14 w-14 rounded-full glow`}
                                    style={{ top: '60%', left: '35%', transform: 'translate(-50%, -50%)', animation: 'riseUp 1s ease forwards' }}
                                >
                                    <div className='bg-white bg-opacity-70 hover:cursor-pointer rounded-full flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                                        <img src={logo_school} alt="Your Image" className="h-10 w-10" />
                                    </div>
                                </div>
                            )}
                        </div> */}
                        <GlowNode top="10%" left="35%" imgSrc={petaling1} showElement={showElement} glow={true} onClick={togglePopupVisibility} />
                        <GlowNode top="62%" left="60%" imgSrc={pandan_jaya} showElement={showElement} glow={true} onClick={togglePopupVisibility} />
                        <GlowNode top="70%" left="15%" imgSrc={seksyen19} showElement={showElement} glow={true} onClick={togglePopupVisibility} />
                        <GlowNode top="30%" left="25%" imgSrc={keningau} showElement={showElement} glow={true} onClick={togglePopupVisibility} />
                        <GlowNode top="30%" left="85%" imgSrc={sahoca} showElement={showElement} glow={true} onClick={togglePopupVisibility} />


                    </div>



                </div>


            </div>
            <PopUp bgSchool={bg_petaling1} logoSchool={pandan_jaya}
                isVisible={popupVisible}
                toggleVisibility={togglePopupVisibility} />
        </div>
    );
}

export default Request;