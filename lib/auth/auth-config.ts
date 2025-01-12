import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authLoginRoute } from '../routes'
import { isPasswordValid } from './hash'
import { action } from '@/actions'

const ID_CREDENTIALS_PROVIDER: string = 'auth-email-password';

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: authLoginRoute },

  providers: [
    CredentialsProvider({
      id: ID_CREDENTIALS_PROVIDER,
      name: 'Authentication with email and password',
      credentials: { email: { type: 'email' }, password: { type: 'password' } },
      async authorize(credentials) {
        const email = credentials?.email
        const password = credentials?.password

        if (!email || !password) return null

        const user = (await action.usuario().find({ where: { email } })).data

        if (!user) return null

        const isValid = await isPasswordValid(password, user.senha)

        if (!isValid) return null

        return {
          id: user.id,
          name: user.nome,
          email: user.email,
          papel: user.papel,
        } 
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user: { id } }) => {
      const update = { where: { id }, data: { ultimoAcesso: new Date() } }
      return true
    },
    jwt: async ({ token }) => {
      if (token.sub) {
        const existingUser = (
          await action.usuario().find({ where: { id: token.sub } })
        ).data

        if (existingUser) {
          token.name = existingUser.nome
          token.email = existingUser.email
          token.papel = existingUser.papel
        } else delete token.sub
      }
      return token
    },
    session: ({ session, token }) => {
      if (token.sub)
        session.user = {
          id: token.sub,
          name: token.name,
          email: token.email,
          papel: token.papel,
        }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
}

export const handler = NextAuth(authConfig)