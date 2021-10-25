const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
  {
    name: String,
    ref: String,
    size: Number,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ['men', 'women', 'kids']
    },
    id_tags: [{ 
        type: Schema.Types.ObjectId, 
        ref: "tag" 
      }],
      image: {
        type : String,
        default: 'https://images.theconversation.com/files/303723/original/file-20191126-180279-gvmxgl.jpg'
      }
    }
  )

const sneakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = sneakerModel