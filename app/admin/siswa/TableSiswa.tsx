'use client'
import { siswaDTO } from "@/model/siswa.model";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { siswaAdminDTO } from "@/model/siswa.model";

const TableSiswa = () => {
    const [siswa, setsiswa] = useState<siswaAdminDTO[]>([])

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

            if (response.data.data) {
                setsiswa(response.data.data)
            }
        } catch (error) {

        }
    }

    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)
    const handleAlertDelete = async (id: number) => {
        const isConfirmed = window.confirm('Yakin ingin menghapus data ?');

        if (isConfirmed) {
            try {
                const response = await axios.delete(`${API_URL}/admin/rekomendasi/${id}`, {
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
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="">
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Nama Lengkap</th>
                            <th>Nama Pengguna</th>
                            <th>Jenis Kelamin</th>
                            <th>Nomor HP</th>
                            <th>Asal Sekolah</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {siswa && siswa.length > 0 && siswa.map((item: siswaAdminDTO, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className="bg-white" >
                                        <th>{index + 1}</th>
                                        <td>{item.User?.email}</td>
                                        <td>{item.User?.fullname}</td>
                                        <td>{item.User?.username}</td>
                                        <td>{item.siswa?.jenis_kelamin}</td>
                                        <td>+62 {item.User?.nohp}</td>
                                        <td>{item.siswa?.asal_sekolah}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="btn btn-warning">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                                    </svg>
                                                </button>
                                                <button className="btn btn-error">
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
