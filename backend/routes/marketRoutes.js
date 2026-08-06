import express from "express";

import {
  getAllRates,
  addRate,
  updateRate,
  deleteRate,
} from "../controllers/marketController.js";

const router = express.Router();

router.get("/", getAllRates);

router.post("/", addRate);

router.put("/:crop", updateRate);

router.delete("/:crop", deleteRate);

export default router;