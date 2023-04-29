const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const User = require("./models/userSchema");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://team21:team21@cluster0.cewsjb4.mongodb.net/User?retryWrites=true&w=majority",
  console.log("database connected")
);

dotenv.config();
//middlewares
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    return res.json({ status: 200, response: "ok" });
  } catch (err) {
    console.log(err);
    return res.json({ status: 404, error: err.message });
  }
});
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: 200, user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/", (req, res) => {
  res.send("I am here");
});

app.listen(PORT, console.log(`server started at ${PORT}`));
