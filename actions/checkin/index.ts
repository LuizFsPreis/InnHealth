import { createAction } from "./create";
import { findManyAction } from "./find-many";
import { finByUserAction } from "./findByUser";

export const checkinAction = () => {
  return {
    create: createAction,
    findMany: findManyAction,
    finByUser: finByUserAction
  };
};
