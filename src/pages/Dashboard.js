import React from 'react';

import {
    logo_no_text, logo_with_text, bg_school, logo_school,
} from '../assets';

import { useColorContext } from '../context/ColorContextProvider';

// import Navbar from '../components/Navbar';
import {
    Navbar, Button, Header, Subtitle, Card,
} from '../components';

function Dashboard({ themeStyles }) {
    const colors = useColorContext();
    return (
        <div className="min-h-screen" style={{ ...themeStyles, backgroundColor: colors.BGGrey }}>
            <Navbar />

            {/* <div className="bg-white ml-3 mr-3 p-6 rounded-lg shadow-lg text-center"> */}
            <div className="mx-8 pl-6 pr-6 pt-6 pb-2 flex justify-between items-center">
                <Header text='Welcome to School Inventory' />
                <Button
                    text='Download Report'
                    className='text-base'
                    rounded={false} />
            </div>
            <Subtitle text='Manage and monitor the school resources.' />

            {/* <div className="bg-white ml-14 mr-14 p-6 rounded-lg shadow-lg text-center"> */}
            <div className="mx-14 text-center grid grid-cols-5 gap-x-3" style={{ height: 'auto' }}>
                <div className='grid grid-rows-4 col-span-4 gap-3 mb-4'>


                    {/* <div className={`text-black grid grid-cols-5 text-left rounded-2xl`} style={{ backgroundColor: colors.BGBlueSoft }}> */}
                    <Card className={`text-black grid grid-cols-5 text-left`} bgColor={colors.BGBlueSoft}>
                        <div className='flex justify-center items-center'>
                            <img src={logo_school} className="w-auto h-48 p-10" alt="School Logo" />
                        </div>
                        <div className='col-span-4 p-6 grid grid-rows-3'>
                            <h1 className='text-4xl font-bold'>Sekolah Kebangsaan Petaling 1</h1>

                            <div className='grid grid-cols-3'>
                                <p className='col-span-2 text-sm text-gray-700 font-medium'>Km 3, Taman Primadona Dua, Off Jalan Prima Lama, Kuala Lumpur, Malaysia</p>
                                <p className='font-bold text-right pr-8'>3.5 km</p>
                            </div>
                            <div className='grid grid-cols-2 font-medium text-gray-700 text-sm mt-3'>
                                <div>
                                    <p>📧 skpetalingsatu@moe.edu.my</p>
                                </div>
                                <div>
                                    <p>📞 +6012-345678</p>
                                </div>
                            </div>
                        </div>
                    </Card>


                    <div className='grid grid-cols-3 gap-3'>
                        <Card className='col-span-2'>
                            <div>Resource: Laptop</div>
                        </Card>
                        <Card className=''>
                            <div>Resource %</div>
                        </Card>
                    </div>


                    <div className='grid grid-cols-3 gap-3'>
                        <Card className=''>
                            <div>Resource %</div>
                        </Card>
                        <Card className=''>
                            <div>Resource %</div>
                        </Card>
                        <Card className=''>
                            <div>Resource %</div>
                        </Card>
                    </div>


                    <div className='grid grid-cols-3 gap-3'>
                        <Card className=''>
                            <div>Resource %</div>
                        </Card>
                        <Card className=''>
                            <div>Resource %</div>
                        </Card>
                    </div>

                </div>
                <Card className='mb-4'>
                    <div>Resource %</div>
                </Card>
            </div>



        </div>
    );
}

export default Dashboard;