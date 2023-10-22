import React from 'react';
import {
    logo_no_text, logo_with_text, bg_school, logo_school,
} from '../assets';

import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

import {
    Navbar, Button, Header, Subtitle, Tabs,
} from '../components';


function Request({ themeStyles }) {
    const colors = useColorContext();
    return (
        <div className="min-h-screen" style={{ ...themeStyles, backgroundColor: colors.BGGrey }}>
            <Navbar />

            {/* <div className="bg-white ml-3 mr-3 p-6 rounded-lg shadow-lg text-center"> */}
            <div className="ml-8 mr-8 pl-6 pr-6 pt-6 pb-2 flex justify-between items-center">
                <Header text='Request Resources' />
                {/* <Button
                    text='Download Report'
                    className='text-base'
                    rounded={false} /> */}
            </div>
            <Subtitle text='Find nearby schools and request resources as needed.' />

            <div className="mx-14 text-center grid grid-cols-2 gap-x-3 md:grid-cols-1 lg:grid-cols-3" style={{ height: '' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63740.76278150366!2d101.64136655!3d3.1480183999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb47024217187%3A0x1e85ebc65d47d641!2sUniversiti%20Malaya!5e0!3m2!1sen!2smy!4v1697731570186!5m2!1sen!2smy"
                    width="100%"
                    height="100%" // Default height
                    className="lg:h-100px md:h-450px" // 450px height on mobile view
                    style={{ border: 0, borderRadius: '20px' }}
                    allowFullScreen="false"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Maps"
                ></iframe>

                <div className='col-span-2' style={{ backgroundColor: colors.BGCardGrey, borderRadius: '20px' }}>
                    <img src={bg_school} alt="School Background" />
                    <div className='bg-white relative mx-8 rounded flex items-center grid grid-cols-5' style={{ top: '-85px', height: '145px', borderRadius: '20px' }}>
                        <div className="border-r-2 border-black border-opacity-50">
                            <img src={logo_school} style={{ height: '100%' }} className="mx-5" alt="School Logo" />
                        </div>

                        <div className='col-span-4 text-left px-4 grid grid-rows-3'>
                            <div>
                                <h1 className='text-2xl font-bold'>Sekolah Kebangsaan Prima 1</h1>
                            </div>
                            <div>
                                <p className='text-sm text-gray-700 font-medium'>Km 2, Taman Primadona Satu, Off Jalan Prima Baru, Kuala Lumpur, Malaysia</p>
                            </div>
                            <div className='grid grid-cols-2 font-medium text-gray-700 text-sm mt-3'>
                                <div>
                                    <p>📧 skprimasatu@moe.edu.my</p>
                                </div>
                                <div>
                                    <p>📞 +6012-345678</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='w-1/2'>
                            <p className='font-bold text-right'>3 km</p>
                        </div> */}
                    </div>

                    <div className='bg-red-500 grid grid-rows-3 gap-y-8 relative mx-8 mt-4 rounded ' style={{ top: '-85px', borderRadius: '20px' }}>
                        <div className='bg-yellow-500 p-3 grid grid-cols-2'>
                            <Tabs />
                        </div>
                        <div>a</div>
                        <div>aa</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Request;