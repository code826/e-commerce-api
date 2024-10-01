import mongoose from "mongoose";
import ratingModel from "../resources/rating/rating.model.js";

//connection
const url = "mongodb://localhost:27017/test_cn";
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
