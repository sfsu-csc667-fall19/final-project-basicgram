var mongoose = require("mongoose");

var basicgramModel = new mongoose.Schema({
  caption: String,
  image: String,
  imageThumbnail: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

module.exports = mongoose.model("Basicgram", basicgramModel);
