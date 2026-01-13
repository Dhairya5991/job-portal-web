# 🚀 Job Portal – DevOps Capstone Project

A **production-ready 3-tier Job Portal & Resume Management System** built with **React, Node.js, MongoDB, Docker, and AWS-ready DevOps practices**.

This project demonstrates **real-world SaaS architecture**, **secure file handling**, **role-based access**, and **DevOps automation**.

---

## 🏗️ Architecture (3-Tier)

Frontend (React + Tailwind + Nginx)  
→ Backend API (Node.js + Express + JWT)  
→ Database (MongoDB) + Object Storage (S3 / MinIO)

---

## ✨ Key Features

### 👤 Authentication & Security
- JWT-based authentication
- Role-based access control (Admin / User)

### 📄 Job & Application Management
- Job creation (Admin)
- Job applications with resume upload (User)
- Application status lifecycle management

### 📦 Resume Storage
- Resume upload to S3 / MinIO
- Secure resume download via signed URLs (Admin)

### 📊 Admin Capabilities
- View and manage all applications
- Update application status
- Pagination & filtering support

### 📱 Modern UI
- Mobile-first responsive UI using Tailwind CSS
- Clean dashboards for Admin & User

### 📧 Notifications
- Email notifications on application status changes (SMTP / SES)

---

## 🧰 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Nginx

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- AWS SDK (S3)
- Nodemailer

**DevOps**
- Docker & Docker Compose
- Health checks
- GitHub Actions CI/CD
- AWS-ready deployment

---

## 📁 Project Structure

job-portal-capstone/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       │   ├── user/
│       │   └── admin/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── server.js
│
├── scripts/
│   └── mongo-backup.sh
│
├── docker-compose.yml
├── .env
└── README.md

---

## 🚦 Health Check

Backend exposes a health endpoint:

GET /health

Used for Docker, AWS ALB, and container orchestration readiness checks.

---

## 🐳 Run Locally (Docker)

docker compose up --build

Access:
- Frontend → http://localhost
- Backend → http://localhost:5000/health

---

## 💾 Backup Automation

MongoDB backup automation script included for scheduled backups and disaster recovery.

---

## 🧠 What This Project Demonstrates

✔ Real-world full‑stack architecture  
✔ Secure cloud storage integration  
✔ DevOps best practices  
✔ Dockerized 3‑tier system  
✔ Cloud‑ready design  

---

## 👨‍💻 Author

**Dhairyashil Pansare**  
DevOps | Cloud | Software Engineer
