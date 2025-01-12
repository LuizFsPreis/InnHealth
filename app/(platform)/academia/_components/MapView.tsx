'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({
  lat = -23.55052,
  lng = -46.633308,
}: {
  lat?: number;
  lng?: number;
}) {
  
  const position: LatLngTuple = [lat, lng];  
  
  return (
    <div className="flex flex-col items-center p-4 w-full">
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
        <Marker
          position={position}
          icon={new L.Icon({
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
        >
          <Popup>Academia se encontra aqui!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
