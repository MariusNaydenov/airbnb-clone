import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coordinates: {
      type: Object,
      required: true,
    },
  },

  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
