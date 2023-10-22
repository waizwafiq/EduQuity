import React from 'react';
import { useLocation } from 'react-router-dom';

import {
    logo_no_text, logo_with_text, bg_school, logo_school,
} from '../assets';

function Navbar() {
    const location = useLocation();

    const links = [
        { path: '/', text: '👩‍💻 School Inventory' },
        { path: '/request', text: '📦 Resource Radar' },
        { path: '/request_log', text: '📂 Request Log' },
    ];

    return (
        <nav className="bg-white px-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="flex items-center">
                    <img src={logo_with_text} alt="EduQuity Logo" className="w-36 mr-2" />
                </a>
                <div className=''>
                    <ul className="text-black font-medium gap-x-5 flex space-x-4">
                        {links.map((link) => (
                            <li key={link.path}>
                                <a
                                    href={link.path}
                                    className={`hover:text-blue-300 ${location.pathname === link.path ? 'text-blue-500' : ''}`}
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='grid grid-cols-3 gap-x-5'>
                    <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                    <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                    <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
