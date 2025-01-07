import { CopyrightIcon } from 'lucide-react'

export const Footer = async () => {

  return (
    <footer className="flex justify-center bg-alternate p-2">
      <span className="text-sm">
        <CopyrightIcon className="me-2 inline size-3" />
        {new Date().getFullYear()} {'TCC do Luizão e do Gabs'} – Todos os
        direitos reservados.
      </span>
    </footer>
  )
}
