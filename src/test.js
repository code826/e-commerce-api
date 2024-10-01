import { ApplicationError } from "./applicationError.js";
import { connectToMongDB, getDatabase, getSession } from "./config/mongodb.js";
import { connectToMongoDBFromMongoose } from "./config/mongoose.js";
import catgeoryModel from "./resources/category/category.model.js";
import productModel from "./resources/product/product.model.js";

import ProductRepository from "./resources/product/product.repository.js";
import {
  decodeBase64,
  encodeBase64,
  hashPassword,
  verifyPassword,
} from "./utils.js";

async function init() {
  try {
    await connectToMongoDBFromMongoose();
    // let data = await productModel.findById("66e30b9fc7d66aa1ed647df8");
    // data.price = 20;
    // await data.save();

    //mongoose document , js object , json document
    //insertOperation(data);
  } catch (error) {
    console.log("err", error);
  }
}

init();

async function insertOperation(data) {
  let product = await catgeoryModel.create(data);
  console.log("operation success", product);
}

async function updateOperation(productId, productData) {
  let product = await productModel.findById(productId);
  product.price = 23;
  product.name = "changed";
  await product.save();
  console.log("operation success", product);
}

async function deleteOperation(productId) {
  let product = await productModel.findByIdAndDelete(productId);
  console.log("operation success", product);
}

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
/**
 *
 * @param {string} name
 * @returns {string}
 */

function sayHello(name) {
  // return "hello " + name;
  return 1;
}

/**
 * specs for get product id
 * 
  * @openapi
  * /api/product/${id}:

  * get:

  *   summary: Get Single Product Of Id You Passed

  *   description: Return Product Information

  *   parameters:

  *     - in: path

  *       name: id

  *       schema:

  *         type: integer

  *       required: true

  *   responses:

  *     200:

  *       description: All Good

  * 

  *     400:

  *       description: Very Bad

  * 

  *     401:

  *       description: Bad

  * 

  *     500:

  *       description: Server Error
 */
