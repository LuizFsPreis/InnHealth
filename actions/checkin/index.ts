import { createAction } from "./create";
import { findManyAction } from "./find-many";

export const checkinAction = () => {
  return {
    create: createAction,
    findMany: findManyAction
  };
};
