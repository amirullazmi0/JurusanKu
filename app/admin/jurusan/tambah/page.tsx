'use client'
import CheckAuth from "@/app/Component/CheckAuth";
import AuthAdminProvider from "../../Component/AdminContext";
import Navbar from "./../../Component/Navbar";
import Section from "./Section";

export default function Home() {
    return (
        <AuthAdminProvider>
            <CheckAuth />
            <main className="flex flex-col">
                <Navbar active="jurusan" />
                <Section />
            </main>
        </AuthAdminProvider>
    );
}
