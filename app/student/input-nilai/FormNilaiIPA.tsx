'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Cookies from 'js-cookie'
import { alertSuccess } from "@/app/Component/Alert";

const FormNilaiIPA = () => {
    const navigation = useRouter()
    const [notifSuccess, setNotifSuccess] = useState<boolean>(false)
    const [notifError, setNotifError] = useState<boolean>(false)
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')

    type Inputs = {
        kategori: string
        matematika: number
        bahasa_indonesia: number
        bahasa_inggris: number
        fisika: number
        kimia: number
        biologi: number
        geografi: null
        ekonomi: null
        sosiologi: null
        sejarah: null
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
            kategori: "IPA"
        },
    })


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(access_token);

            const response = await axios.post(`${API_URL}/siswa/nilai`, data
                , {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })

            console.log(response.data);

            if (response.data.status == true) {
                setNotifSuccess(true)
                setTimeout(() => {
                    reset()
                    navigation.push('/student')
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
        } catch (error) {

        }
    }

    return (
        <React.Fragment>
            {notifSuccess && alertSuccess({ title: 'input nilai successfully', text: 'direct to dashboard' })}
            <div className="grid lg:grid-cols-3 lg:gap-4 gap-2 p-4 bg-white rounded-lg shadow-md">
                <div className="lg:col-span-3 font-bold text-xl p-2 bg-success text-white w-fit rounded-lg">
                    MASUKAN NILAI JURUSAN IPA
                </div>
                <div className="form-control">
                    <label htmlFor="">Matematika</label>
                    <input type="number" min={0} max={100} {...register('matematika', { required: 'Nilai matematika harus di isi' })} placeholder="Masukan Nilai" className="input input-bordered w-full" />
                    {errors.matematika &&
                        <div className="p-1 bg-error text-xs text-white rounded mt-2 w-fit">{errors.matematika.message}</div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="">Bahasa Indonesia</label>
                    <input type="number" min={0} max={100} {...register('bahasa_indonesia', { required: 'Nilai bahasa indonesia harus di isi' })} placeholder="Masukan Nilai" className="input input-bordered w-full" />
                    {errors.bahasa_indonesia &&
                        <div className="p-1 bg-error text-xs text-white rounded mt-2 w-fit">{errors.bahasa_indonesia.message}</div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="">Bahasa Inggris</label>
                    <input type="number" min={0} max={100} {...register('bahasa_inggris', { required: 'Nilai bahasa inggris harus di isi' })} placeholder="Masukan Nilai" className="input input-bordered w-full" />
                    {errors.bahasa_inggris &&
                        <div className="p-1 bg-error text-xs text-white rounded mt-2 w-fit">{errors.bahasa_inggris.message}</div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="">Fisika</label>
                    <input type="number" min={0} max={100} {...register('fisika', { required: 'Nilai fisika harus di isi' })} placeholder="Masukan Nilai" className="input input-bordered w-full" />
                    {errors.fisika &&
                        <div className="p-1 bg-error text-xs text-white rounded mt-2 w-fit">{errors.fisika.message}</div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="">Kimia</label>
                    <input type="number" min={0} max={100}  {...register('kimia', { required: 'Nilai kimia harus di isi' })} placeholder="Masukan Nilai" className="input input-bordered w-full" />
                    {errors.kimia &&
                        <div className="p-1 bg-error text-xs text-white rounded mt-2 w-fit">{errors.kimia.message}</div>
                    }
                </div>
                <div className="form-control">
                    <label htmlFor="">Biologi</label>
                    <input type="number" min={0} max={100}  {...register('biologi', { required: 'Nilai biologi harus di isi' })} placeholder="Masukan Nilai" className="input input-bordered w-full" />
                    {errors.biologi &&
                        <div className="p-1 bg-error text-xs text-white rounded mt-2 w-fit">{errors.biologi.message}</div>
                    }
                </div>
                <div className="lg:col-span-3 flex">
                    <hr />
                    <div className="flex justify-center w-full">
                        <button onClick={handleSubmit(onSubmit)} className="btn btn-primary mt-4 text-white uppercase font-bold btn-wide">Submit</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default FormNilaiIPA;
