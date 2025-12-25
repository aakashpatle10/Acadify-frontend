# Acadify Frontend

Frontend web application for **Acadify**, a role-based academic management system for students, teachers, and administrators.

This application provides a responsive UI and communicates with the Acadify backend APIs for authentication and core features.

---

## 🌐 Live Demo

https://acadify-frontend.vercel.app/

---

## 🛠 Tech Stack

- **React (Vite)**
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **Axios**
- **JWT-based Authentication**

---

## ✨ Features

- Student, Teacher, and Admin login
- Role-based dashboards
- Secure API integration with backend
- Token-based authentication flow
- Responsive UI (desktop & mobile)
- Centralized Axios configuration

> ⚠️ Some UI sections and features currently use dummy or placeholder data and will be fully implemented in future updates.

---

## 🔗 Backend Integration

The frontend communicates with the Acadify Backend:

**Backend Base URL**
https://acadify-backend-553k.onrender.com/api


---

## 🔐 Demo Credentials (for testing)

**Student**
Enrollment No: 123456
Password: 123456

**Teacher**
Email: teacher@gmail.com
Password: 123456

**Admin**
Email: admin@gmail.com
Password: 123456

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://acadify-backend-553k.onrender.com/api
```
---

## 📦 Installation

```bash
npm install
```
---

## 🚀 Running the App

```bash
npm run dev
```

The app will start at:

http://localhost:5173

---

## 📂 Project Structure
src/
│
├── components/        # Reusable UI components
├── pages/             # Page-level components
├── services/          # API service layer
├── config/            # Axios & environment config
├── hooks/             # Custom React hooks
├── utils/             # Helper functions
├── App.jsx            # Root component
└── main.jsx           # App entry point


---

## 📝 License

This project is for educational and learning purposes.

## 👨‍💻 Author

**Aakash Kumar Patle**
Acadify – Smart Academic Management System


