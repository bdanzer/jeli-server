const { ExerciseTC } = require("./exerciseModel");

const ExerciseQuery = {
  exerciseById: ExerciseTC.getResolver("findById"),
  exerciseByIds: ExerciseTC.getResolver("findByIds"),
  exerciseOne: ExerciseTC.getResolver("findOne"),
  exerciseMany: ExerciseTC.getResolver("findMany"),
  exerciseCount: ExerciseTC.getResolver("count"),
  exerciseConnection: ExerciseTC.getResolver("connection"),
  exercisePagination: ExerciseTC.getResolver("pagination"),
};

const ExerciseMutation = {
  exerciseCreateOne: ExerciseTC.getResolver("createOne"),
  exerciseCreateMany: ExerciseTC.getResolver("createMany"),
  exerciseUpdateById: ExerciseTC.getResolver("updateById"),
  exerciseUpdateOne: ExerciseTC.getResolver("updateOne"),
  exerciseUpdateMany: ExerciseTC.getResolver("updateMany"),
  exerciseRemoveById: ExerciseTC.getResolver("removeById"),
  exerciseRemoveOne: ExerciseTC.getResolver("removeOne"),
  exerciseRemoveMany: ExerciseTC.getResolver("removeMany"),
};

module.exports = { ExerciseQuery, ExerciseMutation };
