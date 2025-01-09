import { z } from "zod";

const UsuarioIdSchema = z.object({
  id: z.string({ required_error: "O id é obrigatório" }),
});

export const checkinSchema = z.object({
  usuarioId: z.string(),
  academiaId: z.string()
});
