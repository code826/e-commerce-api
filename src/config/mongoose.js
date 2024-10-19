import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//connection
console.log("env", process.env.MONGODB_URL);
const url = process.env.MONGODB_URL;

export async function connectToMongoDBFromMongoose() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
    loadSampleData();
    console.log("sample data loaded");
  } catch (err) {
    console.log("err", err);
    throw new Error("Connect to DB server from mongoose failed");
  }
}

async function loadSampleData() {
  //
  //   let data = await ratingModel.find({});
  //   if (data.length == 0) {
  //     await ratingModel.insertMany([
  //       {
  //         userId: "66e9ad8427ba9e8e80b9efad",
  //         star: 4,
  //       },
  //       {
  //         userId: "66e5bd57b82cca9cc1e708c9",
  //         star: 5,
  //       },
  //     ]);
  //   }
}
