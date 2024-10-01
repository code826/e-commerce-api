//get

import validator from "validator";
import ProductModel from "./product.model.js";
import { ApplicationError } from "../../applicationError.js";
import ProductRepository from "./product.repository.js";
import productModel from "./product.model.js";

export default class ProductController {
  constructor() {
    this.repository = new ProductRepository();
  }
  async getAllProducts(req, res) {
    this.repository.getAll();
    throw new ApplicationError("test");
    // try {
    //   let products = ProductModel1.getAllProducts();
    //   return res.status(200).json({
    //     success: true,
    //     data: products,
    //   });
    // } catch (error) {
    //   console.log("error", error);
    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal Server Error",
    //   });
    // }
    // let products = await ProductModel.getAllProducts();
    console.log("this", this);
    let products = await this.repository.getAll();
    return res.status(200).json({
      success: true,
      data: products,
    });
  }

  async getProductWithId(req, res) {
    //get the data

    // try {
    //   let { id } = req.params;
    //   //validate the data
    //   id = Number(id);

    //   if (Number.isNaN(id)) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Invalid Product Id",
    //     });
    //   }

    //   let product = ProductModel.getProductWithId(id);
    //   if (!product) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Product Not Found",
    //     });
    //   }

    //   return res.status(200).json({
    //     success: true,
    //     data: product,
    //   });
    // } catch (error) {
    //   console.log("error", error);
    //   return res.status(500).json({
    //     success: false,
    //     message: "Internal Server Error",
    //   });
    // }

    let { id } = req.params;
    //validate the data
    // id = Number(id);

    // if (Number.isNaN(id)) {
    //   throw new ApplicationError("Invalid Product Id", 400);
    // }

    // let product = ProductModel.getProductWithId(id);
    let product = await this.repository.getProductById(id);
    if (!product) {
      throw new ApplicationError("Product Not Found", 400);
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  }

  async addProduct(req, res) {
    try {
      console.log("body", req.body);
      let { name, describtion, category, price, imageUrl, sizes } = req.body;
      var errorMssg = "";
      //validate the data

      if (!name || !describtion || !category || !imageUrl || !sizes) {
        return res.status(400).json({
          success: false,
          message: "Invalid Input",
        });
      }

      if (!validator.isAlpha(name)) {
        return res.status(400).json({
          success: false,
          message: "Name Should Be String",
        });
      }

      if (name.length < 4) {
        errorMssg = `Name Should Have min 3 character you have given ${name.length}`;
        return res.status(400).json({
          success: false,
          message: errorMssg,
        });
      }

      let priceToInsert = Number(price);
      if (Number.isNaN(priceToInsert) || price <= 0) {
        errorMssg = `Price Should be greater than 0`;
        return res.status(400).json({
          success: false,
          message: errorMssg,
        });
      }
      let categories = category.split(",");

      //TODO replace with schema statics
      // if (!ProductModel.isCatgeoryValid(category)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: `Category ${category} Is Not Valid`,
      //   });
      // }

      if (!Array.isArray(sizes)) {
        return res.status(400).json({
          success: false,
          message: "Sizes Should Be Array",
        });
      }
      //["s","m"]
      for (let i = 0; i < sizes.length; i++) {
        //TODO : replace with schema function
        // if (!ProductModel.isSizeValid(sizes[i])) {
        //   return res.status(400).json({
        //     success: false,
        //     message: `Size ${sizes[i]} is not valid `,
        //   });
        // }
      }

      let obj = {
        name: name,
        describtion: describtion,
        categories: categories,
        price: price,
        imageUrl: imageUrl,
        sizes: sizes,
      };

      // let newProduct = await ProductModel.addNewProduct(obj);
      let newProduct = await this.repository.create(obj);
      return res.status(200).json({
        succss: true,
        data: newProduct,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  async filterProduct(req, res) {
    try {
      let { minPrice, maxPrice, category, size } = req.query;

      //validate

      minPrice = Number(minPrice);
      if (Number.isNaN(minPrice) || minPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price Should be Number greater than zero",
        });
      }
      maxPrice = Number(maxPrice);
      if (Number.isNaN(maxPrice) || maxPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price Should be Number greater than zero",
        });
      }
      if (minPrice > maxPrice) {
        return res.status(400).json({
          success: false,
          message: "Min Price Should Be Greater Than Max Price",
        });
      }

      //TODO replace with schema
      // if (!category || !ProductModel.isCatgeoryValid(category)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Category Is Not Valid",
      //   });
      // }

      let products = await this.repository.filterProduct(
        minPrice,
        maxPrice,
        category,
        size
      );

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  async rateProduct(req, res) {
    try {
      let { userId, productId, rating } = req.body;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User Not Found",
        });
      }
      rating = Number(rating);

      if (Number.isNaN(rating) && rating >= 0 && rating <= 10) {
        return res.status(401).json({
          success: false,
          message: "Rating is not valid It is Whole Number from 0 to 10",
        });
      }
      // in the last part

      let resp = await this.repository.rateProduct(userId, productId, rating);
      if (!resp) {
        return res.status(401).json({
          success: false,
          message: "Not Inserted",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          userId: userId,
          productId: productId,
          rating: rating,
        },
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  async rateProductWithAuthenticate(req, res) {
    try {
      let { productId, rating } = req.body;
      console.log("user", req.user);
      let userId = req.user._id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User Not Found",
        });
      }
      rating = Number(rating);

      if (Number.isNaN(rating) && rating >= 0 && rating <= 10) {
        return res.status(401).json({
          success: false,
          message: "Rating is not valid It is Whole Number from 0 to 10",
        });
      }

      let resp = await this.repository.rateProduct(userId, productId, rating);
      if (!resp) {
        return res.status(401).json({
          success: false,
          message: "Not Inserted",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          userId: userId,
          productId: productId,
          rating: rating,
        },
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  testProduct(req, res) {
    return res.status(200).json({
      success: true,
      message: "All Good",
    });
  }
}
