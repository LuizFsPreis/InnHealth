import { z } from "zod";

export const checkinSchema = z.object({
  usuarioId: z.string(),
  academiaId: z.string(),
  nomeAcademia: z.string(),
});
