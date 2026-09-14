# 👨‍🍳 ChefKart 2.0 — Verified Cook & Chef Booking Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment%20Gateway-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)

**ChefKart 2.0** is a full-stack on-demand culinary platform connecting households with background-verified, trained cooks and party chefs. Whether you need an affordable daily cook, a one-time specialist for an intimate dinner, or a full culinary brigade for a private party, ChefKart brings trusted hospitality right to your kitchen.

---

## 🌟 Key Highlights

- **🍳 Chefit (One-Time Cook)**: Quick on-demand cook booking for single breakfast, lunch, or dinner slots.
- **🎉 Chef for Party**: Multi-cuisine party chefs and kitchen staff tailored to guest count, dish selection, and live cooking counters.
- **🔍 Verified Chef Search**: Browse certified culinary professionals filterable by cuisine specialty, years of experience, and customer ratings.
- **💳 Real-Time Razorpay Payments**: Instant payment processing with HMAC-SHA256 signature verification and automatic booking confirmation.
- **📸 High-Definition Culinary Showcase**: Interactive cuisine carousels (North Indian, South Indian, Continental, Chinese, Italian, Mexican) with modal lightbox inspection.
- **📊 Integrated Admin Dashboard**: Full-featured admin portal to monitor live bookings, manage chef profiles, track incoming leads, and publish blogs & food galleries.
- **🎨 Modern Aesthetic**: Warm, welcoming light theme, responsive layout, accessible typography, and smooth micro-interactions.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, React Router v6, Tailwind CSS, DaisyUI, Redux Toolkit, React Slick, Axios |
| **Backend** | Node.js, Express.js, Mongoose (MongoDB Atlas), Cloudinary, JWT Authentication |
| **Payments** | Razorpay Node SDK & Razorpay Checkout Modal |
| **Deployment** | Vercel (Frontend SPA) + Render / Railway (Backend API) |

---

## 📁 Project Structure

```text
chefkart/
├── Backend/                     # Node.js & Express API
│   ├── config/                  # Database connection & Razorpay client
│   ├── controller/              # Controllers (Booking, Chef, Payment, Gallery, etc.)
│   ├── middleware/              # JWT Auth & error handlers
│   ├── model/                   # Mongoose Schemas
│   ├── routes/                  # RESTful API route declarations
│   ├── app.js                   # Application entry point
│   └── .env.example             # Backend environment template
│
├── Frontend/                    # React Single Page Application
│   ├── public/                  # HTML template, static assets, _redirects
│   ├── src/
│   │   ├── Components/          # Public website (Home, Services, Party Chef, About, Contact)
│   │   ├── Dashboard/           # Integrated Admin Dashboard (Pages, Charts, Management)
│   │   ├── config/              # Centralized Axios API instance
│   │   ├── App.js               # Route configuration & layouts
│   │   └── index.js             # React entry point
│   ├── vercel.json              # SPA routing rewrite rule for Vercel
│   └── .env.example             # Frontend environment template
│
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database or local MongoDB instance
- [Razorpay](https://dashboard.razorpay.com/) Test Account (Key ID & Key Secret)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Mahima0529/Chefkart2.0.git
cd Chefkart2.0
```

---

### 2. Backend Setup
```bash
# Navigate to the backend directory
cd Backend

# Install dependencies
npm install

# Copy sample environment configuration
cp .env.example .env
```

Open `.env` in `Backend/` and configure your credentials:
```env
PORT=8080
JWT_SECRET=your_jwt_secret_key
MONGODB_URL=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the backend server:
```bash
npm start
# 🚀 Backend server runs at http://localhost:8080
```

---

### 3. Frontend Setup
```bash
# Open a new terminal tab and navigate to Frontend
cd Frontend

# Install dependencies
npm install

# Copy sample environment configuration
cp .env.example .env
```

Open `.env` in `Frontend/` and configure the backend URL:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the React development server:
```bash
npm start
# 🌐 Web application opens at http://localhost:3000
```

---

## 🌐 Deployment

### Deploy Backend on [Render](https://render.com)
1. Create a **New Web Service** and connect this repository.
2. Set **Root Directory** to `Backend`.
3. Set **Build Command** to `npm install` and **Start Command** to `node app.js`.
4. Add your environment variables (`MONGODB_URL`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, etc.).
5. Copy your live backend URL (e.g. `https://chefkart-api.onrender.com`).

### Deploy Frontend on [Vercel](https://vercel.com)
1. Import this repository in **Vercel**.
2. Set **Root Directory** to `Frontend`.
3. Framework preset is automatically detected as **Create React App**.
4. In **Environment Variables**, add:
   - `REACT_APP_API_URL`: Your deployed Render backend URL.
   - `REACT_APP_RAZORPAY_KEY_ID`: Your Razorpay Public Key ID.
5. Click **Deploy**. Vercel uses the included [`vercel.json`](file:///Frontend/vercel.json) to ensure smooth SPA routing without 404 errors.

---

## 🔌 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/booking/create` | Submit a new cook/chef booking |
| `GET` | `/booking/all` | Fetch all bookings (Admin) |
| `PATCH` | `/booking/update-status/:id` | Update booking status (`Confirmed`, `Completed`, `Cancelled`) |
| `POST` | `/payment/create-order` | Create a verified Razorpay order with server-calculated amount |
| `POST` | `/payment/verify` | Verify payment HMAC-SHA256 signature and update booking record |
| `GET` | `/chefs/all` | Retrieve listing of verified chefs |
| `GET` | `/gallery/all` | Fetch curated culinary food gallery items |
| `POST` | `/user/login` | Administrator authentication & token generation |

---

## 🛡️ Security & Privacy
- **Environment Isolation**: All credentials, database URIs, and payment secrets are stored in `.env` files and excluded from source control via `.gitignore`.
- **Payment Verification**: Payments are verified on the server side using Razorpay cryptographic signature matching to prevent client tampering.
- **Role Protection**: Admin dashboard routes are guarded behind JWT token authentication.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
