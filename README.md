# Sri Charukesh N — AI Engineer Portfolio

> A futuristic, living AI system portfolio — built with React 18, Node.js/Express, and MongoDB.

**Live Site Features:**
- ⚡ Three.js neural network hero canvas (220 nodes)
- 🎬 GSAP boot loader terminal sequence
- ✨ Holographic card effects with CSS @property shimmer
- 🖱️ Custom glowing cursor with lerp physics
- 📡 Terminal-style contact form
- 🧠 Animated skill bars with neon scanning light
- 🌐 Matrix rain canvas background
- 🔐 Full admin panel with JWT authentication

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally OR MongoDB Atlas
- Git

### 1. Clone & Install

```bash
git clone <your-repo>
cd portfoliosri

# Install backend
cd server
npm install

# Install frontend
cd ../client
npm install
```

### 2. Environment Variables

```bash
cd server
cp .env.example .env
# Edit .env with your values
```

**Required .env values:**
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens (use a long random string) |
| `ADMIN_USERNAME` | Admin panel username |
| `ADMIN_PASSWORD` | Admin panel password |
| `EMAIL_USER` | Gmail address for contact notifications |
| `EMAIL_PASS` | Gmail App Password |

### 3. Seed the Database

```bash
cd server
npm run seed
```

This populates the database with all of Sri Charukesh's resume data including projects, experience, skills, and certifications.

**Admin Credentials after seeding:**
- Username: `admin` (or `ADMIN_USERNAME` env value)
- Password: `Admin@123456` (or `ADMIN_PASSWORD` env value)

### 4. Start Development Servers

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:5000  
Admin Panel: http://localhost:5173/admin

---

## 🐳 Docker Deployment

```bash
# From project root
cp server/.env.example server/.env
# Edit server/.env

docker-compose up -d

# Seed the database
docker exec portfolio_server node utils/seeder.js
```

Site: http://localhost  
Admin: http://localhost/admin

---

## 🔐 Admin Panel

The admin panel is hidden from public navigation. Access via:

```
/admin → /admin/login
/admin/dashboard (protected, requires JWT)
```

**Features:**
- 📁 Full CRUD for Projects (with image upload)
- 💼 Full CRUD for Experience entries
- 🧠 Full CRUD for Skills with proficiency %
- 🏆 Full CRUD for Certifications
- 📨 View & manage contact messages (read/unread)
- ⚙️ Profile settings (bio, links, photo, resume)
- 🔑 Change admin password

---

## 📡 API Documentation

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get portfolio profile |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| GET | `/api/experience` | Get work experience |
| GET | `/api/skills` | Get all skills |
| GET | `/api/certifications` | Get certifications |
| POST | `/api/contact` | Submit contact message (rate limited: 5/hr) |

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login → returns JWT |
| POST | `/api/auth/logout` | Logout (protected) |
| GET | `/api/auth/me` | Get current user (protected) |
| POST | `/api/auth/change-password` | Change admin password (protected) |

### Protected Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/api/profile` | Update profile |
| POST/PUT/DELETE | `/api/projects` | CRUD projects |
| POST/PUT/DELETE | `/api/experience` | CRUD experience |
| POST/PUT/DELETE | `/api/skills` | CRUD skills |
| POST/PUT/DELETE | `/api/certifications` | CRUD certifications |
| GET | `/api/contact/messages` | Get all messages |
| PATCH | `/api/contact/messages/:id/read` | Mark as read |
| DELETE | `/api/contact/messages/:id` | Delete message |
| DELETE | `/api/contact/messages/clear-all` | Clear all messages |

---

## 🏗️ Architecture

```
portfoliosri/
├── client/          # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/   # All UI components
│   │   ├── pages/        # Route pages
│   │   ├── admin/        # Admin panel
│   │   ├── hooks/        # Custom React hooks
│   │   ├── context/      # Auth context
│   │   ├── services/     # Axios API
│   │   └── styles/       # Global CSS + animations
├── server/          # Node.js + Express backend
│   ├── controllers/ # Route handlers
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express routers
│   ├── middleware/  # Auth, rate limit, upload
│   └── utils/       # Email, seeder
├── docker-compose.yml
└── nginx.conf
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-void` | `#020510` | Deepest background |
| `--cyan-primary` | `#00F5FF` | Primary glow, headings |
| `--violet-accent` | `#7B2FFF` | Secondary glow |
| `--magenta-pulse` | `#FF2D78` | CTA, highlights |
| `--green-matrix` | `#00FF88` | Success, indicators |

**Fonts:** Orbitron (display) · Space Grotesk (body) · JetBrains Mono (code/terminal)

---

## 📄 License

MIT — Built by Sri Charukesh N
