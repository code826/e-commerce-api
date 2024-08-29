import { decodeBase64, encodeBase64 } from "./utils.js";

function init() {
  var obj = [
    { a: "10", b: 20 },
    { a: "10", b: 30 },
  ];
  let newObj = obj.find((o1) => o1.a === "10");
  console.log(newObj);
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
