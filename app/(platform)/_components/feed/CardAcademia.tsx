"use client";
import { Academia } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ModalCheckin from "../modals/ModalCheckin";

export default function CardAcademia({ academia }: { academia: Academia }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const session = useSession();

  const MENSAGEM = `Olá, me chamo ${session?.data?.user?.name} e gostaria de entrar em contato com você!`;

  const handleClick = () => {
    setModalOpen(!modalOpen)
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <div
        className="bg-white p-6 rounded-lg shadow-md w-full hover:bg-alternate"
        onClick={handleClick}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold mb-2">{academia.nome}</h1>
          <p className="text-sm text-gray-600">
            Telefone:{" "}
            <a
              href={`https://wa.me/${
                academia.telefone.replace(/\D/g, "")
              }?text=${encodeURIComponent(MENSAGEM)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {academia.telefone}
            </a>
          </p>
        </div>
        <p className="text-gray-700 mb-4">{academia.descricao}</p>
      </div>
      <ModalCheckin isOpen={modalOpen} academia={academia} toggle={toggleModal}/>
    </>
  );
}
