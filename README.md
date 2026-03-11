# ForIT 2025 - Todo App (Express + React)

Aplicaci�n full-stack sencilla para el challenge de ingreso a Academia ForIT 2025. Backend Express con almacenamiento en memoria y frontend React con Vite.

## Estructura
- `backend/`: API REST en Express.
- `frontend/`: SPA en React + Vite.

## Requisitos previos
- Node.js 18+ (incluye npm).

## Variables de entorno
Copia los ejemplos y aj�stalos:
- Backend: `backend/.env.example` ? `backend/.env`
  - `PORT=4000`
  - `CORS_ORIGIN=http://localhost:5173`
- Frontend: `frontend/.env.example` ? `frontend/.env`
  - `VITE_API_URL=http://localhost:4000`

## Instalaci�n y ejecuci�n local
### Backend
```
cd backend
npm install
npm start
```
API en `http://localhost:4000`.

### Frontend
```
cd frontend
npm install
npm run dev
```
App en `http://localhost:5173`.

## Endpoints
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/health`

## Notas
- Almacenamiento en memoria (se pierde al reiniciar).

##Ejecutar Front
-cd "C:\Users\eze2\Downloads\challenge forl IT\frontend"
npm install
npm run dev

