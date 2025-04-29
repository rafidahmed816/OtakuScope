# 📖 OtakuScope

**OtakuScope** is an anime tracking and recommendation web application where users can:

- Create custom anime lists
- View other users' public lists
- Track and manage their watched anime
- Review, rate anime
- Search anime
  
---

## 🛠 Technologies Used

**Frontend**:
- React.js (with React Router DOM)
- Axios (for API requests)
- Material UI
- Anilist API (for anime metadata and images)

**Backend**:
- Node.js with Express.js
- MySQL (Database)
- JWT Authentication (JSON Web Tokens)
- Bcrypt (Password encryption)

**Other**:
- RESTful API design
- MVC Architecture (Model-View-Controller)
- Postman (for API testing)

---

## 🗂 Project Folder Structure

```plaintext
otakuscope/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── listsController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   ├── config/
│   │   ├── db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── listRoutes.js
│   ├── app.js
│   ├── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Lists.jsx
│   │   │   ├── AllLists.jsx
│   │   │   ├── PublicList.jsx
│   │   │   ├── AnimeDetails.jsx
│   │   ├── api/
│   │   │   ├── apiClient.js (Axios configuration)
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   │   ├── index.html
├── README.md
├── package.json
├── .env
├── .gitignore
```

---

## ⚙️ Key Features

- 🔒 User authentication and authorization
- 📂 Create, view, and manage personal anime lists
- 🌍 Explore all users' public anime lists
- 🎥 Anime poster previews (via AniList API)
- ➡️ Clickable list titles leading to detailed list views
- 📦 Paginated fetching for scalable performance
- 💬 Clean and simple UI with responsive design

---

## 🚀 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/rafidahmed816/otakuscope.git
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. Setup your `.env` files with database credentials and JWT secrets.

4. Run the backend:
   ```bash
   npm start
   ```

5. Run the frontend:
   ```bash
   npm start
   ```

6. Open your browser at `http://localhost:3000`.

---

