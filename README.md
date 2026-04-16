🚀 Feature Tracker System

A modern full-stack Feature Request Tracker built with:

⚛️ React.js (Frontend)
🌐 Node.js + Express.js (Backend)
🛢️ MySQL (Database)
🔗 RESTful API architecture

This application allows users to manage feature requests efficiently with full CRUD operations, status tracking, filtering, and modern UI design.

📸 Screenshots

All screenshots are located in the /screenshots/ folder.

🏠 Dashboard

➕ Add Feature

✏️ Edit Feature

🗑️ Delete Confirmation

🎯 Project Objective

This project was developed as part of a technical assessment to demonstrate:

Full-stack development skills
Clean architecture design
API integration
State management in React
Database handling with MySQL

An issue/feature tracking system helps teams organize and manage development tasks effectively.

✨ Features
✅ View all feature requests
✅ Add new feature
✅ Edit feature
✅ Delete feature (with confirmation modal)
✅ Update feature status
✅ Filter by status
✅ Display created & updated date
✅ Real-time notifications (success & error)
✅ Modern UI with gradient design
🧱 Tech Stack
Frontend
React.js (Vite)
Tailwind CSS
Axios
Backend
Node.js
Express.js
Database
MySQL
Version Control
Git & GitHub
🗂️ Project Structure
feature-tracker-system/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│
├── screenshots/
│   ├── home.png
│   ├── add.png
│   ├── edit.png
│   ├── futa.png
│
├── database.sql
└── README.md
⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/athumaniMfaume/feature-tracker-system.git
cd feature-tracker-system
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=feature_tracker

Run server:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🗄️ Database Setup
CREATE DATABASE feature_tracker;

USE feature_tracker;

CREATE TABLE feature_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('Low','Medium','High') DEFAULT 'Low',
  status ENUM('Open','In Progress','Completed') DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);
🔌 API Endpoints
Method	Endpoint	Description
GET	/	Get all features
GET	/:id	Get single feature
POST	/	Create feature
PUT	/:id	Update feature
DELETE	/:id	Delete feature
PATCH	/:id/status	Update status
🧪 Validation & Error Handling
Backend
Required field validation
Enum validation
String length validation
Frontend
Success notifications
Error notifications from API
🎨 UI Highlights
Modern gradient background
Glassmorphism cards
Smooth hover animations
Responsive design
Clean modal system
📹 Demo Video

(Add your demo video link here)

📦 Git Workflow
Clean commit history
Feature-based commits
Organized project structure
🧠 What I Learned
Building REST APIs
Full-stack integration
React state management
Database design with MySQL
UI/UX design with Tailwind CSS
🚀 Future Improvements
JWT Authentication
Search functionality
Pagination
Dashboard analytics
Deployment (Vercel + Render)
👨‍💻 Author

Athumani Mfaume

GitHub: https://github.com/athumaniMfaume

Location: Dar es Salaam, Tanzania

📄 License

This project is for assessment and educational purposes.