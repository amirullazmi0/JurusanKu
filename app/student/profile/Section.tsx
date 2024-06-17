'use client'
import { biodataDTO, siswaDTO } from "@/model/siswa.model";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const Section = () => {
    const [dataSiswa, setDataSiswa] = useState<siswaDTO>()
    const API_URL = process.env.API_URL
    const access_token = Cookies.get('access_token')

    const [notifSuccess, setNotifSuccess] = useState<boolean>(false)
    const navigation = useRouter()

    const [fullname, setfullname] = useState<string | undefined>()
    const [email, setemail] = useState<string | undefined>()
    const [noHp, setnoHp] = useState<number | undefined>()
    const [username, setUsername] = useState<string | undefined>()

    type Inputs = {
        alamat: string
        ttl: string
        jenis_kelamin: string
        agama: string
        asal_sekolah: string
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/siswa/biodata`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.status == true) {
                setNotifSuccess(true)
                getDataSiswa()
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
                setTimeout(() => {
                    setNotifSuccess(false)
                }, 3000)
            }

        } catch (error) {

        }
    }

    const getDataSiswa = async () => {
        try {
            const response = await axios.get(`${API_URL}/siswa/biodata`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (response.data.data) {
                console.log(response.data.data);
                const biodata: biodataDTO = response.data.data
                setUsername(biodata.username)
                setemail(biodata.email)
                setfullname(biodata.fullname)
                setnoHp(biodata.nohp)
                setValue('agama', biodata.agama ? biodata.agama : '')
                setValue('alamat', biodata.alamat ? biodata.alamat : '')
                setValue('asal_sekolah', biodata.asal_sekolah ? biodata.asal_sekolah : '')
                setValue('jenis_kelamin', biodata.jenis_kelamin ? biodata.jenis_kelamin : '')
                setValue('ttl', biodata.ttl ? biodata.ttl : '')
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getDataSiswa()
    }, [])
    return (
        <React.Fragment>
            <div className="lg:p-10 p-4 lg:w-[60%]">
                <div className="card shadow bg-white ">
                    <div className="card-body">
                        {notifSuccess &&
                            <div role="alert" className="alert alert-success text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Data berhasil diupdate</span>
                            </div>
                        }
                        <div className="font-bold">BIODATA</div>
                        <div className="flex">
                            <div className="w-32">Nama Lengkap</div>
                            <div className="pr-2">:</div>
                            <div className="">{fullname}</div>
                        </div>
                        <div className="flex">
                            <div className="w-32">Nama Pengguna</div>
                            <div className="pr-2">:</div>
                            <div className="">{username}</div>
                        </div>
                        <div className="flex">
                            <div className="w-32">Nomor HP</div>
                            <div className="pr-2">:</div>
                            <div className="">62 {noHp}</div>
                        </div>
                        <div className="flex">
                            <div className="w-32">Email</div>
                            <div className="pr-2">:</div>
                            <div className="">{email}</div>
                        </div>
                        <hr className="m-3" />
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className="form-control flex flex-col gap-2">
                                <label htmlFor="">Agama</label>
                                <select {...register('agama', { required: 'agama harus di isi' })} defaultValue={''} className="select select-bordered w-full ">
                                    <option hidden value={''}>Pilih Agama</option>
                                    <option value={'Islam'}>Islam</option>
                                    <option value={'Katolik'}>Katolik</option>
                                    <option value={'Kristen'}>Kristen</option>
                                    <option value={'Hindu'}>Hindu</option>
                                    <option value={'Budha'}>Budha</option>
                                    <option value={'Khonghucu'}>Khonghucu</option>
                                </select>
                                {errors.agama &&
                                    <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit capitalize">
                                        {errors.agama.message}
                                    </div>
                                }
                            </div>
                            <div className="form-control flex flex-col gap-2">
                                <label htmlFor="">Asal Sekolah</label>
                                <input {...register('asal_sekolah', { required: 'asal sekolah harus di isi' })} type="text" placeholder="Masukan asal sekolah" className="input input-bordered w-full " />
                                {errors.asal_sekolah &&
                                    <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit capitalize">
                                        {errors.asal_sekolah.message}
                                    </div>
                                }
                            </div>
                            <div className="form-control flex flex-col gap-2">
                                <label htmlFor="">Tanggal Lahir</label>
                                <input {...register('ttl', { required: 'Tanggal lahir harus di isi' })} type="date" placeholder="Masukan asal sekolah" className="input input-bordered w-full " />
                                {errors.ttl &&
                                    <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit capitalize">
                                        {errors.ttl.message}
                                    </div>
                                }
                            </div>
                            <div className="form-control flex flex-col gap-2">
                                <label htmlFor="">Jenis Kelamin</label>
                                <select {...register('jenis_kelamin', { required: 'Jenis Kelamin harus di isi' })} defaultValue={''} className="select select-bordered w-full ">
                                    <option hidden value={''}>Pilih Jenis Kelamin</option>
                                    <option value={'L'}>Laki-laki</option>
                                    <option value={'P'}>Perempuan</option>
                                </select>
                                {errors.jenis_kelamin &&
                                    <div className="mt-2 text-end p-1 rounded-sm bg-red-600 text-white text-xs w-fit capitalize">
                                        {errors.jenis_kelamin.message}
                                    </div>
                                }
                            </div>
                            <div className="form-control flex flex-col gap-2 lg:col-span-2">
                                <label htmlFor="">Alamat</label>
                                <textarea {...register('alamat')} placeholder="Masukan alamat" className="textarea textarea-bordered w-full" rows={3}></textarea>
                            </div>
                            <div className="lg:col-span-2">
                                <button onClick={handleSubmit(onSubmit)} className="btn btn-primary w-full uppercase text-white">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Section;
