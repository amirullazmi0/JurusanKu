'use client'
import Image from "next/image";
import logo from "../public/logo.webp";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigation = useRouter()
  return (
    <main className="bg-tron flex min-h-screen items-center justify-center p-24">
      <div className="font-bold text-white lg:w-[60%] text-center text-[70px] ">
        <div className="flex justify-center">
          <div className="p-3 h-36 overflow-hidden flex justify-center">
            <Image alt="" src={logo} className="h-full w-fit" />
          </div>
        </div>
        <div className="drop-shadow-md lg:text-6xl text-4xl ">YUK CARI TAU JURUSAN MU</div>
        <button onClickCapture={() => navigation.push('/login')} className="btn btn-primary uppercase font-bold text-white">
          Sign In
        </button>
      </div>
    </main>
  );
}
