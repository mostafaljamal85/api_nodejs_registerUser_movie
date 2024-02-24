import { config } from "dotenv";
import { MongoClient } from "mongodb";
config();

let url = process.env.COMPASS_URL;
let url_atlas = process.env.ATLAS_URL;
let mongoclient = new MongoClient(url_atlas);

//function that create connection to mongodb
async function connectDB(ur) {
  try {
    let mongoclient = new MongoClient(ur);
    await mongoclient.connect();
    console.log("connected to mongodb");
    return mongoclient;
  } catch {
    console.log("failled to connect");
  }
}
//function that get all users from mongodb
export async function getallUsers() {
  try {
    //first should trigger functio that make connection with mongodb
    // let mongoC=await connectDB(url_atlas);
    let mongoC = await connectDB(url_atlas);
    //choose which database in mongodb would to connect
    const db = mongoC.db("userauth");
    //choose wich collection(table) in userauth would to connect
    const student_collection = db.collection("users");
    //what would to get from Database
    let result = await student_collection.find({}).toArray();
    return result;
  } finally {
    await mongoclient.close();
  }
}
//function that add new user to mongodb
export async function addNewUser(name) {
  try {
    // let mongoC=await connectDB(url_atlas);
    let mongoC = await connectDB(url_atlas);
    const db = mongoC.db("userauth");
    const student_collection = db.collection("users");
    await student_collection.insertOne(name);
  } finally {
    await mongoclient.close();
  }
}
//function that find user from mongodb
export async function findUser(navn) {
  try {
    let mongoC = await connectDB(url_atlas);
    const db = mongoC.db("userauth");
    const student_collection = db.collection("users");
    let finding = await student_collection
      .find({ email: { $eq: navn } })
      .toArray();
    return finding;
  } finally {
    await mongoclient.close();
  }
}
//function that remove user from mongodb
export async function removeUser(pass) {
  try {
    let mongoC = await connectDB(url_atlas);
    const db = mongoC.db("userauth");
    const student_collection = db.collection("users");
    await student_collection.deleteOne({ password: { $eq: pass } });
  } finally {
    await mongoclient.close();
  }
}
