// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 1. DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 2. DEFINE THE SCHEMA (What does a Chat look like?)
const chatSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [
    {
      role: { type: String, required: true }, // 'user' or 'model'
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- MULTER CONFIGURATION (Memory Storage) ---
// We use memory storage so the file is never saved to your local hard drive.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create the Model
const Chat = mongoose.model("Chat", chatSchema);

// 3. INITIALIZE GEMINI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { timeout: 30000 },
});
// 4. FETCH CHAT HISTORY ROUTE
app.get("/api/chat/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Find the chat document in the database
    const chatDoc = await Chat.findOne({ sessionId });

    // If it doesn't exist yet, just return an empty array
    if (!chatDoc) {
      return res.json({ messages: [] });
    }

    // If it does exist, send the messages array back to React
    res.json({ messages: chatDoc.messages });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to load previous messages." });
  }
});
// 4. THE CHAT ROUTE
app.post("/api/chat", async (req, res) => {
  try {
    // We expect the frontend to send a sessionId now
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res
        .status(400)
        .json({ error: "Message and sessionId are required." });
    }

    // Step A: Find the chat in MongoDB, or create a new one
    let chatDoc = await Chat.findOne({ sessionId });
    if (!chatDoc) {
      chatDoc = new Chat({ sessionId, messages: [] });
    }

    // Step B: Save the user's message to MongoDB
    chatDoc.messages.push({ role: "user", text: message });
    await chatDoc.save();

    // Step C: Format history for Gemini (excluding timestamps)
    const formattedHistory = chatDoc.messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    // Step D: Talk to Gemini
    const chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction:
          "You are Dr. Agrim, an expert agronomist for the Kisaan Mitr platform. " +
          "Provide practical, highly accurate farming advice for Indian farmers.",
      },
      // We pass the history we just pulled from MongoDB!
      history: formattedHistory.slice(0, -1), // Everything except the very last message
    });

    const response = await chatSession.sendMessage({ message: message });

    // Step E: Save the AI's response to MongoDB
    chatDoc.messages.push({ role: "model", text: response.text });
    await chatDoc.save();

    // Step F: Send the response back to React
    res.json({ reply: response.text });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch response from the expert." });
  }
});

const PORT = process.env.PORT || 5000;

// --- IMAGE UPLOAD ROUTE ---
// 'upload.single("image")' tells multer to look for a file attached to the name "image"
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided." });
    }

    // Create a stream to upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "kisaan_mitr_scans" }, // This creates a neat folder in your Cloudinary account
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res
            .status(500)
            .json({ error: "Failed to upload image to cloud." });
        }

        // SUCCESS! Send the secure URL back to React
        res.json({
          message: "Upload successful",
          imageUrl: result.secure_url,
        });
      },
    );

    // Pipe the image buffer from memory directly to Cloudinary
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Server Error during upload:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Kisaan Mitr Backend is running 🚀",
  });
});
app.listen(PORT, () => {
  console.log(`Kisaan Mitr backend running on port ${PORT}`);
});
