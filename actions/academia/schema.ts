import { z } from "zod";

const UsuarioIdSchema = z.object({
  id: z.string({ required_error: "O id é obrigatório" }),
});

export const AcademiaSchema = z.object({
  nome: z
    .string({ required_error: "O nome é obrigatório" })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres" }),

  descricao: z
    .string({ required_error: "A descrição é obrigatória" })
    .min(10, { message: "A descrição deve ter ao menos 10 caracteres" }),

  latitude: z.string(),
  longitude: z.string(),
  telefone: z.string(),
});
