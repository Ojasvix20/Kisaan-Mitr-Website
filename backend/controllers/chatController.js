import Chat from "../models/Chat.js";
import ai from "../config/gemini.js";
export const getChatHistory = async (req, res) => {
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
};

export const sendMessage = async (req, res) => {
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
};
