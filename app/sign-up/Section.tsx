'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Section = () => {
    const navigation = useRouter()

    return (
        <div className='card bg-white overflow-hidden lg:w-[60%] w-full shadow-lg'>
            <div className="grid ">
                <div className="min-h-[40vh]">
                    <div className="card-body">
                        <div className="text-4xl text-white drop-shadow-lg text-center uppercase font-bold">Jurusan Ku</div>
                        <div className="text-gray-900 uppercase font-bold text-2xl mt-5">SIGN UP</div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="form-control">
                                <div>Email</div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input type="text" className="grow" placeholder="Email" />
                                </label>
                            </div>
                            <div className="form-control">
                                <div>Nama Lengkap</div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input type="text" className="grow" placeholder="Nama Lengkap" />
                                </label>
                            </div>
                            <div className="form-control">
                                <div>Password</div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input type="password" className="grow" placeholder='Password' />
                                </label>
                            </div>
                            <div className="form-control">
                                <div>Konfirmasi Password</div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input type="password" className="grow" placeholder='Konfirmasi Password' />
                                </label>
                            </div>
                            <div className="lg:col-span-3 flex flex-col gap-3">
                                <button className='btn btn-primary uppercase text-white'>Submit</button>
                                <hr />
                                <div className="flex gap-2 justify-center text-center items-center">
                                    <div className="">
                                        Sudah punya akun ?
                                    </div>
                                    <button onClick={() => navigation.push('/login')} className="btn btn-warning btn-sm">SIGN IN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="bg-tron"></div> */}
            </div>
        </div>
    )
}

export default Section