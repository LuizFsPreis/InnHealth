import { Checkin } from "@prisma/client";

export default function CardChekin({ checkin }: { checkin: Checkin }) {
  return (
    <div className="flex justify-between w-full shadow-md p-4 rounded-lg hover:bg-alternate/50">
      <p>Academia: {checkin.nomeAcademia}</p> <p>Data: {checkin.data.toDateString()}</p>
    </div>
  );
}
