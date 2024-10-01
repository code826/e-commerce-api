import { ApplicationError } from "../../applicationError.js";
import likeModel from "./like.model.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.repository = new LikeRepository();
  }

  async addLike(req, res) {
    try {
      const { userId, entity_id, docModel } = req.body;

      if (!likeModel.isValidDocModel(docModel)) {
        return res.status(401).json({
          succss: false,
          message: "Invalid Doc Model",
        });
      }

      let data = await this.repository.addLike(entity_id, userId, docModel);
      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      console.log("error", error);
      throw new ApplicationError("entity id validation failed");
      //   return res.status(500).json({
      //     success: false,
      //   });
    }

    //
  }
  async getLike(req, res) {
    const { id } = req.params;

    let data = await this.repository.getLike(id);
    return res.status(200).json({
      success: true,
      data: data,
    });
  }
}
