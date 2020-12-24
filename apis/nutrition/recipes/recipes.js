const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../../util/fileHelper");

const router = Router();

const mockFile = "nutrition/recipes";

router.route("/").get((req, res, next) => {
    const recipes = readMockFile(mockFile);

    res.status(200).json({
        status: "success",
        data: recipes,
    });
});

// "userId": 1,
// "exerciseId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/recipe").post(async (req, res, next) => {
    try {
        const recipe = req.context.models.Recipe(req.body);
        await recipe.save();
        res.send({ success: true, data: recipe });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
    // const { name, type, isPublic, partsWorked, userId } = req.body;

    // const newRecipeData = {
    //     exerciseId: uuidv4(),
    //     userId,
    //     name,
    //     type,
    //     isPublic,
    //     partsWorked,
    //     dateCreated: moment().format(),
    // };

    // const recipesJSON = readMockFile(mockFile);

    // const newRecipesData = [...recipesJSON, newRecipeData];

    // writeMockFile(mockFile, newRecipesData);

    // res.status(200).json({
    //     status: "success",
    //     data: newRecipeData,
    // });
});

router.route("/search").post(async (req, res, next) => {
    if (!req.body.search || req.body.search === null) {
        res.send({ success: false, errors: "Did not provide Search" });
    }

    console.log(req.body.search);

    const recipesFound = await req.context.models.Recipe.search(
        req.body.search
    );

    if (recipesFound) {
        res.send({
            success: true,
            data: recipesFound,
        });
    } else {
        res.send({
            success: true,
            data: "No Recipes Found",
        });
    }
});

router.route("/recipe/:recipeId").delete((req, res, next) => {
    const { exerciseId } = req.params;

    const recipesJSON = readMockFile(mockFile);

    const foundExerciseIndex = recipesJSON.findIndex(
        (exercise) => exercise.exerciseId === exerciseId
    );

    //removeIndexOfFound
    recipesJSON.splice(foundExerciseIndex, 1);

    writeMockFile(mockFile, recipesJSON);

    res.status(200).json({
        status: "success",
        data: recipesJSON,
    });
});

module.exports = router;
