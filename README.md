# ValoMetrics

Plataforma web de análisis de estadísticas para jugadores de Valorant.

## Stack

- **Backend:** Python 3.12, FastAPI, SQLAlchemy, PostgreSQL
- **Frontend:** React, Vite, TailwindCSS, Recharts
- **Infra:** Docker, Docker Compose

## Desarrollo local

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Docker

```bash
docker compose up --build
```

## Endpoints

- `GET /api/health` — Health check
- `GET /api/player/{name}/{tag}` — Obtener jugador
