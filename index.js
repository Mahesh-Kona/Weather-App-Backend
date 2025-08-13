const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// Weather API route
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// Use Render PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
