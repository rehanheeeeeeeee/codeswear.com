// getting-started.js
const mongoose = require("mongoose");

// Schema for the documents that are going to be inside
// of my Forgots collectiom

const ForgotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);
