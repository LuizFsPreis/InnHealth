import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapProps } from "@/app/types";

export default function Map({ setCoordinates }: MapProps) {
  const [position, setPosition] = useState<[number, number]>([
    -23.55052, -46.633308,
  ]);
  const [address, setAddress] = useState(""); // Estado para o campo de busca de endereço

  // Atualizar a posição do mapa quando as coordenadas mudarem
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (map) {
        map.setView(position);
      }
    }, [map]);

    return null;
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setCoordinates(lat.toString(), lng.toString());
        getAddressFromCoordinates(lat, lng); // Busca endereço via coordenada
      },
    });

    return null;
  };

  // Função para buscar o nome do endereço baseado nas coordenadas
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    );
    const data = await response.json();

    if (data && data.address) {
      const fullAddress = `${data.address.road || ""} ${
        data.address.suburb || ""
      } ${data.address.city || ""} ${data.address.country || ""}`.trim();
      setAddress(fullAddress); // Atualiza o campo de endereço com o nome completo
    } else {
      alert("Endereço não encontrado!");
    }
  };

  const handleSearch = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );

    const data = await response.json();

    if (data && data[0]) {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      setPosition([lat, lng]);
      setCoordinates(lat.toString(), lng.toString());
    } else {
      alert("Endereço não encontrado!");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Digite o endereço"
            className="text-sm rounded-md p-2 w-full md:w-2/3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-alternateDark"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-alternate text-white rounded-md p-2 w-full md:w-1/3 hover:bg-alternateDark shadow-md"
          >
            Buscar no Mapa
          </button>
        </div>
      </div>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        <MapUpdater />
        <Marker
          position={position}
          icon={
            new L.Icon({
              iconUrl:
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })
          }
        >
          <Popup>Academia se encontra aqui!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
