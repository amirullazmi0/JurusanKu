'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { alertSuccess } from '../Component/Alert'
import Image from 'next/image'
import logo from "../../public/logo.webp";

const Section = () => {
    const navigation = useRouter()
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [errorPassword, setErrorPassword] = useState<boolean | undefined>(undefined)
    const [errorPasswordRequire, setErrorPasswordRequier] = useState<boolean | undefined>(undefined)
    const [notifSuccess, setNotifSuccess] = useState<boolean>(false)
    const [notifError, setNotifError] = useState<boolean>(false)

    const API_URL = process.env.API_URL

    type Inputs = {
        username: string
        fullname: string
        email: string
        nohp: number
        password: string
        lvid: number[]
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            lvid: [2]
        },
    })


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (data.password) {
                const response = await axios.post(`${API_URL}/auth/register`, data)
                //console.log(data);

                //console.log(response.data);

                if (response.data.status == true) {
                    setNotifSuccess(true)
                    setTimeout(() => {
                        navigation.push('/login')
                        reset()
                    }, 2000);
                } else {
                    setNotifError(true)
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                    setTimeout(() => {
                        setNotifError(false)
                    }, 2000);
                }
            }
        } catch (error) {

        }
    }

    const onChangeConfirmPassword = (e: string) => {
        const stringPassword = e
        setConfirmPassword(stringPassword)
        setErrorPassword(false)

        if (stringPassword === password) {
            setValue('password', stringPassword)
            setErrorPassword(false)
        } else if (stringPassword && stringPassword.length > 0 && stringPassword !== password) {
            setErrorPassword(true)
        }
    }

    return (
        <React.Fragment>
            {notifSuccess == true && alertSuccess({ text: 'Lanjut ke proses login', title: 'SiGN UP BERHASIL' })}
            <div className='card bg-white overflow-hidden lg:w-[60%] w-full shadow-lg'>
                <div className="grid ">
                    <div className="min-h-[40vh]">
                        <div className="card-body">
                            <div className="flex gap-5 items-center mb-5">
                                <div className="p-2 rounded-full shadow-md ">
                                    <Image alt='logo' src={logo} className='h-14 w-fit' />
                                </div>
                                <div className="text-4xl text-white drop-shadow-lg uppercase font-bold">Jurusan Ku</div>
                            </div>
                            {notifError &&
                                <div className="p-1 rounded bg-red-600 text-white capitalize mb-1 text-xs w-fit">Akun dengan email, nama pengguna atau noHP sudah terdaftar sebelumnya</div>
                            }
                            <div className="text-gray-900 uppercase font-bold text-2xl">SIGN UP</div>
                            <div className="grid lg:grid-cols-2 gap-3">
                                <div className="form-control">
                                    <div>Nama Lengkap</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <input {...register('fullname', { required: true })} type="text" className="grow" placeholder="Nama Lengkap" />
                                    </label>
                                    {errors.fullname &&
                                        <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit">
                                            Nama lengkap harus di isi
                                        </div>
                                    }
                                </div>
                                <div className="form-control">
                                    <div>Nama Pengguna</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <input
                                            {...register('username', {
                                                required: 'Nama pengguna harus di isi',
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: 'Nama pengguna hanya bisa menggunakan huruf dan angka'
                                                }
                                            })}
                                            type="text" className="grow" placeholder="Nama pengguna" />
                                    </label>
                                    {errors.username &&
                                        <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit">
                                            {errors.username.message}
                                        </div>
                                    }
                                </div>
                                <div className="form-control">
                                    <div>No HP</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <div className="">+62</div>
                                        <input {...register('nohp', { required: true })} type="number" className="grow" placeholder="Nomor Hp" />
                                    </label>
                                    {errors.nohp &&
                                        <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit">
                                            Nomor HP harus di isi
                                        </div>
                                    }
                                </div>
                                <div className="form-control">
                                    <div>Email</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="text" {...register('email', { required: true })} className="grow" placeholder="Email" />
                                    </label>
                                    {errors.email &&
                                        <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit">
                                            Email harus di isi
                                        </div>
                                    }
                                </div>
                                <div className="form-control">
                                    <div>Password</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="grow" placeholder='Password' />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <div>Konfirmasi Password</div>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input onChange={(e) => onChangeConfirmPassword(e.target.value)} type="password" className="grow" placeholder='Konfirmasi Password' />
                                    </label>
                                    {errorPassword === true &&
                                        <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit">
                                            Konfirmasi Password harus sama
                                        </div>
                                    }
                                </div>
                                <div className="lg:col-span-2 flex flex-col gap-3 mt-5">
                                    <button onClick={handleSubmit(onSubmit)} className='btn btn-primary uppercase text-white'>Sign Up</button>
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
        </React.Fragment>
    )
}

export default Section