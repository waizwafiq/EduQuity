import React from 'react';
import { useColorContext } from '../context/ColorContextProvider';

function Footer() {
    const colors = useColorContext();
    return (
        <div className='bg-white text-sm font-medium text-center'>
            <h1 className="text-black pt-8">© 2023 EduQuity. All rights reserved.</h1>
            <h1 className="text-yellow-500 pb-8">Team Vista 336 (IH58)</h1>
        </div>
    );
};

export default Footer;
