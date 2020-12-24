const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../util/fileHelper");

const router = Router();

const mockFile = "sessions";

router.route("/token").get((req, res, next) => {
    const sessions = readMockFile(mockFile);

    res.status(200).json({
        status: "success",
        data: sessions,
    });
});

module.exports = router;
