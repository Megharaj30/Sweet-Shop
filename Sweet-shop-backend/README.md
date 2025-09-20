# 🍭 Sweet Shop Backend API

A complete **backend API** for a Sweet Shop Management System, built using **Node.js, Express, MongoDB, and JWT Authentication**.  
Supports both **Admin** and **Customer** roles with role-based access control.

---

## 🚀 Features
- **Authentication (JWT)**
  - Register new users (Admin / Customer)
  - Login & get JWT token
  - Role-based access middleware

- **Sweets Management**
  - Add / Update / Delete sweets (Admin only)
  - Fetch all sweets
  - Fetch a sweet by ID

- **Inventory Management**
  - Purchase sweets (Customer)
  - Restock sweets (Admin)
  - View inventory stats (Admin / Customer)

- **Security & Middleware**
  - Password hashing with `bcryptjs`
  - JWT-based authentication
  - CORS enabled
  - Centralized error handling

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT, bcryptjs
- **Environment Config:** dotenv
- **Dev Tools:** nodemon

---

## 📂 Project Structure
sweet-shop-backend/
├── server.js
├── app.js
├── config/
│ └── db.js
├── models/
│ ├── User.js
│ └── Sweet.js
├── routes/
│ ├── authRoutes.js
│ ├── sweetRoutes.js
│ └── inventoryRoutes.js
├── controllers/
│ ├── authController.js
│ ├── sweetController.js
│ └── inventoryController.js
├── middleware/
│ └── authMiddleware.js
├── utils/
│ └── errorHandler.js
├── tests/ (for TDD if needed)
├── package.json
└── .env

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/sweet-shop-backend.git
cd sweet-shop-backend
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Setup environment variables
Create a .env file in the root directory:

env
Copy code
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
JWT_SECRET=your-secret-key
4️⃣ Run the server
bash
Copy code
# Development
npm run dev

# Production
npm start
📡 API Endpoints
🔑 Authentication
POST /api/auth/register → Register new user

json
Copy code
{ "name": "Admin User", "email": "admin@sweetshop.com", "password": "admin123", "role": "admin" }
POST /api/auth/login → Login user

json
Copy code
{ "email": "admin@sweetshop.com", "password": "admin123" }
🍬 Sweets
GET /api/sweets → Get all sweets

GET /api/sweets/:id → Get sweet by ID

POST /api/sweets → Add new sweet (Admin only)

PUT /api/sweets/:id → Update sweet (Admin only)

DELETE /api/sweets/:id → Delete sweet (Admin only)

📦 Inventory
POST /api/inventory/purchase → Purchase sweets (Customer)

json
Copy code
{ "sweetId": "sweetObjectId", "quantity": 2 }
POST /api/inventory/restock → Restock sweets (Admin)

json
Copy code
{ "sweetId": "sweetObjectId", "quantity": 50 }
GET /api/inventory/stats → Get total sweets and low-stock items

🧪 Testing (Optional)
Add tests inside the tests/ directory and run:

bash
Copy code
npm test
📌 Notes
Use Bearer Token (JWT) in Postman for protected routes.

Example:

makefile
Copy code
Authorization: Bearer <your-token>
👨‍💻 Author
Built by Megharaj Patil 🚀
BE Comp | Full Stack Developer | MERN Projects

yaml
Copy code

---

👉 Do you want me to also create a **`.env.example`** file for safe sharing on GitHub (without exposing your real keys)?





