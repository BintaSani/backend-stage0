import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// GET /me endpoint
app.get("/me", async (req, res) => {
  try {
    // Fetch cat fact from the cat API
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000, // timeout
    });

    const catFact = response.data?.fact || "Cats are mysterious creatures!";

    // Construct response
    const data = {
      status: "success",
      user: {
        email: "bintasani992@gmail.com",
        name: "Binta Sani",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    // fallback
    return res.status(200).json({
      status: "success",
      user: {
        email: "bintasani992@gmail.com",
        name: "Binta Sani",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: "Unable to fetch a cat fact right now. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
