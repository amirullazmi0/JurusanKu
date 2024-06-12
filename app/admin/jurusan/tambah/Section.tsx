'use client'
import { alertSuccess } from "@/app/Component/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Section = () => {
    const API_URL = process.env.API_URL
    const [notifSuccess, setNotifSuccess] = useState<boolean>(false)
    const navigation = useRouter()

    type Inputs = {
        nama_jurusan?: string
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
        sejarah?: number | null
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({})

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/admin/rekomendasi`, data)

            console.log(response.data);


            if (response.data.data) {
                // setNotifSuccess(true)
                setTimeout(() => {
                    // navigation.push('/admin/jurusan')
                }, 3000);
            }
        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            {notifSuccess && alertSuccess({ title: 'Tambah Jurusan Successfully', text: "Direct to jurusan" })}
            <div className="lg:p-10 p-4">
                <div className="card shadow-lg bg-white lg:w-[60%]">
                    <div className="card-body">
                        <div className="grid lg:grid-cols-3 gap-3">
                            <div className="form-control lg:col-span-2">
                                <label htmlFor="">Nama Jurusan</label>
                                <input {...register("nama_jurusan")} type="text" placeholder="masukan nama jurusan" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="capitalize" htmlFor="">Kategori</label>
                                <select {...register("kategori")} className="select select-bordered w-full">
                                    <option hidden selected>Pilih Kategori</option>
                                    <option value={'IPA'}>IPA</option>
                                    <option value={'IPS'}>IPS</option>
                                </select>
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
                            <div className="form-control">
                                <label className="capitalize" htmlFor="">sejarah</label>
                                <input {...register("sejarah")} type="number" min={0} max={100} placeholder="nilai sejarah" className="input input-bordered w-full" />
                            </div>
                            <div className="lg:col-span-3">
                                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary uppercase text-white w-full">
                                    tambah
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
