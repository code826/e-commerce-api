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
}

export default ProductRepository;
