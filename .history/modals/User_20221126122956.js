// getting-started.js
const mongoose = require("mongoose");

// Schema for the documents that are going to be inside
// of my Users collectiom

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address:{type:String,default:''},
    pincode:{type:String,default:''}
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
