# 👨‍🍳 ChefKart 2.0 — Verified Cook & Chef Booking Platform

ChefKart connects households with professional, verified home cooks and party chefs. Whether you need a daily meal cook, a one-time culinary specialist, or a full party catering team, ChefKart provides trained professionals right to your kitchen.

---

## ✨ Features

- **🍽️ Service Offerings**:
  - **Chefit (One-Time Cook)**: Book on-demand verified cooks for breakfast, lunch, or dinner.
  - **Chef for Party**: Multi-cuisine chefs and helper staff for home gatherings and celebrations.
  - **Cooks Near Me**: Search directory of verified cooks with cuisine specialties, experience, and ratings.
- **💳 Dynamic Pricing & Secure Payments**:
  - Automatic pricing calculation based on guests, dishes, and add-ons.
  - Seamless online payment integration powered by **Razorpay**.
  - Automatic booking confirmation and real-time status updates.
- **📸 Authentic Culinary Showcase**:
  - High-definition culinary craft gallery and interactive dish carousels.
  - Dynamic multi-cuisine showcase (Indian, Chinese, Mexican, Italian).
  - Lightbox modal for high-res dish viewing.
- **📊 Complete Admin Dashboard**:
  - Manage leads, bookings, verified chefs, and customer inquiries.
  - Upload and curate food galleries, testimonials, and blog posts.
  - Real-time booking tracking and payment verification.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, DaisyUI (Light Theme), React Router v6, React Slick
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose), Razorpay SDK, Cloudinary
- **Tools**: Morgan logger, Dotenv, Axios

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Git](https://git-scm.com/)
- MongoDB Atlas account (or local MongoDB)
- Razorpay test account (for payment testing)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Mahima0529/Chefkart2.0.git
cd Chefkart2.0
```

---

### 2. Backend Setup
```bash
# Navigate to Backend
cd Backend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env
```

Open `.env` and fill in your configuration:
```env

```

Start the backend server:
```bash
npm start
# Server runs on http://localhost:3000
```

---

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to Frontend
cd Frontend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env
```

Start the React development server:
```bash
npm start
# App opens at http://localhost:3000 or http://localhost:3001
```

Or build and serve the optimized production bundle:
```bash
npm run build
npx serve -s build -l 3001
```

---

## 📁 Project Structure

```
chefkart/
├── Backend/
│   ├── config/          # Database & Razorpay configurations
│   ├── controller/      # API Controllers (Bookings, Chefs, Payments, Gallery, etc.)
│   ├── middleware/      # Auth & error handling middlewares
│   ├── model/           # Mongoose schemas
│   ├── routes/          # Express route definitions
│   ├── app.js           # Express app entrypoint
│   └── .env.example     # Sample environment configuration
│
├── Frontend/
│   ├── public/          # HTML template, favicons, manifest
│   ├── src/
│   │   ├── Components/  # Public website pages (Home, About, Blog, Chef, Services)
│   │   ├── Dashboard/   # Admin Dashboard pages, charts, and tables
│   │   ├── config/      # Axios API instance configuration
│   │   ├── App.js       # App router and public layouts
│   │   └── index.js     # React application entry point
│   └── .env.example     # Frontend sample environment configuration
│
└── README.md
```

---

## 🔒 Security Best Practices
- Sensitive keys (`.env`) are strictly ignored via `.gitignore` and must **never** be committed to public repositories.
- Razorpay payments use server-side HMAC SHA256 signature verification for fraud prevention.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
