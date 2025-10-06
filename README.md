# 🍬 Sweet Shop Management System

A **full-stack Sweet Shop Management System** with **React (frontend)** and **Node.js + Express + MongoDB (backend)**.  
This project allows customers to browse and purchase sweets, while admins can manage inventory, add/edit/delete sweets, and view low stock alerts.

---

## 🚀 Features

### Customer
- Register & login
- Browse available sweets
- Purchase sweets and generate bill

### Admin
- Register & login (admin role)
- Add new sweets
- Update sweet details (price, stock, etc.)
- Delete sweets
- View inventory stats (total sweets, low stock)

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS 3.4.1, Axios, React Router DOM  
- **Backend**: Node.js, Express, MongoDB, JWT Authentication, Bcrypt  
- **Database**: MongoDB (Atlas or local)

---

## 📂 Project Structure

Sweet-Shop/
├── Sweet-shop-backend/ # Backend (Node.js + Express + MongoDB)
│ ├── config/ # DB connection
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── utils/ # Error handler
│ ├── .env # Env variables (not committed)
│ ├── app.js # Express app
│ └── server.js # Server entry point
│
├── Sweet-shop-frontend/ # Frontend (React + Tailwind)
│ ├── src/
│ │ ├── components/ # Navbar, ProtectedRoute, etc.
│ │ ├── context/ # AuthContext
│ │ ├── pages/ # Home, Login, Register, Dashboard, AdminPanel
│ │ ├── App.js # Routes
│ │ └── index.js # React entry
│ └── tailwind.config.js
│
└── README.md


## ⚙️ Setup Instructions

### 1️⃣ Backend
```bash
cd Sweet-shop-backend
npm install
npm run dev
Server runs at http://localhost:5000

Create .env file in backend:


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
2️⃣ Frontend

cd Sweet-shop-frontend
npm install
npm start
App runs at http://localhost:3000

📌 API Endpoints
Auth
POST /api/auth/register → Register user

POST /api/auth/login → Login user

Sweets
GET /api/sweets → Get all sweets

POST /api/sweets (admin) → Add sweet

PUT /api/sweets/:id (admin) → Update sweet

DELETE /api/sweets/:id (admin) → Delete sweet

Inventory
POST /api/inventory/purchase (customer) → Purchase sweet

POST /api/inventory/restock (admin) → Restock sweet

GET /api/inventory/stats (admin) → View stats

👨‍💻 Author
Megharaj Patil (BE Comp 3)

GitHub: Megharaj30
