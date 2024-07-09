import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MY_URI = process.env.MY_URI;
import User from "./src/Models/userModule.js";
import Property from "./src/Models/propertyModel.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

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
    const user = await User.findOne({ email: person.email });
    if (!user) {
      const newUser = await User.create(person);
      res.status(200).json(newUser);
    } else {
      res.status(404).json({ message: "Already has account with this email" });
    }
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ message: `Account with this email ${email} does not exist!` });
      return;
    }

    if (user && user.password === password) {
      res.status(200).json(user);
      return;
    }

    if (user && user.password !== password) {
      res.status(404).json({ message: "Wrong password!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post("/properties", async (req, res) => {
  const property = req.body;

  try {
    const newProperty = await Property.create(property);
    const user = await User.findByIdAndUpdate(
      property.userId,
      { $push: { properties: property } },
      { safe: true, upsert: true }
    );
    res.status(200).json(newProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
