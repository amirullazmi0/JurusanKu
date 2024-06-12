'use client'
import Navbar from "./../Component/Navbar";
import Section from "./Section";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Navbar active="siswa" />
            <Section />
        </main>
    );
}
