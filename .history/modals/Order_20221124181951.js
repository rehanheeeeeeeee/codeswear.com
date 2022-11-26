// getting-started.js
const mongoose = require("mongoose");

// Schema for the documents that are going to be inside
// of my orders collectiom

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
        size: { type: String },
        color: { type: String },
        title: { type: String },
        img: { type: String },
        price: { type: String },
      },
    ],
    address: { type: Object, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
