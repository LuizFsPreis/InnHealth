'use client'
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LogoutComp() {
  return <Link href="#" onClick={()=>{signOut()}}>Sair</Link>;
}
