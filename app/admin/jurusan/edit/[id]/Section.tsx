'use client'
import { alertSuccess } from "@/app/Component/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { jurusanDTO } from "@/model/jurusan.model";

interface props {
    id: string
}

const Section: React.FC<props> = ({ id }) => {
    const API_URL = process.env.API_URL
    const [notifSuccess, setNotifSuccess] = useState<boolean>(false)
    const [notifFailed, setNotifFailed] = useState<string | null>(null)
    const navigation = useRouter()
    const access_token = Cookies.get('access_token')

    type Inputs = {
        nama_juruasan?: string
        kategori?: string
        matematika?: number | null
        bahasa_indonesia?: number | null
        bahasa_inggris?: number | null
        fisika?: number | null
        kimia?: number | null
        biologi?: number | null
        geografi?: number | null
        ekonomi?: number | null
        sosiologi?: number | null
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({})

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/rekomendasi/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                const data: jurusanDTO = response.data.data
                setValue('nama_juruasan', data.nama_juruasan)
                setValue('kategori', data.kategori)
                setValue('matematika', data.matematika)
                setValue('bahasa_indonesia', data.bahasa_indonesia)
                setValue('bahasa_inggris', data.bahasa_inggris)
                setValue('fisika', data.fisika)
                setValue('kimia', data.kimia)
                setValue('biologi', data.biologi)
                setValue('ekonomi', data.ekonomi)
                setValue('geografi', data.geografi)
                setValue('sosiologi', data.sosiologi)
            }
        } catch (error) {

        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/admin/rekomendasi/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            //console.log(response.data);


            if (response.data.data) {
                setNotifSuccess(true)
                setTimeout(() => {
                    navigation.push('/admin/jurusan')
                }, 3000);
            }
        } catch (error) {
            const errors: any = error
            if (errors.response.data) {
                setNotifFailed(errors.response.data.message)
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
                setTimeout(() => {
                    setNotifFailed(null)
                }, 5000);
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <React.Fragment>
            {notifSuccess && alertSuccess({ title: 'Update Jurusan Successfully', text: "Direct to jurusan" })}
            <div className="lg:p-10 p-4">
                <div className="card shadow-lg bg-white lg:w-[60%]">
                    <div className="card-body">
                        {notifFailed !== null && <div className="p-2 bg-error text-white rounded-lg">{notifFailed}</div>}
                        <div className="grid lg:grid-cols-3 gap-3">
                            <div className="form-control lg:col-span-2">
                                <label htmlFor="">Nama Jurusan</label>
                                <input {...register("nama_juruasan", { required: 'jurusan harus di isi' })} type="text" placeholder="masukan nama jurusan" className="input input-bordered w-full" />
                                {errors.nama_juruasan &&
                                    <div className="p-1 text-xs bg-error text-white capitalize w-fit rounded mt-2">{errors.nama_juruasan.message}</div>
                                }
                            </div>
                            <div className="form-control">
                                <label className="capitalize" htmlFor="">Kategori</label>
                                <select defaultValue={''} {...register("kategori", { required: 'kategori harus di isi' })} className="select select-bordered w-full">
                                    <option hidden value={''}>Pilih Kategori</option>
                                    <option value={'IPA'}>IPA</option>
                                    <option value={'IPS'}>IPS</option>
                                </select>
                                {errors.kategori &&
                                    <div className="p-1 text-xs bg-error text-white capitalize w-fit rounded mt-2">{errors.kategori.message}</div>
                                }
                            </div>
                            <div className="form-control">
                                <label className="capitalize" htmlFor="">Matematika</label>
                                <input  {...register("matematika")} type="number" min={0} max={100} placeholder="nilai matematika" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="capitalize" htmlFor="">bahasa indonesia</label>
                                <input  {...register("bahasa_indonesia")} type="number" min={0} max={100} placeholder="nilai bahasa indonesia" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="capitalize" htmlFor="">bahasa inggris</label>
                                <input  {...register("bahasa_inggris")} type="number" min={0} max={100} placeholder="nilai bahasa inggris" className="input input-bordered w-full" />
                            </div>
                            {watch('kategori') == 'IPA' &&
                                <React.Fragment>
                                    <div className="form-control">
                                        <label className="capitalize" htmlFor="">fisika</label>
                                        <input  {...register("fisika")} type="number" min={0} max={100} placeholder="nilai fisika" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control">
                                        <label className="capitalize" htmlFor="">kimia</label>
                                        <input  {...register("kimia")} type="number" min={0} max={100} placeholder="nilai kimia" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control">
                                        <label className="capitalize" htmlFor="">biologi</label>
                                        <input  {...register("biologi")} type="number" min={0} max={100} placeholder="nilai biologi" className="input input-bordered w-full" />
                                    </div>
                                </React.Fragment>
                            }
                            {watch('kategori') == 'IPS' &&
                                <React.Fragment>

                                    <div className="form-control">
                                        <label className="capitalize" htmlFor="">geografi</label>
                                        <input {...register("geografi")} type="number" min={0} max={100} placeholder="nilai geografi" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control">
                                        <label className="capitalize" htmlFor="">sosiologi</label>
                                        <input {...register("sosiologi")} type="number" min={0} max={100} placeholder="nilai sosiologi" className="input input-bordered w-full" />
                                    </div>
                                    <div className="form-control">
                                        <label className="capitalize" htmlFor="">ekonomi</label>
                                        <input {...register("ekonomi")} type="number" min={0} max={100} placeholder="nilai ekonomi" className="input input-bordered w-full" />
                                    </div>
                                </React.Fragment>
                            }
                            <div className="lg:col-span-3">
                                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary uppercase text-white w-full">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Section;
