import * as Feature from "../models/featureModel.js";

// VALID VALUES
const validPriorities = ["Low", "Medium", "High"];
const validStatuses = ["Open", "In Progress", "Completed"];

// ===============================
// GET ALL + FILTER (STATUS + DATE)
// ===============================
export const getFeatures = (req, res) => {
  const { status, date } = req.query;

  Feature.getAllFeatures(status, date, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Server error while fetching features",
      });
    }

    res.json(results);
  });
};

// ===============================
// GET ONE
// ===============================
export const getFeature = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "Valid feature ID is required",
    });
  }

  Feature.getFeatureById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Server error while fetching feature",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Feature not found",
      });
    }

    res.json(results[0]);
  });
};

// ===============================
// CREATE FEATURE
// ===============================
export const addFeature = (req, res) => {
  let { title, description, priority, status } = req.body;

  if (!title || !description || !priority || !status) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  title = title.trim();
  description = description.trim();

  if (!title || !description) {
    return res.status(400).json({
      message: "Fields cannot be empty spaces",
    });
  }

  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      message: "Title must be 3–100 characters",
    });
  }

  if (description.length < 10 || description.length > 500) {
    return res.status(400).json({
      message: "Description must be 10–500 characters",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be Low, Medium, or High",
    });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be Open, In Progress, or Completed",
    });
  }

  if (/^\d+$/.test(title)) {
    return res.status(400).json({
      message: "Title cannot contain only numbers",
    });
  }

  Feature.createFeature(
    { title, description, priority, status },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to create feature",
        });
      }

      res.status(201).json({
        message: "Feature created successfully",
        id: result.insertId,
      });
    }
  );
};

// ===============================
// UPDATE FEATURE (auto updates updated_at)
// ===============================
export const updateFeature = (req, res) => {
  const { id } = req.params;
  let { title, description, priority, status } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "Valid feature ID is required",
    });
  }

  if (!title || !description || !priority || !status) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  title = title.trim();
  description = description.trim();

  if (title.length < 3 || title.length > 100) {
    return res.status(400).json({
      message: "Title must be 3–100 characters",
    });
  }

  if (description.length < 10 || description.length > 500) {
    return res.status(400).json({
      message: "Description must be 10–500 characters",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority value",
    });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value",
    });
  }

  Feature.updateFeature(
    id,
    { title, description, priority, status },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update feature",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Feature not found",
        });
      }

      res.json({
        message: "Feature updated successfully",
      });
    }
  );
};

// ===============================
// DELETE FEATURE
// ===============================
export const deleteFeature = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "Valid feature ID is required",
    });
  }

  Feature.deleteFeature(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete feature",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Feature not found",
      });
    }

    res.json({
      message: "Feature deleted successfully",
    });
  });
};

// ===============================
// UPDATE STATUS ONLY
// ===============================
export const updateFeatureStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "Valid feature ID is required",
    });
  }

  if (!status) {
    return res.status(400).json({
      message: "Status is required",
    });
  }

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be Open, In Progress, or Completed",
    });
  }

  Feature.updateStatus(id, status, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update status",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Feature not found",
      });
    }

    res.json({
      message: "Status updated successfully",
    });
  });
};