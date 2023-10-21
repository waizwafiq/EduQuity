import React, { useEffect, useState } from 'react';
import {
    logo_no_text, logo_with_text, bg_school, logo_school,
} from '../assets';

import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

import {
    Navbar, Button, Header, Subtitle, Tabs,
} from '../components';

import '../components/effects/Effects.css';


function Request({ themeStyles }) {
    const colors = useColorContext();
    const [glow, setGlow] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setGlow((prevGlow) => !prevGlow);
        }, 1000); // Change the duration as needed

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    
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

                </div>
                <div className='flex items-center justify-center col-span-3'>
                    <div className="relative rounded-full" style={{ width: '750px', height: '750px' }}>
                        {/* Outermost Ring */}
                        <div className="z-0 w-full h-full bg-indigo-600 rounded-full absolute"></div>

                        {/* Second Ring (inner) */}
                        <div
                            style={{ width: '70%', height: '70%' }}
                            className="z-20 bg-indigo-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        ></div>

                        {/* Third Ring (inner) */}
                        <div
                            style={{ width: '40%', height: '40%' }}
                            className="z-40 bg-indigo-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        ></div>

                        {/* Innermost Ring */}
                        <div
                            style={{ width: '20%', height: '20%' }}
                            className="z-40 bg-indigo-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                        >
                            <img src={logo_no_text} alt="Logo" />
                        </div>




                        {/* LOGO HERE */}
                        {/* <div
                            className="z-50 absolute h-14 w-14 rounded-full bg-gray-300"
                            style={{ top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        >
                            <div className='rounded-full flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                                <img src={logo_school} alt="Your Image" className="h-10 w-10" />
                            </div>
                        </div> */}
                        <div
                            className={`z-50 absolute h-14 w-14 rounded-full ${glow ? 'glow' : ''}`}
                            style={{ top: '60%', left: '35%', transform: 'translate(-50%, -50%)' }}
                        >
                            <div className='hover:cursor-pointer rounded-full bg-gray-300 flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                                <img src={logo_school} alt="Your Image" className="h-10 w-10" />
                            </div>
                        </div>
                        <div
                            className={`z-50 absolute h-14 w-14 rounded-full ${glow ? 'glow' : ''}`}
                            style={{ top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}
                        >
                            <div className='hover:cursor-pointer rounded-full bg-gray-300 flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                                <img src={logo_school} alt="Your Image" className="h-10 w-10" />
                            </div>
                        </div>
                        <div
                            className={`z-50 absolute h-14 w-14 rounded-full ${glow ? 'glow' : ''}`}
                            style={{ top: '30%', left: '30%', transform: 'translate(-50%, -50%)' }}
                        >
                            <div className='hover:cursor-pointer rounded-full bg-gray-300 flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                                <img src={logo_school} alt="Your Image" className="h-10 w-10" />
                            </div>
                        </div>
                        <div
                            className={`z-50 absolute h-14 w-14 rounded-full ${glow ? 'glow' : ''}`}
                            style={{ top: '10%', left: '70%', transform: 'translate(-50%, -50%)' }}
                        >
                            <div className='hover:cursor-pointer rounded-full bg-gray-300 flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                                <img src={logo_school} alt="Your Image" className="h-10 w-10" />
                            </div>
                        </div>
                        <div
                            className={`z-50 absolute h-14 w-14 rounded-full ${glow ? 'glow' : ''}`}
                            style={{ top: '50%', left: '70%', transform: 'translate(-50%, -50%)' }}
                        >
                            <div className='hover:cursor-pointer rounded-full bg-gray-300 flex items-center justify-center' style={{ height: '100%', width: '100%' }}>
                                <img src={logo_school} alt="Your Image" className="h-10 w-10" />
                            </div>
                        </div>

                    </div>



                </div>


            </div>
        </div>
    );
}

export default Request;