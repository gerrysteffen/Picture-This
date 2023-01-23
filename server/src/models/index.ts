"use strict";

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb+srv://pictureThis:5fdMU11hEnKXjcH9@cluster0.ylgcry8.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected successfully to database');
  } catch (err) {
    console.log('Mongoose connection err: ' + err);
  }
}

connectDB()

export default mongoose;
