import React from 'react';
import {
    logo_no_text, logo_with_text, login_
} from '../assets';

import Button from '../components/Button';

import { useColorContext } from '../context/ColorContextProvider';
import supabaseClient from './utils/supabase';
function Login({ themeStyles }) {
    const colors = useColorContext();
    
    const [credentials,setCredentials] = React.useState({
        email : '',
        password : ''
    })
    const handleLogin = async () => {
        const {data, error}=await supabaseClient.auth.signInWithPassword({email : credentials.email, password : credentials.password})
        if(data){
            supabaseClient.auth.setSession({
                access_token : data.session.access_token,
                refresh_token : data.session.refresh_token
            })
        }
    }
    return (
        <div className="flex h-screen">
            <div className="hidden md:block w-1/2 bg-white rounded" style={{ backgroundColor: colors.BGGrey }}>
                {/* LEFT SIDE - Visible on screens with a minimum width of md (medium) */}
                <img className=" border-r-3 border-black" src={login_} style={{ height: '100%', objectFit: 'cover' }} />

            </div>
            <div className="w-full md:w-1/2 bg-white p-4 rounded flex items-center justify-center" style={{ backgroundColor: colors.BGGrey }}>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <img
                        src={logo_with_text}
                        alt="Logo"
                        className="h-48 mx-auto mb-4"
                    />
                    <p className='font-bold text-center text-3xl mb-8'>
                        <span
                            style={{
                                color: 'black',
                                backgroundImage: `linear-gradient(0deg, ${colors.BGBlue} 0%, ${colors.BGBlue} 50%, transparent 50%, transparent 100%)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '60% 6px', // Adjust the length as needed
                                backgroundPosition: '50% 100%',
                                padding: '6px 10px', // Add some padding to control the position of the text
                            }}
                        >
                            Login
                        </span>
                    </p>
                    <div className="max-w-md mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                {/* Email */}
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={(e)=>{credentials.email=e.target.value}}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                {/* Password */}
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e)=>{credentials.password=e.target.value}}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <Button
                                text="LOGIN"
                                type='submit'
                                onClick={handleLogin}
                            />
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}

export default Login;
