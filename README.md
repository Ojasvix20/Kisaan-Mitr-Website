 # 🌾 Kisaan Mitr
﻿
## An AI-powered smart farming platform that helps farmers detect crop diseases, monitor field conditions, access market prices, and communicate with agricultural experts — all through a multilingual interface.

# 🚀 Key Features

##🌱 AI-Based Crop Disease Detection

Farmers can upload an image of a crop/plant, and the application uses a trained TensorFlow Lite model to identify possible crop diseases.

- Image-based disease detection
- Displays the predicted disease
- Displays model confidence percentage
- Lightweight TensorFlow Lite model for efficient inference
- Designed around different crop seasons such as Rabi, Kharif, and Zaid
- 🤖 AI Agricultural Expert Chat

`Kisaan Mitr provides an AI-powered chatbot using the Gemini API.`


## 🌐 Multilingual Support

- The application provides multilingual accessibility using the Google Translate API.

- This helps make the platform more accessible to farmers who may prefer regional languages instead of English.-

## 📊 Market Rates

- Farmers can view crop/commodity market prices through an interactive chart.

- The platform includes an Admin Dashboard through which market-rate data can be managed and updated. (to be)

- The frontend consumes the market-rate data through backend APIs rather than keeping the application dependent on hard-coded frontend values.

## 📡 IoT-Based Farm Monitoring

Kisaan Mitr can integrate sensor data to monitor important environmental and field parameters.

The IoT setup includes components such as:

- ESP32
- NodeMCU ESP8266
- Arduino Uno
- DHT11 temperature/humidity sensor
- Soil moisture sensor
- MQ-2 sensor
- MQ135 sensor
- 16×2 LCD

The sensor layer can provide information such as:

🌡️ Temperature
💧 Humidity
🌱 Soil moisture
🌫️ Air/gas-related readings

This information can be used to provide farmers with better visibility into their farming environment.
