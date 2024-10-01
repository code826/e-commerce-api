import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    brands: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const catgeoryModel = mongoose.model("category", CategorySchema);

export default catgeoryModel;
