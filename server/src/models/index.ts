"use strict";

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb+srv://Matthew:Whakedw1@cluster0.men6wel.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected successfully to database');
  } catch (err) {
    console.log('Mongoose connection err: ' + err);
  }
}

connectDB()

export default mongoose;
