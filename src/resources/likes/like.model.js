import mongoose from "mongoose";
import productModel from "../product/product.model.js";
import ratingModel from "../rating/rating.model.js";

//
// entity : product , reveiew
// {
//     _id:
//     entity_id :
//post_id:123
//post_id:123 = entity_id ,docModel = 'post' islike =1
// }
const docModels = ["product", "rating"];
const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "docModel",
    },
    docModel: {
      type: String,
      enum: ["product", "rating"],
    },
  },
  {
    timestamps: true,
  }
);

LikeSchema.statics.isValidDocModel = function (docModel) {
  return docModels.includes(docModel);
};

LikeSchema.pre("validate", async function (next) {
  if (this.docModel == "product") {
    let data = await productModel.findById(this.entity_id);
    if (!data) {
      next("we cannot save product Id is not valid");
    }
  }
  if (this.docModel == "rating") {
    let data = await ratingModel.findById(this.entity_id);
    if (!data) {
      next("we cannot save rating Id is not valid");
    }
  }
  next();
});

const likeModel = mongoose.model("like", LikeSchema);

export default likeModel;
