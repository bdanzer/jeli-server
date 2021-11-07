import { ProgramTC } from "./programsModel";

export const ProgramQuery = {
  programById: ProgramTC.getResolver("findById"),
  programByIds: ProgramTC.getResolver("findByIds"),
  programOne: ProgramTC.getResolver("findOne"),
  programMany: ProgramTC.getResolver("findMany"),
  programCount: ProgramTC.getResolver("count"),
  programConnection: ProgramTC.getResolver("connection"),
  programPagination: ProgramTC.getResolver("pagination"),
};

export const ProgramMutation = {
  programCreateOne: ProgramTC.getResolver("createOne"),
  programCreateMany: ProgramTC.getResolver("createMany"),
  programUpdateById: ProgramTC.getResolver("updateById"),
  programUpdateOne: ProgramTC.getResolver("updateOne"),
  programUpdateMany: ProgramTC.getResolver("updateMany"),
  programRemoveById: ProgramTC.getResolver("removeById"),
  programRemoveOne: ProgramTC.getResolver("removeOne"),
  programRemoveMany: ProgramTC.getResolver("removeMany"),
};
