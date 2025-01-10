
  
  export default function Divider({ titulo }: {titulo: string}) {
    return (
      <div className="w-full">
        <h1 className="text-xl font-bold text-gray-800">{titulo}</h1>
        <div className="h-0.5 bg-black"></div>
      </div>
    );
  }
  