import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },

  messages: [
    {
      role: {
        type: String,
        required: true,
      },

      text: {
        type: String,
        required: true,
      },

      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model("Chat", chatSchema);