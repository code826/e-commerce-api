import { ObjectId } from "mongodb";
import { getDatabase } from "../../config/mongodb.js";
class CartRepository {
  constructor() {
    this.collectionName = "carts";
  }
  async addToCart(userId, productId, qty) {
    let collection = await getDatabase().collection(this.collectionName);
    // userId, productId ,qty
    //userId,productId --> entry exist we will just update the qty : qty + 10
    //not exits will make a new entry
    let resp = await collection.findOneAndUpdate(
      {
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
      },
      {
        $inc: { qty: qty },
      },
      {
        upsert: true, //insert if not present
        returnDocument: "after", //return updated document
      }
    );
    return resp;
  }
  async get(userId) {
    let collection = await getDatabase().collection(this.collectionName);
    let resp = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return resp;
  }
  async deleteCartForProductId(userId, productId) {
    let collection = await getDatabase().collection(this.collectionName);
    let resp = await collection.deleteOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });
    console.log("resp", resp);
    return resp;
  }
}

export default CartRepository;
