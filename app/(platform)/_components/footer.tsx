import { CopyrightIcon } from "lucide-react";
import React from "react";

export const Footer = async () => {
  return (
    <footer className="flex justify-center bg-mercury p-2">
      <span className="text-sm">
        <CopyrightIcon className="me-2 inline size-3" />
        {new Date().getFullYear()} {"Inn Health"} – Todos os
        direitos reservados.
      </span>
    </footer>
  );
};