// src/pages/CropAnalyzerPage.jsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import rabiImage from '../assets/images/Rabi.jpg';
import kharifImage from '../assets/images/Kharif.png';
import zaidImage from '../assets/images/Zaid.jpg';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Step 1: Import Teachable Machine libraries
import * as tmImage from "@teachablemachine/image";

const cropTypes = [
  { key: "rabi", name: "Rabi Crop", image: rabiImage },
  { key: "kharif", name: "Kharif Crop", image: kharifImage },
  { key: "zaid", name: "Zaid Crop", image: zaidImage },
];

// Step 2: Add your Teachable Machine model URLs here
const modelURLs = {
  rabi: "https://teachablemachine.withgoogle.com/models/FUsO0yiwP/",
  kharif: "https://teachablemachine.withgoogle.com/models/la4j50EXt/",
  zaid: "https://teachablemachine.withgoogle.com/models/EUob1v6Rw-/",
};

// This is the component that shows the file upload UI
function ImageAnalyzer({ cropType, onBack }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result);
    }
  };

  // Step 3: Update the handleAnalyzeClick function to be async
  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Get the correct model URL based on the selected cropType
      const URL = modelURLs[cropType];
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      // Load the model
      const model = await tmImage.load(modelURL, metadataURL);

      // Get the image element from the DOM to predict on
      const imageElement = document.getElementById("uploaded-image-preview");
      
      // Make a prediction
      const prediction = await model.predict(imageElement);

      // Sort predictions by probability to find the best one
      prediction.sort((a, b) => b.probability - a.probability);

      // Create the result object from the top prediction
      const topPrediction = prediction[0];
      const analysisResult = {
        disease: topPrediction.className,
        confidence: (topPrediction.probability * 100).toFixed(2),
      };

      setResult(analysisResult); // Show the real result

    } catch (err) {
      console.error("Analysis Error:", err);
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
      }}
    >
      <Button onClick={onBack} sx={{ mb: 2, color: "white" }}>
        ← Back to Crop Selection
      </Button>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
        Analyze {cropTypes.find((c) => c.key === cropType).name}
      </Typography>

      {preview && (
        <Box mt={2} mb={2}>
          <img
            id="uploaded-image-preview" // Step 4: Add an ID to the image for prediction
            src={preview}
            alt="Selected crop"
            style={{ maxHeight: "200px", borderRadius: "8px" }}
          />
        </Box>
      )}

      <Button
        component="label"
        variant="contained"
        startIcon={<UploadFileIcon />}
        sx={{ mb: 2,mt:5 }}
      >
        {selectedFile ? "Change Image" : "Upload Image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {loading ? (
        <Box my={2}>
          <CircularProgress color="success" />
          <Typography sx={{ color: "white" }}>Analyzing...</Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleAnalyzeClick}
          disabled={!selectedFile}
          sx={{ display: "block", margin: "auto" }}
        >
          Analyze Crop
        </Button>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Box mt={4}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Analysis Result:
          </Typography>
          <Alert
            severity={
              result.disease.toLowerCase().includes("healthy")
                ? "success"
                : "warning"
            }
            sx={{ mt: 1 }}
          >
            <Typography variant="h6">
              <strong>Prediction:</strong> {result.disease.replace(/_/g, " ")}
            </Typography>
            <Typography variant="body1">
              <strong>Confidence:</strong> {result.confidence}%
            </Typography>
          </Alert>
        </Box>
      )}
    </Paper>
  );
}

// NO CHANGES NEEDED FOR THE MAIN PAGE COMPONENT
function CropAnalyzerPage() {
  const [selectedCropType, setSelectedCropType] = useState(null);

  if (selectedCropType) {
    return (
      <Box sx={{ paddingTop: "8rem", textAlign: "center", paddingX: "2rem" }}>
        <ImageAnalyzer
          cropType={selectedCropType}
          onBack={() => setSelectedCropType(null)}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ paddingTop: "8rem", textAlign: "center", paddingX: "2rem" }}>
      <Typography
        variant="h3"
        sx={{ color: "white", fontWeight: "bold", mb: 4 }}
      >
        Select Crop Type 🌾
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {cropTypes.map((crop) => (
          <Grid item key={crop.key} xs={12} sm={8} md={6}>
            <Card
              sx={{
                marginTop:"40px",
                height: "220px",
                borderRadius: "16px",
                width:"350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${crop.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardActionArea
                onClick={() => setSelectedCropType(crop.key)}
                sx={{ height: "100%", display: "flex" }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    {crop.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CropAnalyzerPage;