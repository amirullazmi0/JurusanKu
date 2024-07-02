'use client'
import { rekomendasiDTO } from "@/model/jurusan.model";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Section = () => {
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')
    const [rekomendasi, setRekomendasi] = useState<rekomendasiDTO[]>([])
    const getRekomendasi = async () => {
        try {
            const response = await axios.get(`${API_URL}/siswa/rekomendasi/score`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })


            if (response.data.status == true) {

                console.log(response.data);

                setRekomendasi(response.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getRekomendasi()
    }, [])
    return (
        <React.Fragment>
            <div className="lg:p-10 p-4 lg:w-[60%]">
                <div className="card shadow bg-white ">
                    <div className="card-body">
                        {rekomendasi && rekomendasi.length > 0 ?
                            <div className="font-bold text-center bg-lime-500 rounded p-2 text-white">REKOMENDASI JURUSAN KAMU</div>
                            :
                            <div className="font-bold text-center bg-warning rounded p-2 ">BELUM ADA REKOMENDASI JURUSAN UNTUK KAMU</div>
                        }
                        <div className="grid lg:grid-cols-3 gap-2">
                            {rekomendasi && rekomendasi.map((item: rekomendasiDTO, index: number) => {
                                const score = item.score && item.score
                                return (
                                    <React.Fragment key={index}>
                                        <div className="card bg-white shadow-lg">
                                            <div className="card-body text-center">
                                                <div className="flex justify-center items-center">
                                                    <div className="text-center uppercase font-bold text-2xl p-2 bg-green-600 aspect-square rounded-full text-white w-12 flex justify-center items-center">{index + 1}</div>
                                                </div>
                                                <hr />
                                                <div className="uppercase font-bold">{item.jurusan}</div>
                                                {/* <div className="text-4xl font-bold">{score}</div> */}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Section;
