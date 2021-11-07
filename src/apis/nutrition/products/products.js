const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../../../util/fileHelper");

const router = Router();

const mockFile = "nutrition/products";

router.route("/").get(async (req, res, next) => {
  try {
    const product = req.context.models.Product;
    const products = await product.find({});
    res.send({ success: true, data: products });
  } catch (e) {
    res.send({
      success: false,
      errors: e.stack,
    });
  }
});

// "userId": 1,
// "exerciseId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/product").post(async (req, res, next) => {
  try {
    const product = req.context.models.Product(req.body);
    await product.save();
    res.send({ success: true, data: product });
  } catch (e) {
    console.log("errors", e.errors.name);
    res.send({
      success: false,
      errors: e.stack,
    });
  }
  // const { name, type, isPublic, partsWorked, userId } = req.body;

  // const newProductData = {
  //     exerciseId: uuidv4(),
  //     userId,
  //     name,
  //     type,
  //     isPublic,
  //     partsWorked,
  //     dateCreated: moment().format(),
  // };

  // const productsJSON = readMockFile(mockFile);

  // const newProductsData = [...productsJSON, newProductData];

  // writeMockFile(mockFile, newProductsData);

  // res.status(200).json({
  //     status: "success",
  //     data: newProductData,
  // });
});

router.route("/search").post(async (req, res, next) => {
  if (!req.body.search || req.body.search === null) {
    res.send({ success: false, errors: "Did not provide Search" });
  }

  console.log(req.body.search);

  const productsFound = await req.context.models.Product.search(
    req.body.search
  );

  if (productsFound) {
    res.send({
      success: true,
      data: productsFound,
    });
  } else {
    res.send({
      success: true,
      data: "No Products Found",
    });
  }
});

router.route("/product/:productId").delete((req, res, next) => {
  const { exerciseId } = req.params;

  const productsJSON = readMockFile(mockFile);

  const foundExerciseIndex = productsJSON.findIndex(
    (exercise) => exercise.exerciseId === exerciseId
  );

  //removeIndexOfFound
  productsJSON.splice(foundExerciseIndex, 1);

  writeMockFile(mockFile, productsJSON);

  res.status(200).json({
    status: "success",
    data: productsJSON,
  });
});

module.exports = router;
