import MarketRate from "../models/MarketRate.js";

// GET ALL
export const getAllRates = async (req, res) => {
  try {
    const rates = await MarketRate.find().sort({ crop: 1 });

    res.status(200).json(rates);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch market rates.",
    });
  }
};
// ADD NEW
export const addRate = async (req, res) => {
  try {
    const { crop, price, unit } = req.body;

    const existing = await MarketRate.findOne({ crop });

    if (existing) {
      return res.status(400).json({
        message: "Crop already exists.",
      });
    }

    const newRate = new MarketRate({
      crop,
      price,
      unit,
    });

    await newRate.save();

    res.status(201).json(newRate);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add crop.",
    });
  }
};

// UPDATE
export const updateRate = async (req, res) => {
  try {
    const { crop } = req.params;

    const updated = await MarketRate.findOneAndUpdate(
      {
        crop: {
          $regex: new RegExp(`^${crop}$`, "i"),
        },
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updated) {
      return res.status(404).json({
        message: "Crop not found.",
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update crop.",
    });
  }
};

// DELETE
export const deleteRate = async (req, res) => {
  try {
    const { crop } = req.params;

    const deleted = await MarketRate.findOneAndDelete({
      crop: {
        $regex: new RegExp(`^${crop}$`, "i"),
      },
    });
    if (!deleted) {
      return res.status(404).json({
        message: "Crop not found.",
      });
    }

    res.status(200).json({
      message: "Crop deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete crop.",
    });
  }
};
