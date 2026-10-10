# Fixora

A local services marketplace built with the MERN stack and microservices.
Users post a job (plumber, electrician, carpenter and more), a worker nearby accepts it, and the user follows it until it is done.

## Features
- Sign up with an email OTP, as a **User** (needs a service) or a **Worker** (provides a service)
- Login with httpOnly cookies, automatic token refresh, logout
- Forgot password (OTP, then reset), change password, edit profile
- **Users:** post a request, see its progress, cancel it
- **Workers:** browse open jobs (filter by service), accept a job, mark it completed
- Email to the user when a job is accepted or completed
- Responsive dark UI for phone, tablet and desktop

## Architecture
```
Frontend (React + Vite)  :5173
        |  /api  (vite proxy)
        v
api-gateway              :3000   verifies the JWT, forwards to the services
   |            |
   v            v
auth-service  booking-service
   :3001         :3002           MongoDB (database "fixora")
   |  \            |
   |   Redis       |
   v               v
mail-service :5000   (internal only, needs INTERNAL_API_KEY) -> Gmail SMTP
```

| Service | What it does |
|---|---|
| `api-gateway` | Single entry point. Checks the access token and forwards the user in the `x-user` header. |
| `auth-service` | Users, signup OTP, login, refresh tokens (Redis), password flows, rate limits. |
| `booking-service` | Service catalog and bookings: create, list, accept, complete, cancel. |
| `mail-service` | Sends emails with Nodemailer. Not reachable without the internal key. |

Every backend service follows the same layout:
```
<service>/
├── server.js
└── src/
    ├── app.js
    ├── config/        config.js, db.js, ...
    ├── controllers/
    ├── dao/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    ├── utils/
    └── validator/
```
(`api-gateway` and `mail-service` have no database, so their `models/` and `dao/` only hold a `.gitkeep`.)

```
Frontend/src/
├── app/                 App.jsx, AppLayout.jsx, app.routes.jsx, app.store.js
└── features/
    ├── auth/            components, hook, pages, service, state
    ├── bookings/        components, hook, pages, service
    ├── account/         pages
    ├── home/            pages
    └── Shared/          Components, api, hook, pages, utils
```

## Quick start (Windows PowerShell, Node 20+, Docker Desktop)
```powershell
cd fixora
npm run setup      # installs every service and creates the .env files with random secrets
npm run db:up      # starts MongoDB and Redis in Docker
```
Open `Backend\services\mail-service\.env` and set your Gmail:
```
MAIL_USER=your_address@gmail.com
MAIL_PASS=your_16_letter_app_password     (no spaces, not your normal password)
```
Gmail App Password: Google Account, Security, 2-Step Verification (turn on), then App passwords.

Then run everything with one command:
```powershell
npm run dev
```
Open http://localhost:5173

`npm run env:init` never overwrites an existing `.env`. The values that must match between services
(`ACCESS_TOKEN_SECRET`, `INTERNAL_API_KEY`) are filled in consistently for you.

## Run each service in its own terminal instead
```powershell
cd Backend\services\mail-service      ; npm install ; npm run dev   # 5000
cd Backend\services\auth-service      ; npm install ; npm run dev   # 3001
cd Backend\services\booking-service   ; npm install ; npm run dev   # 3002
cd Backend\services\api-gateway       ; npm install ; npm run dev   # 3000
cd Frontend                           ; npm install ; npm run dev   # 5173
```
Copy `.env.example` to `.env` in each service first (`Copy-Item .env.example .env`).

## Environment variables
| Service | Key | Value |
|---|---|---|
| api-gateway | `PORT` | `3000` |
| | `FRONTEND_URL` | `http://localhost:5173` |
| | `AUTH_SERVICE_URL` | `http://localhost:3001` |
| | `BOOKING_SERVICE_URL` | `http://localhost:3002` |
| | `ACCESS_TOKEN_SECRET` | same as auth-service |
| auth-service | `PORT` | `3001` |
| | `MONGO_URI` | `mongodb://127.0.0.1:27017/fixora` |
| | `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET` | random strings |
| | `MAIL_SERVICE_URL` | `http://localhost:5000` |
| | `INTERNAL_API_KEY` | same as mail-service |
| | `REDIS_HOST`, `REDIS_PORT` | `127.0.0.1`, `6379` (username and password empty for local Docker) |
| booking-service | `PORT` | `3002` |
| | `MONGO_URI` | `mongodb://127.0.0.1:27017/fixora` |
| | `MAIL_SERVICE_URL`, `INTERNAL_API_KEY` | same as above |
| mail-service | `PORT` | `5000` |
| | `INTERNAL_API_KEY` | same as auth-service |
| | `MAIL_HOST`, `MAIL_PORT` | `smtp.gmail.com`, `465` |
| | `MAIL_USER`, `MAIL_PASS` | Gmail address and App Password |

The Frontend needs no `.env` (the Vite dev server proxies `/api` to the gateway).

## API (through the gateway, base `/api`)
| Method | Path | Who |
|---|---|---|
| POST | `/auth/send-mail-auth` | public, sends the signup OTP |
| POST | `/auth/signUp`, `/auth/login`, `/auth/refresh-token`, `/auth/logout` | public |
| POST | `/auth/forgot-password` | public |
| PUT | `/auth/forgot-password-verify-otp`, `/auth/reset-password` | public |
| GET, PUT | `/auth/me` | logged in (read / edit profile) |
| PUT | `/auth/update-password` | logged in |
| GET | `/services` | public |
| POST | `/bookings` | User |
| GET | `/bookings/mine` | User (own requests) or Worker (own jobs) |
| GET | `/bookings/open?service=plumber` | Worker |
| GET | `/bookings/:id` | owner, assigned worker, or any worker for open jobs |
| PATCH | `/bookings/:id/accept`, `/bookings/:id/complete` | Worker |
| PATCH | `/bookings/:id/cancel` | User (own requested or accepted jobs) |

## Troubleshooting
| Problem | Fix |
|---|---|
| `Cannot find package 'vite'` (or any package) | Run `npm install` in that folder (or `npm run setup` in the root). |
| `... is not defined in environment variables` | The `.env` file is missing or misnamed. Run `npm run env:init`. |
| MongoDB or Redis connection errors | Start Docker Desktop and run `npm run db:up`. |
| OTP email does not arrive | Look at the mail-service terminal. `SMTP login FAILED` means `MAIL_USER` or `MAIL_PASS` is wrong (needs a Gmail App Password without spaces, from the same account as `MAIL_USER`). |
| `Too many requests` (429) | Wait a minute. Login, OTP and password routes are rate limited. |
| Changed a `.env` | Stop that service (Ctrl + C) and start it again. |

## Notes
- Never commit `.env` files (they are in `.gitignore`).
- The services trust the `x-user` header from the gateway, so only the gateway should be reachable from outside. Keep the other services on a private network when you deploy.
- A user has one active session: logging in on another device replaces the refresh token of the first.
