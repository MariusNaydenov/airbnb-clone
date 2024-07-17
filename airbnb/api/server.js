import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MY_URI = process.env.MY_URI;
// import User from "./src/Models/userModule.js";
import Property from "../src/Models/propertyModel.js";
import User from "../src/Models/userModule.js";
// import Property from "./src/Models/propertyModel.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
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

app.post("/api/login", async (req, res) => {
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
      { $push: { properties: newProperty } },
      { safe: true, upsert: true }
    );
    res.status(200).json(newProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/properties/owner", async (req, res) => {
  try {
    const email = req.query.email;

    const owner = await User.findOne({ email: email });
    res.status(200).json(owner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/remove-property", async (req, res) => {
  const { id, imageUrl } = req.body;

  try {
    const result = await User.updateOne(
      { "properties._id": id },
      { $pull: { properties: { _id: id } } }
    );

    const property = await Property.findOneAndDelete({ imageUrl: imageUrl });

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Property removed successfully" });
    } else {
      res.status(404).send({ message: "Property not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/add-favourite", async (req, res) => {
  const property = req.body;

  try {
    const result = await User.findByIdAndUpdate(
      property.userId,
      { $push: { favourites: property } },
      { safe: true, upsert: true }
    );
    res.status(200).json({ message: "successfully added to favourites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/remove-favourite", async (req, res) => {
  const property = req.body;

  try {
    const result = await User.findByIdAndUpdate(property.userId, {
      $pull: { favourites: { imageUrl: property.imageUrl } },
    });
    res.status(200).json({ message: "Favourite removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
