# Login and Signup Base App

A minimal authentication and registration system using React (Vite), Node.js, Express, MongoDB and JWT.

This project is designed as a **base-level autentication system**, making is easy to integrate into various projects.

## Features

- User signup with **username, email, and password**
- Secure **password hashing**
- User authentication using **JWT (JSON Web Tokens)**
- Persistent user sessions
- Login and logout functionality
- Redirects users to a **personalised dashboard** after successful signup or login
- Built with **React (frontend), Node.js/Express (backend), and MongoDB (database)**

## Installation and Setup

### **1. Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [MondoDB](https://www.mongodb.com/) (local or cloud-based via MongoDB Atlas)
- [Git](https://git-scm.com/)

---

### **2. Clone the Repository**

```bash
git clone https://github.com/AfterdarkNZ/Login-Signup-Base-App.git
cd Login-Signup-Base-App
```

---

### **3. Install Backend Dependencies**

Navigate to the backend folder and install dependencies:

```bash
cd server
npm install
```

---

### **4. Install Frontend Dependencies**

Navigate to the frontend folder and install dependencies:

```bash
cd ../frontend
npm install
```

---

### **5. Set Up Environment Variables**

Create a .env file in the server folder and add:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Replace your_mongodb_connection_string with your MongoDB URI and your_jwt_secret with a secure random string.

---

### **6. Start the Application**

From the server directory, run the following command to start both backend and frontend concurrently:

```bash
cd ../server
npm run dev
```

This command uses concurrently to launch the server and the client together. If you haven't already, ensure you have installed all dependencies in both the server and frontend directories.

Make sure your `package.json` in the `server` directory is set up with a script that uses concurrently. For example:

```json
"scripts": {
    "dev": "concurrently \"npm run server\" \"npm run dev --prefix ../frontend\"",
    "server": "nodemon server.js"
  },
```

Adjust the paths and commands as needed for your project.

---

## Usage

1. Open http://localhost:5173 in your browser.
2. Sign up with a `username, email, and password`.
3. Log in with your new credentials
4. After logging in, you'll be redirected to your `personalised dashboard`
5. Click `Logout` to end your session.

## Technologies Used

- Frontend: React, React Router, Vite
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT) & bcrypt.js for password hashing

## Customization

This project serves as a template. You can:

- Modify the UI for different projects.
- Extend the dashboard functionality.
- Implement additional OAuth authentication (Google, Facebook, etc.).
- Add roles & permissions for different users.
