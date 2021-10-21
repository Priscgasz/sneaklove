const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
  {
    name: String,
    ref: Date,
    size: Number,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ['men', 'women', 'kids']
    },
    id_tags: [{ 
        type: Schema.Types.ObjectId, 
        ref: "tag" }], 
    }
  )

const sneakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = sneakerModel