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
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ReactMarkdown from "react-markdown";

const initialMessages = [
  {
    id: 1,
    text: "Hello! I am Dr. Agrim, your AI agricultural expert. How can I help you with your crops today?",
    sender: "expert",
  },
];

function ExpertChatPage() {
  const SESSION_ID = "farmer_test_session_1";
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  // Fetch previous chat history when the page loads
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/chat/${SESSION_ID}`,
        );

        const data = await response.json();

        // If there are previous messages in the database, format them for the UI
        if (data.messages && data.messages.length > 0) {
          const loadedMessages = data.messages.map((msg, index) => ({
            id: msg._id || Date.now() + index, // Use MongoDB's unique ID
            text: msg.text,
            sender: msg.role === "user" ? "user" : "expert",
          }));

          setMessages(loadedMessages);
        }
      } catch (error) {
        console.error("Could not load chat history:", error);
      }
    };

    loadHistory();
  }, []); // The empty array ensures this only runs ONCE when the page opens
  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // NEW ROBUST MICROPHONE LOGIC
  const handleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser. Please use Chrome or Edge.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "hi-IN";

    recognition.onstart = () => {
      setIsListening(true);
      setNewMessage("");
    };

    recognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setNewMessage(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      // THIS WILL PRINT THE EXACT ERROR IN YOUR TEXT BOX
      setNewMessage(`[Mic Error: ${event.error}]`);

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    if (isListening) recognitionRef.current?.stop();

    const userText = newMessage;
    const userMessage = { id: Date.now(), text: userText, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));



      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          sessionId: SESSION_ID,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const data = await response.json();

      const expertMessage = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "expert",
      };
      setMessages((prev) => [...prev, expertMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, I am having trouble connecting right now.",
          sender: "expert",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(1, 1, 1, 0.44)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          color: "white",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Box
          sx={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SupportAgentIcon fontSize="large" sx={{ color: "#4caf50" }} /> Dr.
            Agrim (AI)
          </Typography>
        </Box>

        <List sx={{ flexGrow: 1, overflowY: "auto", padding: "1.5rem" }}>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                padding: "0 0 1rem 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  maxWidth: "85%",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: msg.sender === "user" ? "#1976d2" : "#4caf50",
                    width: 35,
                    height: 35,
                  }}
                >
                  {msg.sender === "expert" ? (
                    <SupportAgentIcon fontSize="small" />
                  ) : (
                    <PersonIcon fontSize="small" />
                  )}
                </Avatar>
                <Paper
                  sx={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "16px",
                    borderTopLeftRadius:
                      msg.sender === "expert" ? "4px" : "16px",
                    borderTopRightRadius:
                      msg.sender === "user" ? "4px" : "16px",
                    bgcolor:
                      msg.sender === "user"
                        ? "#1976d2"
                        : "rgba(255,255,255,0.08)",
                    color: "white",
                    boxShadow: "none",
                    border:
                      msg.sender === "expert"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "none",
                    "& p": { margin: "0.5rem 0", lineHeight: 1.5 },
                    "& ul, & ol": { margin: "0.5rem 0", paddingLeft: "1.5rem" },
                    "& li": { marginBottom: "0.25rem" },
                  }}
                >
                  {msg.sender === "expert" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>
                      {msg.text}
                    </Typography>
                  )}
                </Paper>
              </Box>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: "flex-start", padding: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "#4caf50", width: 35, height: 35 }}>
                  <SupportAgentIcon fontSize="small" />
                </Avatar>
                <Paper
                  sx={{
                    padding: "0.75rem 1.25rem",
                    borderRadius: "16px",
                    borderTopLeftRadius: "4px",
                    bgcolor: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <CircularProgress size={16} sx={{ color: "#4caf50" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Thinking...
                  </Typography>
                </Paper>
              </Box>
            </ListItem>
          )}
          <div ref={chatEndRef} />
        </List>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          sx={{
            display: "flex",
            padding: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
          }}
        >
          {/* THE MIC BUTTON */}
          <IconButton
            type="button"
            onClick={handleListen}
            color={isListening ? "error" : "primary"}
            disabled={isLoading}
            sx={{
              mr: 1,
              bgcolor: isListening ? "rgba(244, 67, 54, 0.2)" : "transparent",
            }}
          >
            {/* THIS LINE ACTUALLY DRAWS THE ICON */}
            {isListening ? <MicOffIcon /> : <MicIcon />}
          </IconButton>

          <TextField
            fullWidth
            variant="outlined"
            placeholder={
              isListening
                ? "Listening..."
                : "Ask about crops, weather, or market rates..."
            }
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isLoading}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.05)",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&.Mui-focused fieldset": { borderColor: "#4caf50" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isLoading || (!newMessage.trim() && !isListening)}
            sx={{
              ml: 1,
              borderRadius: "8px",
              minWidth: "50px",
              padding: 0,
              height: "40px",
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ExpertChatPage;
