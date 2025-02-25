import { createAction } from "./create";
import { findAction } from "./find";
import { findManyAction } from "./find-many";

export const academiaAction = () => {
  return {
    create: createAction,
    findMany: findManyAction,
    find: findAction
  };
};
