const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT;

app.use(express.static(__dirname));

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
