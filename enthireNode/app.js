const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const myRouter = require("./router/router");
const path=require("path");
app.use(express.static("public"));
app.use("/", myRouter);
app.get("/", function(req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../public/dist/") });
});
module.exports = app;
