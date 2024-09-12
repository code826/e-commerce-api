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

const url = "mongodb://localhost:27017";

let client = null;

async function connectToMongDB() {
  try {
    if (!client) {
      client = new MongoClient(url);
      await client.connect();
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

export { connectToMongDB, getDatabase };
