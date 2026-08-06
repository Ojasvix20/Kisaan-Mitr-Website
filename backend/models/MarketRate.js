import mongoose from "mongoose";

const marketRateSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      default: "Quintal",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MarketRate", marketRateSchema);