const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const express = require("express");
const app = express();
const {userRouter} = require("./routes/user");
const auth = require("./routes/auth");
const config=require("config")

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

const privateKey = config.get("privateKey");
if (!privateKey) {
  console.error("FATAL ERROR:Couldnot get private key");
  process.exit(1);
}

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/user/", userRouter);
app.use("/auth", auth);
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
