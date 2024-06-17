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
                        <div className="font-bold">REKOMENDASI NILAI</div>
                        <div className="grid lg:grid-cols-3 gap-2">
                            {rekomendasi && rekomendasi.map((item: rekomendasiDTO, index: number) => {
                                const score = item.score && item.score
                                return (
                                    <React.Fragment key={index}>
                                        <div className="card bg-white shadow-lg">
                                            <div className="card-body text-center">
                                                <div className="">{item.jurusan}</div>
                                                <div className="text-4xl font-bold">{score}</div>
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
