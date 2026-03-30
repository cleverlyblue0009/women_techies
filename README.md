# Personal Safety Platform

## Overview

Scaffolded hackathon starter with:

- **Frontend**: Vite + React + Tailwind UI (dark premium design with home map, report form, dashboard, evidence locker, navbar, and emergency button).
- **Backend**: Express API layer handling complaints, uploads, and AI proxying.
- **AI**: Python FastAPI microservice for safety scoring.

All services run locally using `npm run dev`, `npm start`, and `uvicorn`.

## Folder Layout

- `/frontend`: Vite React app with Tailwind, sample components, and layout.
- `/backend`: Express REST API, placeholder complaint state, SHA-256 helper, AI proxy.
- `/ai-service`: FastAPI project modeling simple safety score heuristics.

## Setup

1. **Frontend**
   - `cd frontend`
   - `npm install`
   - `npm run dev` (starts Vite on port 4173)

2. **Backend**
   - `cd backend`
   - `npm install`
   - `npm start` (starts Express on port 5000)

3. **AI Service**
   - `cd ai-service`
   - `python -m venv .venv` (optional)
   - `pip install -r requirements.txt`
   - `uvicorn src.main:app --reload --port 8000`

4. **Environment**
   - Define vars via `.env` files per service as needed (e.g., `AI_SERVICE_URL` for backend, Firebase credentials later).
   - Frontend can override the backend API URL via `frontend/.env` (copy `.env.example` and adjust `VITE_BACKEND_URL`).
   - Provide a Google Maps API key via `VITE_GOOGLE_MAPS_KEY` when you want to display the live map.
   - AI service relies on `NEWS_API_KEY` (NewsAPI) and `BACKEND_URL` to score risk.

## Connecting the Stack

- Frontend components call `/api/complaints` on the backend using Axios (wrapped in `frontend/src/utils/api.js`).
- Complaint submissions land in the backend memory store, which also responds with the saved record for the dashboard list.
- Backend proxies `/api/ai/risk` to the FastAPI AI service so the frontend can show a live `safety_score`/`risk_level`.
- Google Maps renders the user location plus complaint markers (configurable via `VITE_GOOGLE_MAPS_KEY`) while the AI-based alert banner reacts to score drops.
- Frontend caches complaints, safety scores, and offline reports via localStorage so the UI remains functional offline and syncs when back online.
- You can point the frontend and backend to real Firebase/Firestore once credentials are configured; the current flow works fully locally for demoing the UI and APIs.

## API Routes (Backend)

| Route | Method | Description |
| --- | --- | --- |
| `/api/complaints` | POST | Submit new complaint |
| `/api/complaints` | GET | List complaints |
| `/api/complaints/:id` | PATCH | Update status/fields (status must be submitted, under_review, escalated, resolved) |
| `/api/complaints/:id/files` | POST | Upload file, hashes response (multipart/form-data field `file`) |
| `/api/contacts` | GET | List stored emergency contacts |
| `/api/contacts` | POST | Add a new emergency contact |
| `/api/ai/risk` | POST | Proxy to AI service `/predict-risk` |

## Frontend Scripts

- `npm run dev`: Launch Vite dev server (4173)
- `npm run build`: Build production bundle

## Notes

- Tailwind config uses premium dark theme colors; components demonstrate complaint form, dashboard, and evidence list.
- Backend is ready to wire Firestore/Firebase Storage and AI service endpoints.
- AI service exposes `/predict-risk`, accepts `latitude`, `longitude`, and `time_of_day`, mixes night penalties with complaint/news deductions, and returns `safety_score`, `risk_level`, and matched headlines (configure `NEWS_API_KEY` + `BACKEND_URL`).
- Frontend integrates Google Maps via `@react-google-maps/api`; provide `VITE_GOOGLE_MAPS_KEY` to render user/complaint markers and the alert banner.

Feel free to expand each section with real integrations (Firebase, Google Maps, hashing uploads) as needed.
