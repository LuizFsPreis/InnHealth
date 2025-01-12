"use client";
import { AcademiaSchema } from "@/actions/academia/schema";
import dynamic from "next/dynamic";
import { useState } from "react";
import InputMask from "react-input-mask";
import { Alert } from "@nextui-org/alert";

const Map = dynamic(() => import("../_components/map"), { ssr: false });

export default function FormAcademia() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    telefone: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //---------------------------------//
  // Atualiza os dados do formulario //
  //---------------------------------//
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //----------------------------------------//
  // Controla envio dos dados para cadastro //
  //----------------------------------------//
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = AcademiaSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach(
        (err: { path: (string | number)[]; message: string }) => {
          newErrors[err.path[0]] = err.message;
        }
      );
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/api/academia/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlertMessage("Academia cadastrada com sucesso!");
      } else {
        setAlertMessage(`Erro ao cadastrar academia!`);
      }
    } catch (error) {
      setAlertMessage(
        `Erro ao cadastrar academia, tente novamente mais tarde.`
      );
    } finally {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        window.location.reload();
      }, 2000);
    }
  };

  //----------------------------------------------------------------//
  // Seta as cordenadas do form (É passada como referência ao mapa) //
  //----------------------------------------------------------------//
  const setCoordinates = (lat: string, lng: string) => {
    setFormData((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full p-8 px-4 sm:px-8">
      <h1 className="text-center w-full font-bold text-2xl mb-4 ">
        Cadastrar Academia
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-mercury mt-4 rounded-md p-4 sm:p-8 w-full sm:w-2/3 gap-6 sm:gap-8 shadow-md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 md:w-1/2">
              <label className="text-sm text-slate-600">Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome da academia..."
                className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                required
              />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 md:w-1/2">
              <label className="text-sm text-slate-600">Telefone:</label>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
              >
                {(inputProps: any) => (
                  <input
                    {...inputProps}
                    name="telefone"
                    placeholder="Telefone para contato..."
                    className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                    required
                  />
                )}
              </InputMask>
              {errors.telefone && (
                <p className="text-sm text-red-500">{errors.telefone}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-600">Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descrição do estabelecimento..."
              className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
              required
            />
            {errors.descricao && (
              <p className="text-sm text-red-500">{errors.descricao}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-600">Localização:</label>
            <Map setCoordinates={setCoordinates} />
          </div>

          <div className="flex w-full justify-end mt-6">
            <button
              type="submit"
              className="bg-alternate text-white rounded p-2 w-full sm:w-1/3 hover:bg-alternateDark shadow-md"
            >
              Cadastrar
            </button>
          </div>
          {alertVisible && (
        <Alert
          className="relative top-0 left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-md"
          description={alertMessage}
          title="Notificação"
        />
      )}
        </div>
      </form>
    </div>
  );
}
