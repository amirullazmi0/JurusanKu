'use client'
import Image from "next/image";
import React from "react";
import iconSuccess from "../../public/ICON/success.webp";

interface propsAlert {
    title?: string,
    text?: string
}
const alertSuccess: React.FC<propsAlert> = ({ title, text }) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen p-4 bg-[#000000c2] flex justify-center items-center z-50">
            <div className="card bg-white lg:md:w-[40%]">
                <div className="card-body flex flex-col justify-center text-center gap-3">
                    <div className="flex justify-center">
                        <Image alt="iconSuccess" src={iconSuccess} className="h-32 w-fit" />
                    </div>
                    <div className="uppercase font-bold text-lime-600 text-2xl">{title}</div>
                    <div className="">{text}</div>
                    <div className="text-lime-600">
                        <span className="loading loading-dots loading-md"></span>
                    </div>
                </div>
            </div>
        </div>
    )
};

const alertError = () => {
    return <div>Alert</div>;
};

export { alertSuccess };
