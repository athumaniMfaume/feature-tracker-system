import express from "express";
import {
  getFeatures,
  getFeature,
  addFeature,
  updateFeature,
  deleteFeature,
  updateFeatureStatus,
} from "../controllers/featureController.js";

const router = express.Router();

// CRUD
router.get("/", getFeatures);              // filter supported
router.get("/:id", getFeature);
router.post("/", addFeature);
router.put("/:id", updateFeature);
router.delete("/:id", deleteFeature);

// STATUS UPDATE
router.patch("/:id/status", updateFeatureStatus);

export default router;