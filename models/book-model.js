const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const bookSchema = new Schema({
  // document structure & rules defined here
  title: { type: String, required: true },
  description: { type: String, minlength: 8 },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author", // tells Mongoose that this ID connects to the "Author" model
    required: true
  },
  rating: { type: Number, min: 0, max: 10 },
  reviews: [{
    user: { type: String, required: true },
    comments: { type: String, required: true, maxlength: 200 }
  }]
}, {
  // additional settings for Schema constructor function (class)
  timestamps: true
});

const Book = mongoose.model("Book", bookSchema);


module.exports = Book;
