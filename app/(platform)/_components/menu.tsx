"use client";

import { cn } from "@/lib/utlis";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LogoutComp from "./logout";
import EditPerfil from "./EditPerfil";

export const Menu = ({ children: items }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  return (
    <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between">
      <Link href="/" className="px-6">
        <Image
          src="/icons/INN.png"
          alt="Logo"
          width={178}
          height={100}
        />
      </Link>

      <ul
        className={cn(
          "flex w-full items-center justify-end gap-x-16 bg-mercury p-4 text-center uppercase max-lg:sr-only",
          !isMenuOpen && "max-lg:sr-only"
        )}
      >
        {items}
      </ul>

      <div className="mx-4 flex gap-x-4">
        <button
          className="rounded-full p-2 *:size-6 lg:sr-only"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out lg:sr-only",
          !isMenuOpen && "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed right-px top-0 flex h-full w-full max-w-80 flex-col gap-y-8 bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out lg:sr-only",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex w-full justify-between">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/icons/INN.png"
              alt="Logo"
              width={160}
              height={0}
            />
          </Link>

          <button
            className="rounded-full *:size-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <XIcon />
          </button>
        </div>

        <ul
  className="no-scrollbar flex h-full snap-y flex-col gap-y-4 overflow-y-scroll text-center uppercase *:rounded *:bg-mercury/50 *:px-8 *:py-2"
  onClick={(e) => {
    // Verifica se o clique foi em um link ou fora do EditPerfil
    if (
      e.target instanceof HTMLAnchorElement || 
      (e.target instanceof HTMLElement && !e.target.closest(".edit-perfil"))
    ) {
      setIsMenuOpen(false);
    }
  }}
>
  {items}
  {session.data?.user?.id ? (
    <>
      <li className="hover:font-bold">
        <Link href="/perfil">Meu Perfil</Link>
      </li>
      <li className="hover:font-bold edit-perfil">
        <EditPerfil />
      </li> 
      <LogoutComp />
    </>
  ) : (
    <li className="hover:font-bold">
      <Link href="/auth/login">Login</Link>
    </li>
  )}
</ul>
      </div>
    </nav>
  );
};
