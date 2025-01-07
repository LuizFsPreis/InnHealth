import { createAction } from './create'
import { deleteAction } from './delete'
import { findAction } from './find'
import { findManyAction } from './find-many'
import { updateAction } from './update'
import { updatePapelAction } from './updTipoUser'

export const usuarioAction = () => {
  return {
    create: createAction,
    delete: deleteAction,
    find: findAction,
    findMany: findManyAction,
    update: updateAction,
    updatPapel: updatePapelAction,
  }
}
