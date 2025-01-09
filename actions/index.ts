import { academiaAction } from './academia'
import { checkinAction } from './checkin'
import { usuarioAction } from './usuario'

export const action = {
    usuario: usuarioAction,
    academia: academiaAction,
    checking: checkinAction
}