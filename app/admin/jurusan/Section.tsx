'use client'
import React from "react";
import TableJurusan from "./TableJurusan";
import { useRouter } from "next/navigation";


const Section = () => {
    const navigation = useRouter()
    return (
        <div className="lg:p-10 p-4">
            <div className="card shadow-lg bg-white">
                <div className="card-body">
                    <button onClick={() => navigation.push('/admin/jurusan/tambah')} className="btn btn-primary w-fit uppercase text-white">Tambah Jurusan</button>
                    <div className="mt-5"><TableJurusan /></div>
                </div>
            </div>
        </div>
    )
};

export default Section;
