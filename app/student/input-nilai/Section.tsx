'use client'
import React, { useEffect, useState } from "react";
import FormNilaiIPA from "./FormNilaiIPA";
import FormNilaiIPS from "./FormNilaiIPS";
import axios from "axios";
import Cookies from "js-cookie";
import { biodataDTO } from "@/model/siswa.model";
const Section = () => {
    const [tab, setTab] = useState<string>('')
    const [renderAlert, setRenderAlert] = useState<boolean>(false)
    const [biodata, setBiodata] = useState<boolean | undefined>(undefined)
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')

    const getNilai = async () => {
        try {
            const response = await axios.get(`${API_URL}/siswa/nilai`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                setTab(response.data.data.kategori)
                console.log(response.data.data.kategori);
            } else if (response.data.data == null) {
                setTab('null')
            }
        } catch (error) {

        }
    }

    const getBiodata = async () => {
        try {
            const response = await axios.get(`${API_URL}/siswa/biodata`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data.biodata) {
                setBiodata(true)
            } else {
                setBiodata(false)
            }
        } catch (error) {

        }
    }

    const updateJurusan = async (e: string) => {
        setRenderAlert(false)
        console.log(e);

        try {
            const response = await axios.post(`${API_URL}/siswa/nilai`, {
                kategori: e,
                matematika: null,
                bahasa_indonesia: null,
                bahasa_inggris: null,
                fisika: null,
                kimia: null,
                biologi: null,
                geografi: null,
                ekonomi: null,
                sosiologi: null,
                sejarah: null
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                setTab(e)
                getNilai()
                getBiodata()
            }
        } catch (error) {

        }
    }

    const renderAlertPilihJurusan = (e: string) => {
        return (
            <div className="fixed top-0 left-0 w-screen h-screen p-4 bg-[#000000c2] flex justify-center items-center z-50">
                <div className="card bg-white lg:md:w-[40%]">
                    <div className="card-body flex flex-col justify-center text-center gap-3">
                        <div className="uppercase font-bold text-black text-2xl">Yakin dengan pilihan jurusan {e} ?</div>
                        <div className="flex justify-center mt-4 gap-3">
                            <button onClick={() => updateJurusan(e)} className="btn btn-primary">Ya</button>
                            <button onClick={() => setRenderAlert(false)} className="btn btn-warning">Batal</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const [choseJurusan, setChoseJurusan] = useState<string>('')
    const handleJurusan = (e: string) => {
        setChoseJurusan(e)
        setRenderAlert(true)
    }

    useEffect(() => {
        getNilai()
        getBiodata()
    }, [])

    return (
        <React.Fragment>
            {renderAlert && renderAlertPilihJurusan(choseJurusan)}
            <div className="lg:p-10 p-4 lg:w-[60%]">
                {biodata == true ?
                    tab == 'null' ?
                        <>
                            <div className="card shadow bg-white">
                                <div className="card-body">
                                    <div className="font-bold">PILIH JURUSAN</div>
                                    <div className="flex gap-2 mt-4 justify-center">
                                        <button onClick={() => handleJurusan('IPA')} className="btn btn-primary text-white uppercase ">IPA</button>
                                        <button onClick={() => handleJurusan('IPS')} className="btn btn-secondary text-white uppercase">IPS</button>
                                    </div>
                                </div>
                            </div>
                        </>
                        : tab == 'IPA' ? <FormNilaiIPA /> : tab == 'IPS' && <FormNilaiIPS />
                    : biodata == false &&
                    <React.Fragment>
                        <div className="card shadow bg-white">
                            <div className="card-body">
                                <div className="font-bold uppercase text-error">Lengkapi data profile terlebih dahulu</div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        </React.Fragment >
    )
};

export default Section;
