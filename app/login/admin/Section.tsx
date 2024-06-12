'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import logo from "../../../public/logo.webp";
import Image from 'next/image';
import axios from 'axios';
import { alertSuccess } from '../../Component/Alert';
import Cookies from 'js-cookie'

const Section = () => {
    const navigation = useRouter()
    const [notifSuccess, setNotifSuccess] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const API_URL = process.env.API_URL

    const handleLogin = async () => {
        try {
            if (email && password) {
                const response = await axios.post(`${API_URL}/auth/login`, {
                    username: email,
                    password: password
                })

                if (response.data.status == true) {
                    // console.log(response.data.data.user[0]);

                    Cookies.set('access_token', response.data.data.access_token)
                    Cookies.set('authName', response.data.data.user[0].fullname)
                    Cookies.set('level', response.data.data.user[0].kd_access[0].lvid)
                    setNotifSuccess(true)
                    setEmail('')
                    setPassword('')
                    setTimeout(() => {
                        navigation.push('/admin')
                    }, 2000);
                }
            }
        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            {notifSuccess && alertSuccess({ text: 'Menuju dashboard', title: 'Sign In Successfully' })}
            <div className='card bg-white overflow-hidden lg:w-[70%] w-full shadow-lg'>
                <div className="grid lg:grid-cols-2 ">
                    <div className="min-h-[40vh]">
                        <div className="card-body">
                            <div className="flex gap-5 items-center">
                                <div className="p-2 rounded-full shadow-md ">
                                    <Image alt='logo' src={logo} className='h-14 w-fit' />
                                </div>
                                <div className="text-4xl text-white drop-shadow-lg uppercase font-bold">Jurusan Ku</div>
                            </div>
                            <div className="text-gray-900 uppercase font-bold text-2xl mt-5">SIGN IN ADMIN</div>
                            <div className="flex flex-col gap-3">
                                <div className="form-control">
                                    <div className="">Email</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="grow" placeholder="Email" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <div className="">Password</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="grow" placeholder='Password' />
                                    </label>
                                </div>
                                <button onClick={handleLogin} className='btn btn-primary uppercase text-white'>Login</button>

                            </div>
                        </div>
                    </div>
                    <div className="bg-tron lg:block hidden"></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Section