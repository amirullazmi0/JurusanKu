'use client'
import Section from "./Section";
import Navbar from "./../Component/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar active="dashboard" />
      <Section />
    </main>
  );
}
