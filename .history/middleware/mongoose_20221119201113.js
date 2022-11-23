import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // if already connected to the database
    return handler(req, res);
  }
  await mongoose.connect("mongodb://127.0.0.1/test");
  return handler(req, res);
};
export default connectDb;
