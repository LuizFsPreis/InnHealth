import { z } from "zod";

const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/

export const AcademiaSchema = z.object({
  nome: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),

  descricao: z
    .string({ required_error: "A descrição é obrigatória" })
    .min(10, { message: "Descrição inválida" }),
  telefone: z
    .string().regex(regexTelefone, "Número de telefone inválido")
    .min(10, { message: "O telefone deve ter ao menos 10 digitos" }),

  latitude: z.string({ required_error: "O latitude é obrigatório" }),
  longitude: z.string({ required_error: "O longitude é obrigatório" }),
});
