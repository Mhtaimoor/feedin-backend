const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const env = require("dotenv");
const router = express.Router();

const userRoutes = require("./routes/users");
const brandsRoutes = require("./routes/brands");

env.config();

const app = express();
app.listen(
  process.env.PORT,
  console.log(`Server running on port: ${process.env.PORT}`)
);
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("MongoDB Connection Established")
);

app.get("/", (req, res) => {
  res.send("<h1>Hello to FeedInn API</h1>");
});

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/users", userRoutes);
app.use("/brands", brandsRoutes);
