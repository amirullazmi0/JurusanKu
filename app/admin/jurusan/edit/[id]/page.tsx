'use client'
import Navbar from "./../../../Component/Navbar";
import Section from "./Section";

export default function Home({ params }: { params: { id: string } }) {
    return (
        <main className="flex flex-col">
            <Navbar active="jurusan" />
            <Section id={params.id} />
        </main>
    );
}
