const { Router } = require('express');
const uuidv4 = require('uuid').v4;
const moment = require('moment');

const router = Router();

router.route('/').get(async (req, res, next) => {
    try {
        const meal = req.context.models.Meal;
        const meals = await meal.find({}).populate('meal.product');
        res.send({ success: true, data: meals });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

// "userId": 1,
// "mealId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route('/meal').post(async (req, res, next) => {
    try {
        const meal = req.context.models.Meal(req.body);
        await meal.save();
        res.send({ success: true, data: meal });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
    // const { name, type, isPublic, partsWorked, userId } = req.body;

    // const newMealData = {
    //     mealId: uuidv4(),
    //     userId,
    //     name,
    //     type,
    //     isPublic,
    //     partsWorked,
    //     dateCreated: moment().format(),
    // };

    // const mealsJSON = readMockFile(mockFile);

    // const newMealsData = [...mealsJSON, newMealData];

    // writeMockFile(mockFile, newMealsData);

    // res.status(200).json({
    //     status: "success",
    //     data: newMealData,
    // });
});

router.route('/search').get(async (req, res, next) => {
    console.log('=======PARAMS======', req.query);
    const { mealName } = req.query;
    if (!mealName || mealName === null) {
        res.send({ success: false, errors: 'Did not provide Search' });
    }

    console.log(mealName);

    try {
        const mealsFound = await req.context.models.Meal.search(mealName);

        if (mealsFound) {
            res.send({
                success: true,
                data: mealsFound,
            });
        } else {
            res.send({
                success: true,
                data: 'No Meals Found',
            });
        }
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

router.route('/meal/:mealId').delete(async (req, res, next) => {
    const { mealId } = req.params;

    try {
        const meal = req.context.models.Meal;
        const mealDeleted = await meal.deleteOne({ _id: mealId });
        res.send({ success: true, data: mealDeleted });
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

module.exports = router;
