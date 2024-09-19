import { ObjectId } from "mongodb";
import { getDatabase } from "../../config/mongodb.js";
class ProductRepository {
  async getAll() {
    let db = getDatabase();
    let collection = db.collection("products");
    return await collection.find({}).toArray();
  }
  async getProductById(productId) {
    let db = getDatabase();
    let collection = db.collection("products");
    return await collection.findOne({ _id: new ObjectId(productId) });
  }
  async create(productData) {
    let db = getDatabase();
    let collection = db.collection("products");
    let result = await collection.insertOne(productData);
    //console.log(result.ops[0]);
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
    let db = getDatabase();
    let collection = db.collection("products");
    return collection.deleteOne({ _id: new ObjectId(productId) });
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
  async rateProduct(userId, productId, rating) {
    let db = getDatabase();
    let collection = db.collection("products");
    // find the product
    let product = await collection.findOne({ _id: new ObjectId(productId) });

    // look that product has rating for that userId
    let userFound = product?.ratings?.find((item) => item.userId == userId);
    let resp = null;
    collection.findOneAndUpdate();
    //product
    // let ratings = [];
    // product?.ratings?.find((item) => {
    //   if (item.userId == userId) {
    //     ratings.push({
    //       userId: userId,
    //       rating: rating,
    //     });
    //   } else {
    //     ratings.push(item);
    //   }
    // });
    if (userFound) {
      // update the rating
      resp = await collection.updateOne(
        {
          _id: new ObjectId(productId),
          "ratings.userId": new ObjectId(userId),
        },
        {
          $set: {
            "ratings.$.rating": rating,
          },
        }
      );
    } else {
      resp = await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: { ratings: { userId: new ObjectId(userId), rating: rating } },
        }
      );
    }

    return resp?.acknowledged;
  }
}

//return null;
//return [1,2,3];

//return [];
//return [1,2,3];

export default ProductRepository;
