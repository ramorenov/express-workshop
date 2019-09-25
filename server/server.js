"use strict";

const express = require("express");
const app = express();

const formidable = require("express-formidable");
const fs = require("fs");

app.use(express.static("../public"));

app.use(formidable());

app.post("/create-post", function(req, res) {
  //res.send(console.log(req.fields));
  const inputMsg = req.fields;

  fs.readFile("../data/posts.json", function(error, file) {
    const parsedFile = JSON.parse(file);
    const date = Date.now();
    parsedFile[date] = inputMsg.blogpost;
    //console.log(parsedFile);
    const stringifyFile = JSON.stringify(parsedFile);
    console.log(stringifyFile);
    fs.writeFile("../data/posts.json", stringifyFile, function(error) {});
  });
});

app.get("/get-posts", function(req, res) {
  res.sendFile("/Users/octopus/Desktop/CYF/express-workshop/data/posts.json");
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
