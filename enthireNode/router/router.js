const express = require("express");
let myRouter = express.Router();
let { postData } = require("../controller/controller");
myRouter.route("/").post(postData);
module.exports = myRouter;