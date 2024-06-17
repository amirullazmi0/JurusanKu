'use client'
import { siswaDTO } from "@/model/siswa.model";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { siswaAdminDTO } from "@/model/siswa.model";

const TableSiswa = () => {
    const [siswa, setsiswa] = useState<siswaDTO[]>([])

    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()
    const getSiswa = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/siswa`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            console.log(response.data);


            if (response.data.data) {
                setsiswa(response.data.data)
            }
        } catch (error) {

        }
    }

    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)
    const handleAlertDelete = async (id: any) => {
        const isConfirmed = window.confirm('Yakin ingin menghapus data ?');

        if (isConfirmed) {
            try {
                const response = await axios.delete(`${API_URL}/admin/siswa/${id}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });

                if (response.data.status == true) {
                    getSiswa()
                    setDeleteSuccess(true)
                    window.scroll({
                        top: 0,
                        behavior: 'smooth'
                    })
                    setTimeout(() => {
                        setDeleteSuccess(false)
                    }, 3000);
                }
            } catch (error) {
                //console.error('Error deleting data', error);
            }
        }
    }

    const [alertPassword, setAlertPassword] = useState<boolean>(false)
    const [selectEditPassword, setSelectEditPassword] = useState<siswaDTO>({})

    const handleOpenAlertPassword = (siswa: siswaDTO) => {
        setSelectEditPassword(siswa)
        setAlertPassword(true)
    }
    const handleCloseAlertPassword = () => {
        setSelectEditPassword({})
        setAlertPassword(false)
        setPassword('')
        setConfirmPassword('')
    }
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState<boolean>(false)
    const alertEditPassword = (siswa: siswaDTO) => {
        return (
            <React.Fragment>
                <div className="fixed flex justify-center items-center left-0 top-0 w-screen min-h-screen bg-[#000000c2] z-50 p-4">
                    <div className="card bg-white lg:w-[30%] ws-full">
                        <div className="card-body">
                            <div className="flex justify-end">
                                <button onClick={handleCloseAlertPassword} className="btn btn-ghost btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {updatePasswordSuccess &&
                                <div role="alert" className="alert">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>Update Password Successfully</span>
                                </div>
                            }
                            <div className="">Nama Siswa :  <span className="font-bold capitalize">{siswa.fullname}</span></div>
                            <div className="form-control mt-5 flex flex-col gap-2">
                                <div className="">Password Baru :</div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="grow" placeholder="Masukan Password Baru" />
                                </label>
                            </div>
                            <div className="form-control mt-5 flex flex-col gap-2">
                                <div className="">Konfirmasi Password :</div>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" className="grow" placeholder="Masukan Konfirmasi Password Baru" />
                                </label>
                                {confirmPassword && confirmPassword.length > 0 && password !== confirmPassword &&
                                    <div className="mt-1 rounded-lg bg-red-600 text-xs text-white p-1 w-fit">Konfirmasi Password Salah !</div>
                                }
                                {confirmPassword && confirmPassword.length > 0 && password === confirmPassword &&
                                    <div className="mt-1 rounded-lg bg-lime-600 text-xs text-white p-1 w-fit">Password sudah benar</div>
                                }
                                <div className=""></div>
                            </div>
                            <hr />
                            <div className="flex justify-center">
                                <button onClick={() => handleUpdatePassword(siswa.gid ? siswa.gid : '')} className="btn btn-primary btn-wide text-white">UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const handleUpdatePassword = async (id: string) => {
        if (password && confirmPassword && password === confirmPassword) {
            try {
                const response = await axios.post(`${API_URL}/admin/siswa/${id}`, {
                    password: password,
                    confirm_password: confirmPassword
                }, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

                if (response.data.status == true) {
                    setPassword('')
                    setConfirmPassword('')
                    setUpdatePasswordSuccess(true)
                    setTimeout(() => {
                        setUpdatePasswordSuccess(false)
                    }, 3000);
                }
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        getSiswa()
    }, [])
    return (
        <div className="">
            {deleteSuccess &&
                <div role="alert" className="alert mb-4 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Delete Data Successfully</span>
                </div>
            }
            {alertPassword && alertEditPassword(selectEditPassword)}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="">
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Nama Lengkap</th>
                            <th>Nama Pengguna</th>
                            <th>Nomor HP</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {siswa && siswa.length > 0 && siswa.map((item: siswaDTO, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className="bg-white" >
                                        <th>{index + 1}</th>
                                        <td>{item.email}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.username}</td>
                                        <td><span>+62{item.nohp}</span></td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleOpenAlertPassword(item)} className="btn btn-warning">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleAlertDelete(item.gid ? item.gid : '')} className="btn btn-error">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default TableSiswa;
