import { z } from 'zod'

const UsuarioIdSchema = z.object({
  id: z.string({ required_error: 'O id é obrigatório' }),
})

export const UsuarioSchema = z.object({
  nome: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),

  email: z
    .string({ required_error: 'O e-mail é obrigatório' })
    .email({ message: 'O e-mail é inválido' })
    .max(50, { message: 'O e-mail deve ter no máximo 50 caracteres' }),

  senha: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(6, { message: 'A nova senha deve ter no mínimo 6 caracteres' })
    .max(50, { message: 'A senha deve ter no máximo 50 caracteres' }),

})

export const UpdTipoUserSchema = z.object({
  id: z
    .string({ required_error: 'O id é obrigatório' }),
  papel: z
    .string({ required_error: 'O papel é obrigatório' })
})

export const UsuarioUpdateSchema = UsuarioIdSchema.merge(
  UsuarioSchema.omit({
    senha: true,
  }).merge(
    z.object({
      novaSenha: z.string().refine(({ length }) => !length || length >= 6, {
        message: 'A nova senha deve ter no mínimo 6 caracteres',
      }),
    }),
  ),
)

export const UsuarioUpsertSchema = z.discriminatedUnion('new', [
  z.object({ new: z.literal(true) }).merge(UsuarioSchema),
  z.object({ new: z.literal(false) }).merge(UsuarioUpdateSchema),
])
