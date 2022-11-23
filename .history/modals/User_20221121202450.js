// getting-started.js
const mongoose = require("mongoose");

// Schema for the documents that are going to be inside
// of my Users collectiom

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("User", UserSchema);
