'use client'
import Section from "./Section";
import Navbar from "./Component/Navbar";
import AuthStudentProvider from "./Component/StudentContext";
import CheckAuth from "./Component/CheckAuthStudent";

export default function Home() {
  return (
    <AuthStudentProvider>
      <CheckAuth />
      <main className="flex flex-col">
        <Navbar active="dashboard" />
        <Section />
      </main>
    </AuthStudentProvider>
  );
}
