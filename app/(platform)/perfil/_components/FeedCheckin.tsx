"use client";

import { useEffect, useState } from "react";
import { useApp } from "../../../contexts/ctxHome";
import { Checkin } from "@prisma/client";
import Spinner from "../../_components/Spinner";
import CardChekin from "./CardCheckin";
import { useSession } from "next-auth/react";

export default function Feed() {
  const { searchParam, isSearching, setisSearching } = useApp();
  const [checkins, setcheckins] = useState<Checkin[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const session = useSession();

  const limit = 2;

  useEffect(() => {
    const fetchAcademias = async () => {
      try {
        const res = await fetch(`/api/checkin?id=5${session.data?.user?.id}`);

        if (!res.ok) return;

        const data = await res.json();
        setcheckins(data.checkins);
        setTotal(data.totalCount);
        setisSearching(false); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchAcademias();
  }, [page, searchParam]);

  const totalPages = total / limit;

  return (
    <div className="container mx-auto p-2 bg-white">
      <div className="flex flex-col gap-4 p-4">
        {isSearching ? <Spinner /> : checkins.map((checkin) => (
          <CardChekin key={checkin.id} checkin={checkin}/>
        ))}
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
          onClick={() =>{ setPage((prev) => prev + 1); setisSearching(true)}}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-alternateDark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
