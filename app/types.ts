import { Academia } from "@prisma/client";

export interface MapProps {
    setCoordinates: (lat: string, lng: string) => void;
  }
  
export interface CheckinProps{
    isOpen: boolean
    academia: Academia
    toggle: () => void
}