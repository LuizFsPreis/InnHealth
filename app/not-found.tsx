import Link from "next/link";
import { Header } from "./(platform)/_components/header";
import { Footer } from "./(platform)/_components/footer";

export default async function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex mx-auto justify-center items-center mt-12">
        <div className="bg-white shadow-md p-4 rounded flex w-80 h-60 flex-col items-center space-y-8">
          <strong className="text-lg text-center">
            <h1>Página não encontrada!</h1>
          </strong>
          <p className="text-center">Tente novamente mais tarde...</p>
          <Link
            href="/"
            className="text-center bg-white shadow-md p-4 rounded hover:bg-alternate"
          >
            Retornar à página principal
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
