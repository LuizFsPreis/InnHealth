import { getServerSession } from 'next-auth'
import { authConfig } from './auth-config'

export const currentUser = async () => {
  const session = await getServerSession(authConfig)

  return session?.user
}

export const isLoggedIn = async () => {
  const user = await currentUser()
  return !!user || false
}

export const isAdmin = async () => {
  const user = await currentUser()

  return (
    user?.papel === 'Administrador' ? true : false
  )
}
