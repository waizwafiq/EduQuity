import React from 'react';
import logo_no_text from '../assets/logo_no_text.png';
import logo_with_text from '../assets/logo_with_text.png';

function Login({ themeStyles }) { // Pass themeStyles as a prop
    return (
        <div class="flex h-screen">
            <div class="w-1/2 bg-white p-4 rounded" style={{ backgroundColor: '#EAEDF7' }}>
                {/* LEFT SIDE */}
            </div>
            <div class="w-1/2 bg-white p-4 rounded flex items-center justify-center" style={{ backgroundColor: '#EAEDF7' }}>
                <div class="bg-white p-4 rounded-xl shadow-lg">
                    <img
                        src={logo_with_text}
                        alt="Logo"
                        className="h-48 mx-auto mb-4"
                    />
                    <p className='font-bold text-center text-3xl mb-8'>
                        {/* <span style={{ color: 'black', borderBottom: '5px solid #6259CA', borderWidth:'50px' }}>Login</span> */}
                        <span
                            style={{
                                color: 'black',
                                backgroundImage: `linear-gradient(0deg, #6259CA 0%, #6259CA 50%, transparent 50%, transparent 100%)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '60% 6px', // Adjust the length as needed
                                backgroundPosition: '50% 100%',
                                padding: '6px 10px', // Add some padding to control the position of the text
                            }}
                        >
                            Login
                        </span>
                    </p>


                </div>
            </div>
        </div>
    );
}

export default Login;