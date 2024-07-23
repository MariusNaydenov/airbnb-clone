import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MY_URI = process.env.MY_URI;
import Property from "../src/Models/propertyModel.js";
import User from "../src/Models/userModule.js";
import Reservation from "../src/Models/reservationModel.js";

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

app.post("/api/users", async (req, res) => {
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

app.get("/api/users", async (req, res) => {
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

app.post("/api/properties", async (req, res) => {
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

app.get("/api/properties/owner", async (req, res) => {
  try {
    const email = req.query.email;

    const owner = await User.findOne({ email: email });
    res.status(200).json(owner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/remove-property", async (req, res) => {
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

app.post("/api/add-favourite", async (req, res) => {
  const { property, userId } = req.body;

  try {
    const result = await User.findByIdAndUpdate(
      userId,
      { $push: { favourites: property } },
      { safe: true, upsert: true }
    );
    res.status(200).json({ message: "successfully added to favourites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/remove-favourite", async (req, res) => {
  const { property, userId } = req.body;

  try {
    const result = await User.findByIdAndUpdate(userId, {
      $pull: { favourites: { imageUrl: property.imageUrl } },
    });
    res.status(200).json({ message: "Favourite removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/all-properties", async (req, res) => {
  try {
    const properties = await Property.find({});
    res.status(200).json(properties);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/property", async (req, res) => {
  const { id } = req.body;

  try {
    const property = await Property.findOne({
      _id: id,
    });
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404), json({ message: "Property not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/reservations", async (req, res) => {
  const reservation = req.body;

  try {
    const newReservation = await Reservation.create(reservation);
    res.status(200).json({ message: "Reservation successfully added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/reservations", async (req, res) => {
  try {
    const reservation = await Reservation.find({});
    res.status(200).json(reservation);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/cancel-reservation/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Reservation successfully canceled" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while cancelling the reservation" });
  }
});
