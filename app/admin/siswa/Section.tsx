'use client'
import React from "react";
import { useRouter } from "next/navigation";
import TableSiswa from "./TableSiswa";


const Section = () => {
    const navigation = useRouter()
    return (
        <div className="lg:p-10 p-4">
            <div className="card shadow-lg bg-white">
                <div className="card-body">
                    <div className="mt-5"><TableSiswa /></div>
                </div>
            </div>
        </div>
    )
};

export default Section;
