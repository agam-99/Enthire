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
// var serveStatic = require("serve-static");
// app.use(serveStatic(__dirname + "./enthireVue/dist"));
// app.use(express.static(__dirname + "./enthireVue/dist"));
// app.use(express.json());
app.use(express.static("public"));
app.use("/", myRouter);
//These 2 lines make sure that vue and express app are coming from the same server.
// app.use(
//   "/static",
//   express.static(path.join(__dirname, "../public/dist/static/"))
// );
app.get("/", function(req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "../public/dist/") });
});
module.exports = app;
