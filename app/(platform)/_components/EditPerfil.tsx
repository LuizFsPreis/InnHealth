"use client";
import Link from "next/link";
import ModalEditPerfil from "./modals/ModalEditPerfil";
import { useState } from "react";

export default function EditPerfil() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggle = ()=>{
    setIsOpen(!isOpen)
  }
    return (
    <>
      <Link href="#" onClick={() => {toggle()}}>
        Editar Perfil
      </Link>
      <ModalEditPerfil isOpen={isOpen} toggle={toggle}/>
    </>
  );
}
