# LinkUp-GP

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Socket.IO Usage](#socketio-usage)
- [Authentication](#authentication)
- [File Uploads](#file-uploads)
- [Environment Variables](#environment-variables)
- [Deployment Notes](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

LinkUp-GP is a real-time collaboration and messaging platform designed for teams and workspaces. It supports channels, direct messages, file sharing, reactions, and more, with a modern web interface and robust backend.

## Features

- User authentication (JWT, cookies)
- Workspaces, channels, and direct conversations
- Real-time messaging with Socket.IO
- File uploads and sharing (Cloudinary integration)
- Message threads, reactions, and pinning
- User presence and status
- Search functionality
- Role-based access and workspace membership

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Axios, Socket.IO-client
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO
- **File Storage:** Cloudinary
- **Deployment:** Vercel (frontend), [Use a WebSocket-friendly host for backend]

## Project Structure

```
Backend/
  app.js, server.js, package.json, config.env
  config/           # Cloudinary and other configs
  controllers/      # Route controllers (auth, user, channel, etc.)
  middlewares/      # Express and custom middlewares
  models/           # Mongoose models
  public/           # Static files for testing
  routes/           # Express route definitions
  servers/          # Socket.IO server and handlers
  utils/            # Utility functions (JWT, error handling, etc.)
FrontEnd/
  src/
    App.jsx, main.jsx
    API/            # API services and hooks
    components/     # React components
    layouts/        # Layout components
    pages/          # Page components
    routes/         # Route definitions
    styles/         # CSS/SCSS
    utils/          # Frontend utilities
  public/           # Static assets
  vite.config.js, package.json
```

## Backend Setup

1. Install dependencies:
   ```sh
   cd Backend
   npm install
   ```
2. Create a `.env` file (see [Environment Variables](#environment-variables)).
3. Start the server:
   ```sh
   npm run dev
   ```
4. The backend runs on `http://localhost:5000` by default.

## Frontend Setup

1. Install dependencies:
   ```sh
   cd FrontEnd
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. The frontend runs on `http://localhost:3000` by default.

## API Endpoints

- **Auth:** `/api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/auth/logout`
- **User:** `/api/v1/users/me`, `/api/v1/users/`, `/api/v1/users/:id`
- **Workspace:** `/api/v1/workspaces/`, `/api/v1/workspaces/:id`
- **Channel:** `/api/v1/channels/`, `/api/v1/channels/:id`
- **Conversation:** `/api/v1/conversations/`, `/api/v1/conversations/:id`
- **Message:** `/api/v1/messages/`, `/api/v1/messages/:id`
- **File:** `/api/v1/files/`, `/api/v1/files/upload`
- **Reaction:** `/api/v1/reactions/`, `/api/v1/reactions/:id`
- **Search:** `/api/v1/search/`

> All protected routes require authentication via JWT (cookie or Authorization header).

## Socket.IO Usage

- The backend exposes a Socket.IO server for real-time features.
- **Connection example (frontend):**
  ```js
  import { io } from "socket.io-client";
  const socket = io("https://your-backend-domain.com", {
    withCredentials: true,
  });
  ```
- Events include: `message`, `typing`, `presence`, `reaction`, `pin`, etc.
- See `servers/socketHandlers/` for all event handlers.

## Authentication

- JWT tokens are issued on login and stored in HTTP-only cookies.
- Protected routes use the `protect` middleware to verify tokens.
- Token expiration and invalidation are handled with clear error messages.

## File Uploads

- Files are uploaded via `/api/v1/files/upload` using `multipart/form-data`.
- Multer is used for handling uploads; files are stored on Cloudinary.
- The field name for file uploads must match the backend Multer config (e.g., `file` or `files`).

## Environment Variables

Create a `.env` file in the `Backend/` directory with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Deployment Notes

- **Backend:**
  - Do NOT deploy Socket.IO backend to Vercel. Use a host that supports WebSockets (Render, Railway, Fly.io, etc.).
  - Update CORS and allowed origins in `servers/socketServer.js` for production.
- **Frontend:**
  - Can be deployed to Vercel or Netlify.
  - Update API and Socket.IO URLs to point to your deployed backend.

## Contributing

1. Fork the repo and create your branch.
2. Commit your changes with clear messages.
3. Open a pull request.

## License

This project is licensed under the MIT License.
