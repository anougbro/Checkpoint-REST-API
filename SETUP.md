# 🚀 Quick Start Guide

## Prerequisites
- Node.js v14+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation Steps

### Step 1: Setup Backend (Terminal 1)
```bash
cd backend
npm install
# Edit config/.env if needed (change MongoDB URI)
npm start
# Server runs on http://localhost:5000
```

### Step 2: Setup Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

## That's it! 🎉

The application is now running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## MongoDB Setup (if using locally)

### Windows
1. Download MongoDB Community Server
2. Run installer and follow steps
3. MongoDB will start automatically

### Mac
```bash
brew services start mongodb-community
```

### Linux
```bash
sudo systemctl start mongod
```

## Test the API

### Using the React App
- Go to http://localhost:3000
- Use the form to add, edit, and delete users

### Using Postman
1. Create GET request to `http://localhost:5000/api/users`
2. Create POST request with user data
3. Test PUT and DELETE routes

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB is running |
| Frontend can't reach API | Ensure backend is on port 5000 |
| Port 3000/5000 in use | Kill process or use different port |
| MongoDB connection fails | Check .env file MONGODB_URI |

## Next Steps

- Read the full README.md for detailed documentation
- Modify the code and add new features
- Deploy to production (Heroku, Vercel, etc.)
- Learn more about MERN stack

Happy coding! 🚀
