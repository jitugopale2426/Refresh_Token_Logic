# 🔐 JWT Authentication System (Access + Refresh Token) | Node.js + Express + Prisma

A simple and educational **backend authentication system** built with **Node.js**, **Express**, and **Prisma ORM**, showing how to use **Access Tokens** and **Refresh Tokens** securely.  
Perfect for learning and YouTube demo purposes 

---

## Features

✅ Register new user  
✅ Login user with email & password  
✅ Issue **Access Token (2 minutes)**  
✅ Issue **Refresh Token (7 days)**  
✅ Secure protected routes using JWT  
✅ Refresh expired access token  
✅ Easy to test with Postman  

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **JWT (jsonwebtoken)**
- **bcrypt** for password hashing
- **dotenv** for environment variables
- **CORS** enabled for testing

---

## Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/jwt-auth-backend.git
cd jwt-auth-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
PORT=5000
JWT_SECRET=yourjwtsecret
REFRESH_TOKEN_SECRET=yourrefreshsecret
```
---

## How It Works

1. When you login → server creates:
   - **Access Token** → valid for 2 minutes  
   - **Refresh Token** → valid for 7 days  

2. Access token is used for all API calls.  
3. When access token expires, use `/refresh` route with your refresh token.  
4. Server returns a new access token instantly.  

---

## ⚠️ Important Notes

- This project stores refresh tokens **in memory (array)** for testing.  
- In production, always store them in **a database**.  
- Never expose your secret keys publicly.

---

In this video, you’ll learn:

- How JWT works (Access vs Refresh token)
- How to protect routes using middleware
- How to refresh access token automatically
- Full backend setup with Node.js and Prisma

---

`#nodejs` `#express` `#jwt` `#authentication` `#backend` `#prisma` `#refreshToken` `#tutorial` `#youtube`
