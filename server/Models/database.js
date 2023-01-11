"use strict";

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://Matthew:Whakedw1@cluster0.men6wel.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to database"));

module.exports = mongoose;
