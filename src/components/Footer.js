import React from 'react';
import { useColorContext } from '../context/ColorContextProvider';

function Footer() {
    const colors = useColorContext();
    return (
        <div className='bg-gray-600 text-sm font-medium text-center'>
            <h1 className="text-white pt-8">© 2023 EduQuity. All rights reserved.</h1>
            <h1 className="text-yellow-500 pb-8">Team Vista 336 (IH58)</h1>
        </div>
    );
};

export default Footer;
