const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    archived: { type: Boolean, default: false },
    messages: [
      {
        sender: { type: String, require: true },
        message: { type: String, require: true },
        date: { type: Date, default:Date.now() },
      },
    ],
  },
  { collection: "chats" }
);

const model = mongoose.model("ChatSchema", Schema);

module.exports = model;
