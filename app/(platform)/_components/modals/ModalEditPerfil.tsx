'use client'
import { ModalEditPerfilProps } from "@/app/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Alert } from "@nextui-org/alert";

export default function ModalEditPerfil({
  isOpen,
  toggle,
}: ModalEditPerfilProps) {
  const session = useSession();
  const user = session.data?.user;
  const [formData, setFormData] = useState({
    id: user?.id,
    nome: user?.name ?? "",
    email: user?.email ?? "",
    papel: user?.papel ?? "Usuario",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlertMessage("Perfil atualizado com sucesso!");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000); 
      } else {
        const data = await res.json();
        setAlertMessage(`Erro ao atualizar: ${data.message}`);
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 2000);
      }
    } catch (error) {
      setAlertMessage(`Erro de rede: ${error}`);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-1/3 p-6">
        {alertVisible && (
          <Alert
            className="relative top-0 left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-md"
            description={alertMessage}
            title="Notificação"
          />
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Editar Perfil</h2>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Nome de perfil..."
              className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email..."
              className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="papel">Papel:</label>
            <select
              name="papel"
              value={formData.papel}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
            >
              <option value="Usuario">Usuario</option>
              <option value="Administrador">Administração</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
