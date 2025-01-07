import { isLoggedIn } from "@/lib/auth/session-user";
import type { Metadata } from "next";
import { Unauthenticated } from "./_components/unauthenticated";
import { AppWrapper } from "../contexts/ctxHome";

export const metadata: Metadata = { title: "Autenticação" };

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogged = await isLoggedIn();

  return (
    <>
      <AppWrapper>
        <main className="flex flex-1 flex-col items-center justify-center bg-white">
          <div className="m-4 flex w-full max-w-md flex-col gap-y-4 rounded-xl bg-white p-8 shadow">
            {isLogged ? <Unauthenticated /> : children}
          </div>
        </main>
      </AppWrapper>
    </>
  );
}
