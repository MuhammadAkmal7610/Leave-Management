<<<<<<< HEAD
# Leave Management System

## Overview

This repository contains a simple Leave Management System (backend + frontend). I added a small UI upgrade (Trending panel, Employee management and an Attendance dashboard) and Tailwind support in the frontend. The frontend will gracefully fall back to mock data when the backend is unreachable so you can demo features locally without a running database.

## Quick start (Windows PowerShell)

Prerequisites:
- Node.js (LTS recommended)
- npm
- MongoDB (optional — required only if you want the backend to persist data)

1) Install dependencies

Backend
```powershell
cd C:\Users\akmal\Desktop\LeaveManagment\leave-management-system\backend
npm install
```

Frontend
```powershell
cd C:\Users\akmal\Desktop\LeaveManagment\leave-management-system\web
npm install
```

2) Configure environment
- Create `backend\.env` and add at least:
```
MONGODB_URI="mongodb://localhost:27017/leave_management"
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

3) Start servers (two terminals)

Backend (dev)
```powershell
cd C:\Users\akmal\Desktop\LeaveManagment\leave-management-system\backend
npm run dev
```

Frontend
```powershell
cd C:\Users\akmal\Desktop\LeaveManagment\leave-management-system\web
npm start
```

Open http://localhost:3000 to view the UI. If the backend is not running or unreachable, the frontend will display mock leaves, employees and attendance data so you can explore the UI.

## What I added in the frontend
- Tailwind setup: `web/tailwind.config.js`, `web/postcss.config.js`, and Tailwind directives in `web/src/index.css`.
- Trending board UI (`TrendingBoard`) — shows top users by leave count (falls back to mocks).
- Employee management: `EmployeeForm` (create) and `EmployeeList` (view) components. These use a mock fallback if backend endpoints are unavailable.
- Attendance dashboard (`AttendanceDashboard`) — simple present/absent summary and roster (uses mock fallback).
- Mock data: `web/src/services/mockData.ts` and mock fallbacks wired into `web/src/services/api.ts`.

## Database / Prisma vs Mongoose note

This repository contains `prisma/schema.prisma` but the backend currently uses Mongoose (MongoDB). Prisma is not wired into the Express backend at the moment. You have two options:

- Keep the current backend (Mongoose + MongoDB) and run MongoDB (quick). Set `MONGODB_URI` in `backend/.env` and start the server.
- Convert the backend to Prisma + PostgreSQL. This requires schema migration and code changes in the backend. I can help perform this migration if you want.

## Tailwind / toolchain note

Tailwind was added to the `web` app. Because this project uses `react-scripts@4`, I installed Tailwind dependencies with `--legacy-peer-deps` to avoid peer dependency conflicts. For a cleaner setup and fewer vulnerabilities consider one of:

- Upgrade `react-scripts` to v5 (requires testing your app against breaking changes);
- Migrate the frontend to Vite (recommended for modern dev experience).

If you'd like, I can perform the migration to Vite (I can convert the project and update scripts).

## Next possible improvements

- Persist employees/attendance in the backend (add `/employees` and `/attendance` endpoints to backend and store data in MongoDB).
- Convert the backend to Prisma/Postgres (if you prefer SQL).
- Add unit/integration tests for frontend and backend.
- Improve UI (charts, filters, pagination) using a charting library.

## License

MIT
=======
# Leave-Management
its full leave management system
>>>>>>> 588bc74c3169e42aebca65c73ee9908f4e0b0e1f
