import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MY_URI = process.env.MY_URI;
import User from "./src/Models/userModule.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // Change this to the specific origin of your frontend application in production
    methods: ["GET", "POST", "PUT", "DELETE"], // Add other methods as needed
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers as needed
  })
);

mongoose
  .connect(MY_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`App listen on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/users", async (req, res) => {
  const person = req.body;

  try {
    const user = await User.create(person);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  
});
