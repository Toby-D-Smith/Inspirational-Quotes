const express = require("express");
const mongoose = require("mongoose");
const Quotes = require("./models/quotes");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

const password = "TobySmith1";
const dbUrl = `mongodb+srv://TobySmith1:${password}@cluster0.niy7y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MondoDB is Connected");
  } catch (error) {
    console.log(error);
  }
};
//Connect to the Database
connectDB();

app.post("/api/newquote", async (req, res) => {
  try {
    await Quotes.create({
      quote: req.body.quote,
    });
    res.json({
      message: "Quote Added",
    });
    console.log(req.body);
  } catch (error) {
    res.json({
      message: "That quote is already added",
    });
  }
});

app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await Quotes.find();
    res.json({
      quote: quotes,
    });
  } catch (error) {
    console.log(error);
  }
});

const Port = 5000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
