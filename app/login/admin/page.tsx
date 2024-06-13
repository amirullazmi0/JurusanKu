import LoginProvider from "../Component/LoginContext";
import Section from "./Section";

export default function Home() {
  return (
    <LoginProvider>
      <main className="flex min-h-screen items-center justify-center lg:p-24 p-3 bg-tronLogin">
        <Section />
      </main>
    </LoginProvider>
  );
}
