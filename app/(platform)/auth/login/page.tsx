import { LoginForm } from "../_components/login-form";

export default function Login() {
  return (
    <>
      <span className="text-center font-bold uppercase flex flex-col flex-grow">
        Entrar na sua conta
      </span>

      <LoginForm />
    </>
  );
}
