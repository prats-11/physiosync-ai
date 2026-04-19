# PhysioSync AI 🧬

> AI-powered metabolism simulator that analyses food images and predicts body impact.

## 🚀 Live Demo
## 🚀 Live Demo
https://physiosync-frontend-923345715930.us-central1.run.app

## 🧠 What it does
- Upload a meal photo
- AI analyses nutrition using Google Gemini
- Get calories, health score, macros, micronutrients
- See 30-day weight impact prediction
- What-if simulations for diet choices

## ⚙️ Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind |
| Backend | FastAPI (Python) |
| AI | Google Gemini 2.5 Flash |
| Deployment | Docker + Google Cloud Run |

## 📁 Structure
physiosync-ai/
├── backend/        # FastAPI backend
├── frontend/       # React + Vite frontend
└── README.md

## 🛠️ Local Setup

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables
Create `backend/.env`:

GEMINI_API_KEY=your_key_here