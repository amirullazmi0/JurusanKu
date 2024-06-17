'use client'
import AuthAdminProvider from "@/app/admin/Component/AdminContext";
import Navbar from "./../../../Component/Navbar";
import Section from "./Section";
import CheckAuthAdmin from "@/app/admin/Component/CheckAuthAdmin";

export default function Home({ params }: { params: { id: string } }) {
    return (
        <AuthAdminProvider>
            <CheckAuthAdmin />
            <main className="flex flex-col">
                <Navbar active="jurusan" />
                <Section id={params.id} />
            </main>
        </AuthAdminProvider>
    );
}
