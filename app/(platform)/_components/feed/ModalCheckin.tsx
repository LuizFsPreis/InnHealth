import { CheckinProps } from "@/app/types";
import MapView from "../../academia/_components/MapView";
import { useSession } from "next-auth/react";

export default function ModalCheckin({ isOpen, toggle, academia }: CheckinProps) {
  if (!isOpen) return null;

  const { data: session } = useSession();
  const lat = parseFloat(academia.latitude ?? '0');
  const lng = parseFloat(academia.longitude ?? '0');

  const handleCheckin = async () => {
    try {
      const response = await fetch("/api/checkin/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          academiaId: academia.id,
          usuarioId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to perform check-in");
      }

      toggle()
    } catch (error) {
      console.error("Error during check-in:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-1/3 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{academia.nome}</h2>
          <button onClick={toggle} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mt-4">
          <MapView lat={lat} lng={lng} />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCheckin}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            Efetuar Check-in
          </button>
        </div>
      </div>
    </div>
  );
}
