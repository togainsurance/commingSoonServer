const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmailSchema = new Schema({
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Email", EmailSchema);
