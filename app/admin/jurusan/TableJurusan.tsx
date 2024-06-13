'use client'
import { jurusanDTO } from "@/model/jurusan.model";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

const TableJurusan = () => {
    const [jurusan, setJurusan] = useState<jurusanDTO[]>([])
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const navigation = useRouter()
    const getJurusan = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/rekomendasi`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                setJurusan(response.data.data)
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
                    getJurusan()
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
        getJurusan()
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
                            <th>Jurusan</th>
                            <th>Kategori</th>
                            <th>Matematika</th>
                            <th>Bahasa Indonesia</th>
                            <th>Bahasa Inggris</th>
                            <th>Fisika</th>
                            <th>Kimia</th>
                            <th>Biologi</th>
                            <th>Geografi</th>
                            <th>Ekonomi</th>
                            <th>Sosiologi</th>
                            <th>Sejarah</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {jurusan && jurusan.length > 0 && jurusan.map((item: jurusanDTO, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className="bg-white" >
                                        <th>{index + 1}</th>
                                        <td>{item.nama_juruasan}</td>
                                        <td>{item.kategori}</td>
                                        <td>{item.matematika}</td>
                                        <td>{item.bahasa_indonesia}</td>
                                        <td>{item.bahasa_inggris}</td>
                                        <td>{item.fisika}</td>
                                        <td>{item.kimia}</td>
                                        <td>{item.biologi}</td>
                                        <td>{item.geografi}</td>
                                        <td>{item.ekonomi}</td>
                                        <td>{item.sosiologi}</td>
                                        <td>{item.sejarah}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button onClick={() => navigation.push(`/admin/jurusan/edit/${item.id}`)} className="btn btn-warning">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleAlertDelete(item.id ? item.id : 0)} className="btn btn-error">
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

export default TableJurusan;
