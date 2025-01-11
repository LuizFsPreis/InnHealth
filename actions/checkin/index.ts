import { createAction } from "./create";
import { findManyAction } from "./find-many";
import { finByUserAction } from "./findByUser";
import { findLastCheckinByUser } from "./last";

export const checkinAction = () => {
  return {
    create: createAction,
    findMany: findManyAction,
    finByUser: finByUserAction,
    last: findLastCheckinByUser
  };
};
