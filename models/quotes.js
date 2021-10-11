const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    unique: true,
  },
});

const Quotes = mongoose.model(`Quote`, quoteSchema);

module.exports = Quotes;
