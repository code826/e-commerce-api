import express from "express";
import ProductController from "./product.controller.js";
import basicAuthorizer from "../../middlewares/basicAuthorizer.js";
import jwtAuth from "../../middlewares/jwtTokenAuthorization.js";

const router = express.Router();

const productController = new ProductController();
/**
 * @openapi
 * /api/product/test:
 *   get:
 *     summary: Just Testing The Product API
 *     description: Prdouct API testing
 *     responses:
 *       200:
 *            description: Success
 *       400:
 *            description: Failed-Bad Authrorization
 *       401:
 *            description: Failed-Bad Request
 *       404:
 *            description: Failed-Page Not Found
 *       500:
 *            description: Failed-Server error
 */

/**
 * specs for test
  * @openapi
  * /api/product/test:

  *   get:

  *     summary: Just Testing The Product API

  *     description: Prdouct API testing

  *     responses:

  *       200:

  *         description: Success

  *       400:

  *         description: Failed-Bad Authrorization

  *       401:

  *         description: Failed-Bad Request

  *       404:

  *         description: Failed-Page Not Found

  *       500:

  *         description: Failed-Server error
 */
router.get("/test", productController.testProduct);

//product/id --> get,put,delete
//product --> get ,post

///product/
/**
 *  specs for get products
  * @openapi
  * /api/product:

  *   get:

  *     summary: Get All Product

  *     description: API To Get All The Product

  *   responses:

  *     200:

  *       description: Success

  *     400:

  *       description: bad request

  *     401:

  *       description: bad authroization

  *     500:

  *       description: server error
 */

//router.get("/", productController.getAllProducts.bind(productController));
router.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});

/**
 * 
 * @openapi
 * /api/filter:

 *   get:

 *     parameters:

 *       - in: query

 *         name: minPrice

 *         type: integer

 *         description: Min Pric Filter

 *       - in: query

 *         name: maxPrice

 *         type: integer

 *         description: Max Pric Filter

 *       - in: query

 *         name: category

 *         type: string

 *         description: Category

 *     responses:

 *       200:

 *         description: All Good

 *       400:

 *         description: Very Bad

 *       401:

 *         description: Bad

 *       500:

 *         description: Server Error
 */

router.get("/filter", productController.filterProduct);

/**
 * @openapi
 * /api/product/{id}:
 *   get:
 *     summary: It Will Return The Prdouct With Id You Provided
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
// router.get("/:id", productController.getProductWithId.bind(productController));
router.get("/:id", (req, res) => {
  productController.getProductWithId(req, res);
});
//passing refernce --> this --> window,undefined , undefined
//this--> productController

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
// router.post("/", productController.addProduct);
router.post("/", (req, res) => {
  productController.addProduct(req, res);
});

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
