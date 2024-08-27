import express from "express";
import CartController from "./cart.controller.js";
import jwtAuth from "../../middlewares/jwtTokenAuthorization.js";

const router = express.Router();

const cartController = new CartController();

router.get("/", cartController.getCart);

router.post("/", cartController.addToCart);

export default router;
