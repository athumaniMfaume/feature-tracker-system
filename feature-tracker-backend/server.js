import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import featureRoutes from "./routes/featureRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/features", featureRoutes);

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});