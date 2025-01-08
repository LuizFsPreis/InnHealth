import { createAction } from "./create";
import { findManyAction } from "./find-many";

export const academiaAction = () => {
  return {
    create: createAction,
    findMany: findManyAction,
  };
};
