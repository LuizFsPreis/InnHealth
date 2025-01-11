import { CheckinProps } from "@/app/types";
import MapView from "../../academia/_components/MapView";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Alert } from "@nextui-org/alert";
import { useRouter } from "next/navigation";
import { authLoginRoute } from "@/lib/routes";
import Cookies from "js-cookie"; 

export default function ModalCheckin({
  isOpen,
  toggle,
  academia,
}: CheckinProps) {
  const session = useSession();
  const router = useRouter();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  if (!isOpen) return null;

  const lat = parseFloat(academia.latitude ?? "0");
  const lng = parseFloat(academia.longitude ?? "0");

  const handleCheckin = async () => {
    try {
      if (!session.data?.user?.id) router.push(authLoginRoute);

      const checkinCookie = Cookies.get("checkinDate");
      const today = new Date().toISOString().split("T")[0];

      if (checkinCookie === today) {
        setAlertMessage("Check-in já realizado hoje.");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 2000);
        return;
      }

      const response = await fetch(`/api/checkin/status?usuarioId=${session.data?.user?.id}`);
      
      if (!response.ok) {
        console.error("Erro ao consultar o último check-in");
      }

      const lastCheckinData = await response.json();
    

      if (lastCheckinData.status) {
        setAlertMessage("Check-in já realizado hoje.");
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 2000);
        return;
      }


      const res = await fetch("/api/checkin/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          academiaId: academia.id,
          nomeAcademia: academia.nome,
          usuarioId: session.data?.user?.id,
        }),
      });

      if (!res.ok) {
        console.error("Falha ao fazer check-in");
      }

      Cookies.set("checkinDate", today, { expires:  1 });

      setAlertMessage("Check-in realizado com sucesso!");
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        toggle();
      }, 2000);

    } catch (error) {
      setAlertMessage("Erro ao realizar check-in. Tente novamente.");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[80%] md:w-1/3 p-6">
        {alertVisible && (
          <Alert
            className={`relative top-0 left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-md`}
            description={alertMessage}
            title={"Notificação"}
          />
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{academia.nome}</h2>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700"
          >
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
