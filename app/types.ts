import { Academia } from "@prisma/client";
import { ReactNode } from "react";

export interface MapProps {
    setCoordinates: (lat: string, lng: string) => void;
  }
  
export interface CheckinProps{
    isOpen: boolean
    academia: Academia
    toggle: () => void
}

export interface ModalEditPerfilProps {
  isOpen: boolean,
  toggle: () => void
}

export interface WrapperProps {
  children: ReactNode;
}

export interface HomeContextType {
  isSearching: boolean;
  setisSearching: (value: boolean) => void;
  searchParam: string;
  setSearchParam: (value: string) => void;
}
