import { ObjectId } from "mongodb";
import { getDatabase, getSession } from "../../config/mongodb.js";
class CartRepository {
  constructor() {
    this.collectionName = "carts";
    this.counterCollection = "counter";
  }
  //   async addToCart(userId, productId, qty) {
  //     //.find({}).toArray().length;//5 --> 6
  //     // find -->
  //     // complex query
  //     //
  //     let db = await getDatabase();
  //     let collection = await db.collection(this.collectionName);
  //     // userId, productId ,qty
  //     //userId,productId --> entry exist we will just update the qty : qty + 10
  //     //not exits will make a new entry
  //     const id = await this.getNextCounter(db);
  //     console.log("id", id);
  //     let resp = await collection.findOneAndUpdate(
  //       {
  //         userId: new ObjectId(userId),
  //         productId: new ObjectId(productId),
  //       },
  //       {
  //         $setOnInsert: { _id: id },
  //         $inc: { qty: qty },
  //       },
  //       {
  //         upsert: true, //insert if not present
  //         returnDocument: "after", //return updated document
  //       }
  //     );
  //     console.log("resp", resp);
  //     if (resp._id == id) {
  //       //insrtion happen
  //       await this.increaseCounter(db);
  //     }

  //     return resp;
  //   }
  async addToCart(userId, productId, qty) {
    try {
      var session = await getSession();
      //start the session
      session.startTransaction();

      let db = getDatabase();
      let collection = await db.collection(this.collectionName);
      const id = await this.getNextCounter(db);
      console.log("id", id);
      let resp = await collection.findOneAndUpdate(
        {
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
        },
        {
          $setOnInsert: { _id: id },
          $inc: { qty: qty },
        },
        {
          upsert: true, //insert if not present
          returnDocument: "after", //return updated document
          session,
        }
      );
      console.log("resp", resp);
      if (resp._id == id) {
        //insrtion happen
        await this.increaseCounter(db, session);
      }

      await session.commitTransaction();
      return resp;
    } catch (error) {
      console.log("err", error);
      await session.abortTransaction();
      //throw new Error("Error In Adding To Cart");
      return null;
    } finally {
      session.endSession();
    }
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
  async getNextCounter(db) {
    let cartCounter = await db
      .collection(this.counterCollection)
      .findOne({ _id: "cart" });
    console.log("rsp", cartCounter);
    return cartCounter.value + 1;
  }
  async increaseCounter(db, session) {
    let cartCounter = await db.collection(this.counterCollection).updateOne(
      { _id: "cart" },
      {
        $inc: { value: 1 },
      },
      {
        session,
      }
    );
    console.log("rsp", cartCounter);
  }
}

export default CartRepository;
