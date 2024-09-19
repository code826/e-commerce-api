import express from "express";
import CartController from "./cart.controller.js";
import jwtAuth from "../../middlewares/jwtTokenAuthorization.js";

const router = express.Router();

const cartController = new CartController();

router.get("/", (req, res) => {
  cartController.getCart(req, res);
});

router.post("/", jwtAuth, (req, res) => {
  cartController.addToCart(req, res);
});
router.delete("/", jwtAuth, (req, res) => {
  cartController.deleteCartForProduct(req, res);
});

export default router;
