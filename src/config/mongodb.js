import { MongoClient } from "mongodb";

// const url = "mongodb://localhost:27017/test_cn";
// connection : mongodb:///127.0.0.1:27017

// const connectToMongoDB = () => {
//   MongoClient.connect(url)
//     .then((client) => {
//       console.log("Mongodb is connected");
//     })
//     .catch((err) => console.log(err));
// };
//mongod --replSet rs0 --port 27017

//const url = "mongodb://localhost:27017";
const url = "mongodb://localhost:27017/test_cn?replicaSet=rs0";

let client = null;

async function connectToMongDB() {
  try {
    if (!client) {
      client = new MongoClient(url);
      await client.connect();
      //await initiateCounter();
      console.log("Connected to MongoDBServer");
    }
  } catch (error) {
    console.log("error", error);
    throw new Error("Mongo DB Server Not Connected");
  }
}

function getDatabase(dbName = "test_cn") {
  if (!client) {
    connectToMongDB();
  }
  return client.db(dbName);
}
//initialis te db connction let's make sure that collection name counter is there
// if it present ok
// if not we need to create collection {_id:'cart',value:0};
//
async function initiateCounter() {
  //let's check data is preesent or not
  let db = getDatabase();
  let cart = await db.collection("counter").findOne({ _id: "cart" });
  if (!cart) {
    await db.collection("counter").insertOne({ _id: "cart", value: 0 });
  }
}
async function getSession() {
  if (!client) {
    await connectToMongDB();
  }
  return client.startSession();
}
async function runTransaction() {
  client = new MongoClient(url);
  await client.connect();
  const session = client.startSession();
  try {
    session.startTransaction();
    let db = client.db("test_cn");
    await db
      .collection("products")
      .insertOne({ name: "db__product1-transaction31" }, { session });
    await db
      .collection("products")
      .insertOne1({ name: "db_____product1-transaction21" }, { session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
    await client.close(); //
  }
}
//runTransaction();

export { connectToMongDB, getDatabase, getSession };
