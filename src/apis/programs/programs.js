const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../util/fileHelper");

const router = Router();

const mockFile = "programs";

router.route("/").get((req, res, next) => {
  const programs = readMockFile(mockFile);

  res.status(200).json({
    status: "success",
    data: programs,
  });
});

// "userId": 1,
// "programId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/program").post((req, res, next) => {
  const { name, type, isPublic, partsWorked, userId } = req.body;

  const newProgramData = {
    programId: uuidv4(),
    userId,
    name,
    type,
    isPublic,
    partsWorked,
    dateCreated: moment().format(),
  };

  const programsJSON = readMockFile(mockFile);

  const newProgramsData = [...programsJSON, newProgramData];

  writeMockFile(mockFile, newProgramsData);

  res.status(200).json({
    status: "success",
    data: newProgramData,
  });
});

router.route("/program/:programId").delete((req, res, next) => {
  const { programId } = req.params;

  const programsJSON = readMockFile(mockFile);

  const foundProgramIndex = programsJSON.findIndex(
    (program) => program.programId === programId
  );

  //removeIndexOfFound
  programsJSON.splice(foundProgramIndex, 1);

  writeMockFile(mockFile, programsJSON);

  res.status(200).json({
    status: "success",
    data: programsJSON,
  });
});

module.exports = router;
