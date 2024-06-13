'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../public/logo.webp";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
interface props {
    active: string
}

const Navbar: React.FC<props> = ({ active }) => {
    const navigation = useRouter()
    const [authName, setAuthName] = useState<string | undefined>('')
    const handleLogout = () => {
        Cookies.remove('access_token')
        Cookies.remove('authName')
        Cookies.remove('level')
        navigation.push('/login/admin')
    }


    useEffect(() => {
        const session = Cookies.get('authName')
        setAuthName(session)
    }, [])

    return (
        <React.Fragment >
            <div className="navbar bg-white shadow-lg">
                <div className="flex-none">
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 lg:w-80 w-60 min-h-full bg-white text-base-content gap-2">
                                {/* Sidebar content here */}
                                <button onClick={() => navigation.push('/admin')} className={`btn  ${active == 'dashboard' ? 'btn-info text-white' : 'btn-ghost'}`} >
                                    <div className="flex justify-between items-center w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        <div className="">Dashboard</div>
                                    </div>
                                </button>
                                <button onClick={() => navigation.push('/admin/jurusan')} className={`btn  ${active == 'jurusan' ? 'btn-info text-white' : 'btn-ghost'}`} >
                                    <div className="flex justify-between items-center w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                        </svg>
                                        <div className="">Jurusan</div>
                                    </div>
                                </button>
                                <button onClick={() => navigation.push('/admin/siswa')} className={`btn  ${active == 'siswa' ? 'btn-info text-white' : 'btn-ghost'}`} >
                                    <div className="flex justify-between items-center w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <div className="">Siswa</div>
                                    </div>
                                </button>
                                <button onClick={handleLogout} className={`btn btn-error`} >
                                    <div className="flex justify-center items-center w-full text-white uppercase">
                                        Logout
                                    </div>
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1 ml-2">
                    <div className="flex flex-col gap-2">
                        <div className="uppercase font-bold text-white drop-shadow-md text-3xl">Jurusan Ku</div>
                        <div className="p-1 rounded-md bg-warning w-fit text-xs capitalize">{authName}</div>
                    </div>
                </div>
                <div className="flex-none">
                    <div className="">
                        <Image alt="logo" src={logo} className="h-16 w-fit" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Navbar;
