import mongoose from "mongoose";

//connection
const url = "mongodb://localhost:27017/test_cn";

export async function connectToMongoDBFromMongoose() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("DB connected");
  } catch (err) {
    throw new Error("Connect to DB server from mongoose failed");
  }
}
