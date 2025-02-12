import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

let db: Db;
let client: MongoClient;

async function connect() {
  try {
    client = new MongoClient(uri);
    db = client.db("Tokopidia");
    return db;
  } catch (error) {
    console.log("🚀 ~ connect ~ error:", error);
  }
}

const getDb = () => {
  if (!db) connect();

  return db;
};

export { getDb, client };
