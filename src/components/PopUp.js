import React, { useState, useEffect } from 'react';

import { useColorContext } from '../context/ColorContextProvider'; // Import the hook
import { bg_petaling1, petaling1 } from '../assets';

function PopUp({ bgSchool, logoSchool, isVisible, toggleVisibility }) {
    const colors = useColorContext();

    // const [isVisible, setIsVisible] = useState(false);

    // const toggleVisibility = () => {
    //     setIsVisible(!isVisible);
    // };

    const overlayStyle = {
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(10px)', // Apply a blur effect to the background
        zIndex: 998, // Lower z-index than PopUpDiv to keep it behind
    };

    const popUpStyle = {
        display: isVisible ? 'block' : 'none',
        backgroundColor: colors.BGCardGrey,
        borderRadius: '20px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        animation: isVisible ? 'slide-up 1s ease forwards' : 'none',
    };


    const [selectedTab, setSelectedTab] = useState(1);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                toggleVisibility(); // Call the function when the Escape key is pressed
            }
        };

        // Add an event listener to the document
        document.addEventListener('keydown', handleEscapeKey);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);
    
    return (
        <div className='overflow-y-auto'>
            <div style={overlayStyle} onClick={toggleVisibility}></div>

            <div className='' style={{ ...popUpStyle, backgroundColor: colors.BGCardGrey, borderRadius: '20px', width: '85vw', height: '90%' }}>
                <img src={bgSchool} alt="School Background" style={{ height: '50%', width: '100%' }} />
                <div className='bg-white relative mx-8 rounded flex items-center grid grid-cols-5' style={{ top: '-30%', height: '145px', borderRadius: '20px' }}>
                    <div className="border-r-2 border-black border-opacity-50 flex items-center justify-center ">
                        <img src={logoSchool} style={{ height: '100px' }} className="mx-5" alt="School Logo" />
                    </div>

                    <div className='col-span-4 text-left px-4 grid grid-rows-3'>
                        <div>
                            <h1 className='text-2xl font-bold'>Sekolah Kebangsaan Prima 1</h1>
                        </div>
                        <div>
                            <p className='text-sm text-gray-700 font-medium'>Km 2, Taman Primadona Satu, Off Jalan Prima Baru, Kuala Lumpur, Malaysia</p>
                        </div>
                        <div className='grid grid-cols-3 font-medium text-gray-700 text-sm mt-3'>
                            <div className='col-span-2'>
                                <p className='hover:cursor-pointer'>📧 skprimasatu@moe.edu.my</p>
                            </div>
                            <div>
                                <p className='hover:cursor-pointer'>📞 +6012-345678</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className='w-1/2'>
                            <p className='font-bold text-right'>3 km</p>
                        </div> */}
                </div>

                <div className='bg-white relative mx-8 mt-4 rounded ' style={{ top: '-30%', borderRadius: '20px', height: '50%' }}>
                    <div className='bg-white p-3 rounded-lg'>

                        {/* <div className='text-center bg-gray-300 rounded-tl-lg rounded-bl-lg border-r border-black'>as</div>
                        <div className='text-center bg-gray-300 rounded-tr-lg rounded-br-lg'>as</div> */}
                        <div className="flex justify-center mb-4 font-medium">
                            <button
                                className={`w-full px-4 py-2 rounded-tl-lg rounded-bl-lg focus:outline-none ${selectedTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setSelectedTab(1)}
                            >
                                Request Resources
                            </button>
                            <button
                                className={`w-full px-4 py-2 rounded-tr-lg rounded-br-lg focus:outline-none ${selectedTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setSelectedTab(2)}
                            >
                                Request History
                            </button>
                        </div>
                        <div className="px-4 py-2 overflow-y-auto" style={{ height: '30vh' }}>
                            {selectedTab === 2 ?
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className='border-b-2 border-gray-300'>
                                            <tr>
                                                <th className="px-4 py-2">Resource</th>
                                                <th className="px-4 py-2">Type</th>
                                                <th className="px-4 py-2">Status</th>
                                                <th className="px-4 py-2">Quantity</th>
                                                <th className="px-4 py-2">Request Date</th>
                                                <th className="px-4 py-2">Last Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            <tr>
                                                <td className="px-4 py-2">IT Teacher</td>
                                                <td className="px-4 py-2 text-indigo-600 font-semibold">Import</td>
                                                <td className="px-4 py-2 text-yellow-600 font-semibold">• Pending</td>
                                                <td className="px-4 py-2">2</td>
                                                <td className="px-4 py-2">18/12/2023</td>
                                                <td className="px-4 py-2">23/12/2023</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2">Smartphone</td>
                                                <td className="px-4 py-2 text-indigo-600 font-semibold">Import</td>
                                                <td className="px-4 py-2 text-green-600 font-semibold">Done</td>
                                                <td className="px-4 py-2">10</td>
                                                <td className="px-4 py-2">18/12/2023</td>
                                                <td className="px-4 py-2">23/12/2023</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2">Table</td>
                                                <td className="px-4 py-2 text-pink-400 font-semibold">Export</td>
                                                <td className="px-4 py-2 text-red-600 font-semibold">Rejected</td>
                                                <td className="px-4 py-2">100</td>
                                                <td className="px-4 py-2">18/12/2023</td>
                                                <td className="px-4 py-2">23/12/2023</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                :
                                <div>Hello</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
