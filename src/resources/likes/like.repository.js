import { ApplicationError } from "../../applicationError.js";
import likeModel from "./like.model.js";

class LikeRepository {
  async addLike(entity_id, user_id, docModel) {
    try {
      let data = await likeModel.create({
        user_id: user_id,
        entity_id: entity_id,
        docModel: docModel,
      });
      return data;
    } catch (error) {
      console.log("error -- repo", error);
      throw new Error("error");
    }
    //
  }
  async getLike(likeId) {
    let likeData = await likeModel.findById(likeId).populate("entity_id");
    return likeData;
  }
}

export default LikeRepository;
