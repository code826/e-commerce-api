import CartModel from "./cart.model.js";

export default class CartController {
  addToCart(req, res) {
    try {
      const { productId, qty } = req.body;
      let userId = req.user.id;
      let resp = CartModel.addToCart(userId, productId, qty);
      if (!resp["success"]) {
        return res.status(401).json({
          success: false,
          message: resp.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Added to Cart Successfully",
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  getCart(req, res) {
    try {
      let userId = req.user.id;
      let cart = CartModel.getCart(userId);
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
}
