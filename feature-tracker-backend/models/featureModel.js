import db from "../config/db.js";

// ===============================
// GET ALL + FILTER + SORT
// ===============================
export const getAllFeatures = (status, date, callback) => {
  let query = `
    SELECT 
      id, 
      title, 
      description, 
      priority, 
      status, 
      created_at, 
      updated_at
    FROM feature_requests
    WHERE 1=1
  `;

  const params = [];

  // FILTER BY STATUS
  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  // FILTER BY DATE
  if (date) {
    query += " AND DATE(created_at) = ?";
    params.push(date);
  }

  // SORT (newest first default)
  query += " ORDER BY created_at DESC";

  db.query(query, params, callback);
};

// ===============================
// GET SINGLE FEATURE
// ===============================
export const getFeatureById = (id, callback) => {
  const query = `
    SELECT 
      id, 
      title, 
      description, 
      priority, 
      status, 
      created_at, 
      updated_at
    FROM feature_requests 
    WHERE id = ?
  `;

  db.query(query, [id], callback);
};

// ===============================
// CREATE FEATURE
// ===============================
export const createFeature = (data, callback) => {
  const query = `
    INSERT INTO feature_requests 
    (title, description, priority, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    query,
    [data.title, data.description, data.priority, data.status],
    callback
  );
};

// ===============================
// UPDATE FEATURE
// ===============================
export const updateFeature = (id, data, callback) => {
  const query = `
    UPDATE feature_requests 
    SET 
      title = ?, 
      description = ?, 
      priority = ?, 
      status = ?, 
      updated_at = NOW()
    WHERE id = ?
  `;

  db.query(
    query,
    [data.title, data.description, data.priority, data.status, id],
    callback
  );
};

// ===============================
// DELETE FEATURE
// ===============================
export const deleteFeature = (id, callback) => {
  db.query(
    "DELETE FROM feature_requests WHERE id = ?",
    [id],
    callback
  );
};

// ===============================
// UPDATE STATUS ONLY
// ===============================
export const updateStatus = (id, status, callback) => {
  db.query(
    `
    UPDATE feature_requests 
    SET status = ?, updated_at = NOW() 
    WHERE id = ?
    `,
    [status, id],
    callback
  );
};