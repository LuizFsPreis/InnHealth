import { createAction } from './create'
import { findAction } from './find'
import { findManyAction } from './find-many'
import { updateAction } from './update'

export const usuarioAction = () => {
  return {
    create: createAction,
    find: findAction,
    findMany: findManyAction,
    update: updateAction,
  }
}
