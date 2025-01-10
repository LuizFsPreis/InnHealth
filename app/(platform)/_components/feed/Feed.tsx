"use client";

import { useEffect, useState } from "react";
import { useApp } from "../../../contexts/ctxHome";
import { Academia } from "@prisma/client";
import CardAcademia from "./CardAcademia";
import Spinner from "../Spinner";
import Divider from '../divider';

export default function Feed() {
  const { searchParam, isSearching, setisSearching } = useApp();
  const [academias, setAcademias] = useState<Academia[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 2;

  useEffect(() => {
    const fetchAcademias = async () => {
      try {
        const res = await fetch(
          `/api/academia?page=${page}&limit=${limit}&param=${searchParam}`
        );

        if (!res.ok) throw new Error("Erro ao carregar lista de academias");

        const data = await res.json();
        setAcademias(data.academias);
        setTotal(data.totalCount);
        setisSearching(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAcademias();
  }, [setisSearching, page, searchParam]);

  // Calcular o número total de páginas
  const totalPages = total / limit;

  return (
    <div className="container mx-auto p-2 bg-white">
      <div className="p-4">
        <Divider titulo="Academias" />
      </div>

      <div className="flex flex-col gap-4 p-4">
        {isSearching ? (
          <Spinner />
        ) : (
          academias.map((academia) => (
            <CardAcademia key={academia.id} academia={academia} />
          ))
        )}
      </div>
      <div className="flex justify-end items-center mt-6 gap-2 p-4">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={() => {
            setPage((prev) => prev + 1)
          }}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-alternateDark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
