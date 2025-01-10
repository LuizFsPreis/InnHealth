import { Checkin } from "@prisma/client";

export default function CardCheckin({ checkin }: { checkin: Checkin }) {
  
  const dataFormatada = new Date(checkin.data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex justify-between w-full shadow-md p-4 rounded-lg hover:bg-alternate/50">
      <p>Academia: {checkin.nomeAcademia}</p>
      <p>Data: {dataFormatada}</p>
    </div>
  );
}
