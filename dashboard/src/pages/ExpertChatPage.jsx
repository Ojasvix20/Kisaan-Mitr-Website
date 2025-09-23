// src/pages/ExpertChatPage.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

// Pre-populated messages to make the chat look active
const initialMessages = [
  {
    id: 1,
    text: "Hello! I am Dr. Agrim, your agricultural expert. How can I help you with your crops today?",
    sender: "expert",
  },
  {
    id: 2,
    text: "Feel free to ask about soil health, pest control, or market rates.",
    sender: "expert",
  },
];

// A list of fake replies the expert can send
const fakeReplies = [
  "That's a great question. Based on the season, I would recommend checking the soil moisture twice a day.",
  "For that particular issue, a bio-pesticide made from neem oil is highly effective and eco-friendly.",
  "Could you please upload a photo using the AI Analyzer? That would help me diagnose the problem more accurately.",
  "The current market rate for that crop is quite high. It would be a good time to sell if your harvest is ready.",
  "I understand your concern. Let's look at the sensor data together to see if there are any anomalies.",
];

function ExpertChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    // Add the user's message
    const userMessage = { id: Date.now(), text: newMessage, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Fake a reply from the expert after a short delay
    setTimeout(() => {
      const randomReply =
        fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
      const expertMessage = {
        id: Date.now() + 1,
        text: randomReply,
        sender: "expert",
      };
      setMessages((prev) => [...prev, expertMessage]);
    }, 1500); // 1.5-second delay
  };

  return (
    <Box
      sx={{
        paddingTop: "8rem",
        paddingX: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          maxWidth: "800px",
          width: "100%",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(1, 1, 1, 0.44)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          color: "white",
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            padding: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Chat with an Expert
          </Typography>
        </Box>

        {/* Message List */}
        <List sx={{ flexGrow: 1, overflowY: "auto", padding: "1rem" }}>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: msg.sender === "user" ? "#1976d2" : "#4caf50",
                    }}
                  >
                    {msg.sender === "expert" ? <SupportAgentIcon /> : "You"}
                  </Avatar>
                </ListItemAvatar>
                <Paper
                  sx={{
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    bgcolor: msg.sender === "user" ? "#1976d2" : "#4caf50",
                    color: "white",
                  }}
                >
                  <ListItemText primary={msg.text} />
                </Paper>
              </Box>
            </ListItem>
          ))}
          <div ref={chatEndRef} />
        </List>

        {/* Message Input */}
        <Box
          component="form"
          sx={{
            display: "flex",
            padding: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.18)",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                "&:hover fieldset": { borderColor: "white" },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ ml: 1, p: "15px" }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ExpertChatPage;
