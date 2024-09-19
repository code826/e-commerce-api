import CartModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";

export default class CartController {
  constructor() {
    this.repository = new CartRepository();
  }
  async addToCart(req, res) {
    try {
      const { productId, qty } = req.body;
      let userId = req.user._id;
      let resp = await this.repository.addToCart(userId, productId, qty);
      if (resp) {
        return res.status(200).json({
          success: true,
          message: "Added to Cart Successfully",
          data: resp,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Unable To Add To Cart",
        });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  async getCart(req, res) {
    try {
      let userId = req.user._id;
      let cart = await this.repository.get(userId);
      console.log("cart", cart);
      return res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  async deleteCartForProduct(req, res) {
    try {
      let userId = req.user._id;
      let { productId } = req.body;
      //productId is present or not
      let resp = await this.repository.deleteCartForProductId(
        userId,
        productId
      );
      if (!resp) {
        return res.status(401).json({
          success: false,
          message: "eror occur",
        });
      }
      return res.status(200).json({
        success: true,
        data: resp,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}
