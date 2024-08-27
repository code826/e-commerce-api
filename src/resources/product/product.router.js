import express from "express";
import ProductController from "./product.controller.js";
import basicAuthorizer from "../../middlewares/basicAuthorizer.js";
import jwtAuth from "../../middlewares/jwtTokenAuthorization.js";

const router = express.Router();

const productController = new ProductController();
//product/id --> get,put,delete
//product --> get ,post

///product/

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get All Products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of products.
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
router.get("/", productController.getAllProducts);

// /product/1
// product/1
//product/filter
router.get("/filter", productController.filterProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get Product For Id
 *     description: Product Information For Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Product ID
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.get("/:id", productController.getProductWithId);

//post

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with title, description, price, category, sizes, and image URL.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product data to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product.
 *                 example: "Product"
 *               description:
 *                 type: string
 *                 description: A brief description of the product.
 *                 example: "This is a detailed description of the product."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *                 example: 29.99
 *               category:
 *                 type: string
 *                 description: Category of the product.
 *                 enum:
 *                   - category_a
 *                   - category_b
 *                   - category_c
 *                 example: "category_a"
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Available sizes for the product.
 *                 example: ["S", "M", "L", "XL"]
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 description: URL of the product image.
 *                 example: "http://example.com/product.jpg"
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created product.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the created product.
 *                   example: "Product"
 *                 description:
 *                   type: string
 *                   description: The description of the created product.
 *                   example: "This is a detailed description of the product."
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: The price of the created product.
 *                   example: 29.99
 *                 category:
 *                   type: string
 *                   description: Category of the created product.
 *                   example: "category_a"
 *                 sizes:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Available sizes for the created product.
 *                   example: ["S", "M", "L", "XL"]
 *                 imageUrl:
 *                   type: string
 *                   format: uri
 *                   description: URL of the created product image.
 *                   example: "http://example.com/product.jpg"
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: Server error. Unable to create product.
 */
router.post("/", jwtAuth, productController.addProduct);

//put

router.put("/:id", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "put id request",
  });
});

//delete
router.delete("/:id", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "delete id request",
  });
});

router.post("/rate", productController.rateProduct);
router.post(
  "/rate/authenticate",
  jwtAuth,
  productController.rateProductWithAuthenticate
);
export default router;
