// import { MongoClient } from "mongodb"

// let client
// let clientPromise
// const URI = process.env.MONGODB_URI
// const DB = process.env.MONGODB_DB
// const options = {}

// if (!URI || !DB) {
//   throw new Error("Please add your MongoDB URI/DB to the .env file")
// }


// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the MongoClient instance is not recreated.
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(URI, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(URI, options)
//   clientPromise = client.connect()
// }

// async function getDatabase() {
//   const client = await clientPromise
//   return client.db(DB)
// }

// export async function getCollection(collectionName: string) {
//   const db = await getDatabase()
//   return db.collection(collectionName)
// }

// export default getDatabase

import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // check the MongoDB URI
    if (!MONGODB_URI || !MONGODB_DB) {
        throw new Error("Define the MONGODB environmental variable");
    }

    // Connect to cluster
    const client = new MongoClient(MONGODB_URI)
    await client.connect();
    const db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

export const getCollection = async (collectionName: string) => {
    const { db } = await connectToDatabase();
    return db.collection(collectionName);
}