# OptimizerLab (MERN Conversion)

This project is converted from a static landing page into a MERN stack application:
- **Backend**: `server` (Node.js + Express + MongoDB)
- **Frontend**: `client` (React + Vite)

## Setup

1. Install dependencies
   - `cd server && npm install`
   - `cd ../client && npm install`

2. Configure MongoDB
   - Copy `.env.sample` to `.env` in `server`
   - Update `MONGO_URI` with your MongoDB connection string

3. Run server + client
   - `cd server && npm run dev` (defaults to port 5000)
   - `cd ../client && npm run dev` (defaults to port 5173)

4. Open app
   - `http://localhost:5173`

## API

- `GET /api/inquiries`
- `POST /api/inquiries`
  - body: `{ role, name, email, phone, message }`

## Notes

- The static UI and style from your `index.html` were ported into `client/src/App.jsx` and `client/src/App.css`.
- Contact form now sends to backend API and stores entries in MongoDB.

