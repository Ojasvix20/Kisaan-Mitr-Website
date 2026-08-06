import express from "express";

import {
  getChatHistory,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/:sessionId", getChatHistory);

router.post("/", sendMessage);

export default router;