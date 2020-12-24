const { Router } = require("express");
const uuidv4 = require("uuid").v4;
const moment = require("moment");
const { readMockFile, writeMockFile } = require("../util/fileHelper");

const router = Router();

const mockFile = "users";

router.get("/test", async (req, res) => {
    const user = await req.context.models.User.findById(req.context.me.id);
    return res.send(user);
});

router.route("/").get((req, res, next) => {
    const users = readMockFile(mockFile);

    res.status(200).json({
        status: "success",
        data: users,
    });
});

// "userId": 1,
// "userId": 2,
// "name": "Triceps Pulldown",
// "type": "lifting",
// "isPublic": true,
// "partsWorked": ["Triceps"]
router.route("/user").post(async (req, res, next) => {
    try {
        const user = req.context.models.User(req.body);
        await user.save();
        res.send(user);
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }

    // const usersJSON = readMockFile(mockFile);

    // const newUsersData = [...usersJSON, newUserData];

    // writeMockFile(mockFile, newUsersData);

    // res.status(200).json({
    //     status: "success",
    //     data: newUserData,
    // });
});

router.route("/user/login").post(async (req, res, next) => {
    try {
        console.log("USERRRRRRR: ", req.body.username);
        if (!req.body.username || !req.body.password) {
            throw new Error("Request must provide username and password");
        }

        req.context.models.User.findOne(
            { username: req.body.username },
            function (err, user) {
                if (err) throw err;

                // test a matching password
                user.comparePassword(req.body.password, function (
                    err,
                    isMatch
                ) {
                    if (err) throw err;
                    console.log(req.body.password, isMatch); // -&gt; Password123: true
                    res.send(user);
                });
            }
        );
    } catch (e) {
        res.send({
            success: false,
            errors: e.stack,
        });
    }
});

router.route("/user/:userId").delete((req, res, next) => {
    const { userId } = req.params;

    const usersJSON = readMockFile(mockFile);

    const foundUserIndex = usersJSON.findIndex(
        (user) => user.userId === userId
    );

    //removeIndexOfFound
    usersJSON.splice(foundUserIndex, 1);

    writeMockFile(mockFile, usersJSON);

    res.status(200).json({
        status: "success",
        data: usersJSON,
    });
});

module.exports = router;
