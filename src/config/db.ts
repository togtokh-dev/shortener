import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "../util/secrets";
const connectDB = async () => {
  const mongoUrl = MONGODB_URI;
  mongoose.Promise = bluebird;
  try {
    const conn = await mongoose.connect(mongoUrl, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log(`Data base connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${error}`
    );
  }
};
export default connectDB;
