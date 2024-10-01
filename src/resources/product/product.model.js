import mongoose from "mongoose";

const categories = ["category_a", "category_b", "category_c"];
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  descriptions: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  category: String,
  ratings: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "rating" }],
  },
  sizes: {
    type: [String],
  },
});

const productModel = mongoose.model("product", ProductSchema);

export default productModel;
