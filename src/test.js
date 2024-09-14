import { ApplicationError } from "./applicationError.js";
import { connectToMongDB } from "./config/mongodb.js";

import ProductRepository from "./resources/product/product.repository.js";
import {
  decodeBase64,
  encodeBase64,
  hashPassword,
  verifyPassword,
} from "./utils.js";

async function init() {
  try {
    let resp = await verifyPassword(
      "1234",
      "$2b$10$wZE1NtEP9Tx3U/tPObuoTuoaEFWWh8Ia.QC48U4cZqp6esDYqTK9u"
    );
    console.log("resp", resp);
  } catch (error) {
    console.log("error", error);
  }
}

init();

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
