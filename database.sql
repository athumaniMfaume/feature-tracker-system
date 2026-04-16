-- ===============================
-- DATABASE: Feature Tracker System
-- ===============================

CREATE DATABASE IF NOT EXISTS feature_tracker;
USE feature_tracker;

-- ===============================
-- TABLE: feature_requests
-- ===============================
CREATE TABLE IF NOT EXISTS feature_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  title VARCHAR(255) NOT NULL,
  description TEXT,

  priority ENUM('Low','Medium','High') DEFAULT 'Low',
  status ENUM('Open','In Progress','Completed') DEFAULT 'Open',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- ===============================
-- OPTIONAL: SAMPLE DATA (FOR TESTING)
-- ===============================
INSERT INTO feature_requests (title, description, priority, status) VALUES
('Add login system', 'Users should be able to login securely', 'High', 'Open'),
('Add registration system', 'Users should be able to create accounts', 'High', 'Open'),
('Add logout feature', 'Users should be able to logout safely', 'Medium', 'In Progress'),
('Password reset feature', 'Users should reset passwords via email', 'High', 'Completed');