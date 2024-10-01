import { ObjectId } from "mongodb";
import { getDatabase } from "../../config/mongodb.js";
import productModel from "./product.model.js";
import mongoose from "mongoose";
import ratingModel from "../rating/rating.model.js";
class ProductRepository {
  async getAll() {
    try {
      let products = await productModel.find({});
      //products.
      return products;
    } catch (error) {
      console.log("error", error);
      throw new Error("Error while finding product");
    }
  }
  async getProductById(productId) {
    let product = await productModel.findById(productId).populate({
      path: "ratings",
      select: ["userId", "productId", "star"],
      populate: {
        path: "productId",
        select: ["name"],
      },
    });

    return product;
  }
  async create(productData) {
    //  productData.categories = categories;
    let result = await productModel.create(productData);
    return result;
  }

  async update(productId, productData) {
    let db = getDatabase();
    let collection = db.collection("products");
    return collection.updateOne(
      { _id: new ObjectId(productId) },
      { $set: productData },
      {
        returnOriginal: false,
      }
    );
  }
  async delete(productId) {
    let product = await productModel.findByIdAndDelete(productId);
    return product;
  }

  async filterProduct(minPrice, maxPrice, category, size) {
    //
    //$and : [{price >= minPrice},{price >= maxPrice},{category:''},{sizes:{$in:''}}]
    let filterCondition = {};
    let filterAndCondition = [];
    if (minPrice) {
      filterAndCondition.push({ price: { $gte: minPrice } });
    }
    if (maxPrice) {
      filterAndCondition.push({ price: { $lte: maxPrice } });
    }
    if (category) {
      filterAndCondition.push({ category: category });
    }
    if (size) {
      filterAndCondition.push({ sizes: { $in: size } });
    }

    if (filterAndCondition.length > 0) {
      filterCondition = { $and: filterAndCondition };
    }
    console.log(filterCondition);

    let db = getDatabase();
    let collection = db.collection("products");
    return collection.find(filterCondition).toArray();
  }
  //   async rateProduct(userId, productId, rating) {
  //     let db = getDatabase();
  //     let collection = db.collection("products");
  //     // find the product
  //     let product = await collection.findOne({ _id: new ObjectId(productId) });

  //     // look that product has rating for that userId
  //     let userFound = product?.ratings?.find((item) => item.userId == userId);
  //     let resp = null;
  //     collection.findOneAndUpdate();
  //     //product
  //     // let ratings = [];
  //     // product?.ratings?.find((item) => {
  //     //   if (item.userId == userId) {
  //     //     ratings.push({
  //     //       userId: userId,
  //     //       rating: rating,
  //     //     });
  //     //   } else {
  //     //     ratings.push(item);
  //     //   }
  //     // });
  //     if (userFound) {
  //       // update the rating
  //       resp = await collection.updateOne(
  //         {
  //           _id: new ObjectId(productId),
  //           "ratings.userId": new ObjectId(userId),
  //         },
  //         {
  //           $set: {
  //             "ratings.$.rating": rating,
  //           },
  //         }
  //       );
  //     } else {
  //       resp = await collection.updateOne(
  //         { _id: new ObjectId(productId) },
  //         {
  //           $push: { ratings: { userId: new ObjectId(userId), rating: rating } },
  //         }
  //       );
  //     }

  //     return resp?.acknowledged;
  //   }
  async rateProduct(userId, productId, star) {
    // find any rating has already been given by same user to same product
    let ratingData = await ratingModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (ratingData) {
      //data existed just updated the start
      ratingData.star = star;
      await ratingData.save();
      return true;
    }
    ratingData = await ratingModel.create({
      userId: userId,
      productId: productId,
      star: star,
    });
    // need to add rating
    await productModel.findByIdAndUpdate(productId, {
      $push: { ratings: ratingData._id },
    });
    // let product = await productModel.findById(productId);
    // product.ratings.push(ratingData._id);
    // await product.save();

    return true;
  }
}

//return null;
//return [1,2,3];

//return [];
//return [1,2,3];

export default ProductRepository;
