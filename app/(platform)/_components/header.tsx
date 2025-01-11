import Link from "next/link";
import { isAdmin, isLoggedIn } from "@/lib/auth/session-user";
import { Menu } from "./menu";
import LogoutComp from "./logout";
import EditPerfil from "./EditPerfil";

export const Header = async () => {
  const isloged = await isLoggedIn();
  const Admin = await isAdmin();
  console.log(Admin);
  return (
    <header className="sticky top-0 z-50 bg-mercury shadow-sm">
      <Menu>
        {Admin ? (
          <li className="group">
            <Link href={"/academia/cadastrar"}>Cadastrar Academia</Link>
            <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />
          </li>
        ) : (
          <></>
        )}

        <li className="group relative max-lg:sr-only">
          <div>Perfil</div>
          <div className="h-px w-0 rounded-full bg-primary/80 delay-100 duration-150 group-hover:w-full max-lg:sr-only" />

          <div className="invisible absolute right-0 mt-2 w-60 rounded bg-mercury opacity-0 shadow duration-300 group-hover:visible group-hover:mt-6 group-hover:opacity-100 max-lg:hidden">
            <ul className="m-4 flex flex-col gap-y-4 text-start no-underline">
              <li className="hover:font-bold">
                <Link href="/perfil">{isloged ? "Meu Perfil" : "Entrar"}</Link>
              </li>
              <li className="hover:font-bold">
                {isloged ? <EditPerfil /> : ""}
              </li>

              {isloged ? (
                <li className="hover:font-bold">
                  <LogoutComp />
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </li>
      </Menu>
    </header>
  );
};
