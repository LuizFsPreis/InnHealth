"use client";

import { dashboardRoute } from "@/lib/routes";
import { cn } from "@/lib/utlis";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ID_CREDENTIALS_PROVIDER: string = "auth-email-password";
export const LoginForm = () => {
  const router = useRouter();

  const [warn, setWarn] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting: loading },
  } = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    setWarn(undefined);

    const validatedFields = Schema.safeParse(data);

    if (validatedFields.success) {
      const { email, password } = validatedFields.data;

      const res = await signIn(ID_CREDENTIALS_PROVIDER, {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        window.location.href = dashboardRoute;
      } else setWarn("E-mail ou senha incorretos.");
    } else setWarn("Preencha os campos corretamente.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      {warn && (
        <span className="rounded bg-alternate p-2">
          <InfoIcon className="me-2 inline size-4" />
          {warn}
        </span>
      )}

      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="font-bold uppercase">
          E-mail
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="rounded bg-alternate/20 p-2"
          maxLength={50}
          disabled={loading}
        />
        {errors.email && (
          <span className="text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between gap-x-4">
          <label htmlFor="senha" className="font-bold uppercase">
            Senha
          </label>
          <Link href="/esqueceu-senha" className="text-sm hover:underline">
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="relative">
          <input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full rounded bg-alternate/20 p-2 pe-10"
            maxLength={100}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center fill-primary pe-2 *:size-5"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {errors.password && (
          <span className="text-sm">{errors.password.message}</span>
        )}
      </div>
      <button
        type="submit"
        className={cn(
          "rounded-md px-4 py-2 font-bold uppercase duration-300",
          loading ? "bg-alternate" : "bg-primary text-alternate"
        )}
        disabled={loading}
      >
        {loading ? "Carregando..." : "Entrar"}
      </button>
      <Link href="/auth/register" className="duration-300 hover:translate-x-1">
        Cadastre-se &rarr;
      </Link>
    </form>
  );
};

const Schema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
    })
    .email({
      message: "O e-mail é inválido",
    }),
  password: z
    .string({
      required_error: "A senha é obrigatória",
    })
    .min(3, {
      message: "A senha deve ter no mínimo 3 caracteres",
    }),
});
