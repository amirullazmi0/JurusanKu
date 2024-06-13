'use client'
import AuthAdminProvider from "../Component/AdminContext";
import CheckAuthAdmin from "../Component/CheckAuthAdmin";
import Navbar from "./../Component/Navbar";
import Section from "./Section";

export default function Home() {
    return (
        <AuthAdminProvider>
            <CheckAuthAdmin />
            <main className="flex flex-col">
                <Navbar active="siswa" />
                <Section />
            </main>
        </AuthAdminProvider>
    );
}
