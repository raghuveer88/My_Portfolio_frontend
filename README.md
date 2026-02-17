# Raghuveer Portfolio (Angular) + Flask Chatbot Backend

This is your portfolio site converted from plain HTML/JS into an Angular app, plus the same Flask chatbot backend.

## Folder structure

- `src/` – Angular frontend
- `backend/` – Flask API (`/api/health`, `/api/chat`)
- `data/knowledge/` – knowledge sources for the chatbot (easy to update)
  - `resume.txt`
  - `linkedin.txt`
  - `profile.json`

## Run locally

### 1) Start the Flask backend

```bash
cd backend

python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env` (you can copy from `.env.example` if present) and set:

- `OPENAI_API_KEY=...`

Then run:

```bash
python app.py
```

Backend:
- http://127.0.0.1:5000/api/health

### 2) Start the Angular frontend

In a new terminal at the project root:

```bash
npm install
npm start
```

Frontend:
- http://localhost:4200

The chat widget calls the Flask backend at:
- `http://localhost:5000/api/chat`

If you deploy the backend later, update:
- `src/app/chat/chat.service.ts` (`apiUrl` field)

## Updating knowledge (LinkedIn / Resume)

Replace these files and restart the backend:

- `data/knowledge/resume.txt`
- `data/knowledge/linkedin.txt`
- `data/knowledge/profile.json`

## Notes

- Chat history is stored in `sessionStorage` and persists until refresh (same as before).
- Theme toggle uses `data-theme` on `<html>` and `<body>` (same CSS variable approach).
