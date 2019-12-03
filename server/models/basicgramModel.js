var mongoose = require("mongoose");

var basicgramModel = new mongoose.Schema({
  name: String,
  image: String,
  imageThumbnail: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Basicgram", basicgramModel);
