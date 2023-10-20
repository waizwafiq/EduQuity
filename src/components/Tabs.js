import React, { useState } from 'react';
import { useColorContext } from '../context/ColorContextProvider'; // Import the hook

function Tabs({ text, onClick, className, type, bgColor, disabled, rounded = true }) {
    const [selectedTab, setSelectedTab] = useState(1);

    return (
        <div className="w-64 mx-auto p-4 border rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
                <button
                    className={`px-4 py-2 rounded-t-lg focus:outline-none ${selectedTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    onClick={() => setSelectedTab(1)}
                >
                    Tab 1
                </button>
                <button
                    className={`px-4 py-2 rounded-t-lg focus:outline-none ${selectedTab === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    onClick={() => setSelectedTab(2)}
                >
                    Tab 2
                </button>
            </div>
            <div className="px-4 py-2">
                {selectedTab === 1 ? <div>Hi</div> : <div>Hello</div>}
            </div>
        </div>
    );
}

export default Tabs;
