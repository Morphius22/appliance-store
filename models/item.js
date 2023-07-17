const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  description: { type: String, required: true, minLength: 3, maxLength: 100 },
  price: { type: Number, required: true, min: [0, "Unavailable"], max: 1000 },
  stock: { type: Number, required: true, min: [0, "Out of Stock"], max: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  image: { type: Buffer, required: true, contentType: String },
});

itemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", itemSchema);
