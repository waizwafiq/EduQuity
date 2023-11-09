import React, { useState, useEffect } from 'react';

import { useColorContext } from '../context/ColorContextProvider'; // Import the hook
import {
    logo_no_text,
    logo_with_text,
    bg_petaling1,
    petaling1,
    laptop,
    tablet,
    smartphone,
    itteacher,
    ittechnician,
} from "../assets";

import {
    Navbar,
    Button,
    Header,
    Subtitle,
    Card,
    LabelCircle,
    ResourceCard,
    ClickableCard2,
    ResourceLogDash,
} from "../components";
import { Doughnut } from "react-chartjs-2";
import supabaseClient from '../pages/utils/supabase';

function PopUp({ bgSchool, logoSchool, isVisible, toggleVisibility }) {
    const colors = useColorContext();
    const [schoolData, setSchoolData] = React.useState()
    const [inventoryData, setInventoryData] = React.useState([])
    const [requiredResources, setRequiredResources] = React.useState([])

    const dataCounter = (data, typeTarget) => {
        return data.filter((data) => {
            return data.type == typeTarget
        }).length
    }

    const getRequired = (data, typeTarget) => {
        let number = 0
        data.forEach(element => {
            if (element.type == typeTarget) {
                number = element.number_required
            }
        });
        return number
    }

    const getSchoolData = async () => {
        const { data: userData } = await supabaseClient.auth.getUser()
        const { data: school, error } = await supabaseClient.from('school').select("*").neq('real_uuid', userData.user.id).single();
        const { data: inventoryData } = await supabaseClient.from("resource").select("type").eq("school_id", school?.real_uuid)
        const { data: requiredResources } = await supabaseClient.from("required_resources").select("*").eq("school_id", school?.real_uuid)
        setInventoryData(inventoryData)
        setSchoolData(school)
        setRequiredResources(requiredResources)
        console.log(school)
    }

    const data = {
        labels: ["Laptop", "Tablet", "Smartphone", "Teacher", "IT Technician"],
        datasets: [
            {
                data: [10, 20, 30, 30, 20],
                backgroundColor: [
                    colors.PieBlue,
                    colors.PieBabyBlue,
                    colors.PieLightBlue,
                    colors.PieRed,
                    colors.PieGreen,
                ],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    generateLabels: function (chart) {
                        return "";
                    },
                },
            },
            datalabels: {
                display: false,
            },
        },
    };
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
        getSchoolData()
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
        schoolData &&
        <div className='overflow-y-auto'>
            <div style={overlayStyle} onClick={toggleVisibility}></div>

            <div className='' style={{ ...popUpStyle, backgroundColor: colors.BGCardGrey, borderRadius: '20px', width: '85vw', height: '90%' }}>
                <img src={bgSchool} alt="School Background" style={{ height: '50%', width: '100%' }} />
                <div className='bg-white relative mx-8 rounded items-center grid grid-cols-5' style={{ top: '-30%', height: '145px', borderRadius: '20px' }}>
                    <div className="border-r-2 border-black border-opacity-50 flex items-center justify-center ">
                        <img src={schoolData.image} style={{ height: '100px' }} className="mx-5" alt="School Logo" />
                    </div>

                    <div className='col-span-4 text-left px-4 grid grid-rows-3'>
                        <div>
                            <h1 className='text-2xl font-bold'>{schoolData.name}</h1>
                        </div>
                        <div>
                            <p className='text-sm text-gray-700 font-medium'>{schoolData.location}</p>
                        </div>
                        <div className='grid grid-cols-3 font-medium text-gray-700 text-sm mt-3'>
                            <div className='col-span-2'>
                                <p className='hover:cursor-pointer'>📧 {schoolData.email}</p>
                            </div>
                            <div>
                                <p className='hover:cursor-pointer'>📞 {schoolData.phone}</p>
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
                                <div>
                                    <div className="grid grid-cols-3 gap-3">
                                    
                                        <ClickableCard2 className = {`border-4 ${dataCounter(inventoryData,1)>=getRequired(requiredResources,1)? ('border-[#00b294]'):('border-[#da3801]')} hover:bg-[#E1DFF6] hover:cursor-pointer`}>
                                            <ResourceCard icon={laptop} iconTitle="LAPTOP" width="150" current={dataCounter(inventoryData, 1)} required={getRequired(requiredResources,1)} />
                                        </ClickableCard2>
                                        <ClickableCard2 className = {`border-4 ${dataCounter(inventoryData, 2)>=getRequired(requiredResources,2)? ('border-[#00b294]'):('border-[#da3801]')} hover:bg-[#E1DFF6] hover:cursor-pointer`}>
                                            <ResourceCard icon={tablet} iconTitle="TABLET" width="140" current={dataCounter(inventoryData, 2)} required={getRequired(requiredResources,2)} />
                                        </ClickableCard2>
                                        <ClickableCard2 className = {`border-4 ${dataCounter(inventoryData, 3)>=getRequired(requiredResources,3)? ('border-[#00b294]'):('border-[#da3801]')} hover:bg-[#E1DFF6] hover:cursor-pointer`}>
                                            <ResourceCard
                                                icon={smartphone}
                                                iconTitle="SMARTPHONE"
                                                width="140" current={dataCounter(inventoryData, 3)} required={getRequired(requiredResources,3)}
                                            />
                                        </ClickableCard2>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 mt-3">
                                        <ClickableCard2 className = {`border-4 ${dataCounter(inventoryData, 4)>=getRequired(requiredResources,4)? ('border-[#00b294]'):('border-[#da3801]')} hover:bg-[#E1DFF6] hover:cursor-pointer`}>
                                            <ResourceCard
                                                icon={itteacher}
                                                iconTitle="IT TEACHER"
                                                width="140" current={dataCounter(inventoryData, 4)} required={getRequired(requiredResources,4)}
                                            />
                                        </ClickableCard2>
                                        <ClickableCard2 className = {`border-4 ${dataCounter(inventoryData, 5)>=getRequired(requiredResources,5)? ('border-[#00b294]'):('border-[#da3801]')} hover:bg-[#E1DFF6] hover:cursor-pointer`}>
                                            <ResourceCard
                                                icon={ittechnician}
                                                iconTitle="IT TECHNICIAN"
                                                width="140" current={dataCounter(inventoryData, 5)} required={getRequired(requiredResources,5)}
                                            />
                                        </ClickableCard2>
                                        <Card className="py-5 px-10">
                                            <div>
                                                <div className="font-bold flex justify-start items-center">
                                                    RESOURCES %
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className=" flex items-center">
                                                        <ul
                                                            className="text-left font-medium"
                                                            style={{ color: colors.FontGrey }}
                                                        >
                                                            <li className="flex items-center gap-2">
                                                                <LabelCircle color={colors.PieBlue} />
                                                                Laptop
                                                            </li>
                                                            <li className="flex items-center gap-2">
                                                                <LabelCircle color={colors.PieBabyBlue} />
                                                                Tablet
                                                            </li>
                                                            <li className="flex items-center gap-2">
                                                                <LabelCircle color={colors.PieLightBlue} />
                                                                Smartphone
                                                            </li>
                                                            <li className="flex items-center gap-2">
                                                                <LabelCircle color={colors.PieRed} />
                                                                Teacher
                                                            </li>
                                                            <li className="flex items-center gap-2">
                                                                <LabelCircle color={colors.PieGreen} />
                                                                IT Technician
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="h-40 flex items-center">
                                                        <Doughnut data={data} options={options} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
