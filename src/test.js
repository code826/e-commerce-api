import { ApplicationError } from "./applicationError.js";
import { decodeBase64, encodeBase64 } from "./utils.js";

function init() {
  try {
    console.log(10);
    throw new ApplicationError("generate new error", 403);
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
