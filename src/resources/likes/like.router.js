import express from "express";
import LikeController from "./like.controller.js";

const router = express.Router();
let likeControllr = new LikeController();

router.post("/", (req, res) => {
  likeControllr.addLike(req, res);
});

router.get("/:id", (req, res) => {
  likeControllr.getLike(req, res);
});

export default router;
