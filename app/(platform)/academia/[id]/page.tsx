import { action } from "@/actions"
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../_components/MapView"), { ssr: false });

export default async function Academia( { params }: { params: { id: string } }){
    const academia = await action.academia().find({where:{id: params.id}})
    const lat = parseFloat(academia.data?.latitude ?? '0')
    const lng = parseFloat(academia.data?.longitude ?? '0')
      
    return(
        <div className="flex flex-col items-center w-full p-8 px-4 sm:px-8">
        <h1 className="text-center w-full font-bold text-2xl mb-4 ">
          Cadastrar Academia
        </h1>
        <form
          className="flex flex-col bg-mercury mt-4 rounded-md p-4 sm:p-8 w-full sm:w-2/3 gap-6 sm:gap-8 shadow-md"
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm text-slate-600">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome da academia..."
                  className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm text-slate-600">Telefone:</label>
                <input
                  type="text"
                  name="telefone"
                  placeholder="Telefone para contato..."
                  className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
                />
              </div>
            </div>
  
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-600">Descrição:</label>
              <textarea
                name="descricao"
                placeholder="Descrição do estabelecimento..."
                className="focus:ring-2 focus:ring-alternateDark focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-4 ring-1 ring-slate-200 shadow-sm"
              />
            </div>
  
            <div className="flex flex-col gap-2">
              <label className="text-sm text-slate-600">Localização:</label>
              <MapView lat={lat} lng={lng} />
            </div>
  
            <div className="flex w-full justify-end mt-6">
              <button
                type="submit"
                className="bg-alternate text-white rounded p-2 w-full sm:w-1/3 hover:bg-alternateDark shadow-md"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    )
}