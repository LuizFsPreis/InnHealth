"use client";

import { UserXIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export const Unauthenticated = () => {
  return (
    <>
      <span className="mt-4 text-center uppercase">
        <UserXIcon className="me-2 inline size-5" />
        Usuário já autenticado
      </span>
      <button
        className="mb-8 font-bold uppercase hover:underline"
        onClick={() => signOut()}
      >
        Sair
      </button>
    </>
  );
};
