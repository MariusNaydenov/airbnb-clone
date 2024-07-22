import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model("Reservations", reservationSchema);

export default Reservation;
