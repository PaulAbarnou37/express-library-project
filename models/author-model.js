const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const authorSchema = new Schema({
  // document structure & rules defined here
  firstName: { type: String, required: true },
  lastName: { type: String },
  nationality: { type: String },
  birthday: { type: Date },
  pictureUrl: { type: String },
}, {
  // additional settings for Schema constructor function (class)
  timestamps: true
});

const Author = mongoose.model("Author", authorSchema);


module.exports = Author;
