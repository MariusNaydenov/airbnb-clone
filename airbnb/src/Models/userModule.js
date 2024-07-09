import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
    properties: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Property",
        country: {
          type: "String",
          required: true,
        },
        guests: {
          type: "Number",
          required: true,
        },
        rooms: {
          type: "Number",
          required: true,
        },
        bathrooms: {
          type: "Number",
          required: true,
        },
        imageUrl: {
          type: "String",
          required: true,
        },
        user: {
          type: "String",
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        price: {
          type: "Number",
          required: true,
        },
        title: {
          type: "String",
          required: true,
        },
        description: {
          type: "String",
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
