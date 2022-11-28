import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "../util/secrets";
const connectDB = async () => {
  const mongoUrl = MONGODB_URI;
  mongoose.Promise = bluebird;
  try {
    const conn = await mongoose.connect(mongoUrl, {
      dbName: process.env.MONGODB_dbName,
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log(
      `Data base connected : ${conn.connection.host}@${conn.connection.name}`
    );
  } catch (error) {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${error}`
    );
    process.exit(1);
  }
};
export default connectDB;
