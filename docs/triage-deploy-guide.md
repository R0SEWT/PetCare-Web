# Guia simple: desplegar y consumir triage ML

Esta guia deja el flujo minimo para que PetCare Web consuma
`petcare-triage-service` desde local o desde un host publico.

## Resumen

- Backend: `petcare-triage-service`, servicio FastAPI en `services/triage-mock`.
- Frontend: `PetCare-Web`, variable `VITE_TRIAGE_API_URL`.
- Endpoint principal: `POST /api/triage/analyze`.
- Health check: `GET /health`.
- Formatos de imagen: JPEG o PNG, maximo 5 MB.
- Captura para mejora de modelo: se activa solo cuando el usuario marca
  consentimiento en la pantalla de analisis.

## Local

Levantar backend:

```bash
cd ../petcare-triage-service/services/triage-mock
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8000
```

Levantar frontend:

```bash
cd ../PetCare-Web
cp .env.example .env.local
npm install
npm run dev
```

Abrir `http://127.0.0.1:5173/dashboard/new-analysis`.

## Backend en cloud

Crear un servicio web apuntando al repo `petcare-triage-service`.

Configuracion recomendada:

- Root directory: `services/triage-mock`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
- Health check path: `/health`

Variables opcionales:

```bash
PETCARE_CAPTURE_ENABLED=true
PETCARE_CAPTURE_BUFFER_DIR=/data/triage-captures
```

Para la demo, el mock permite CORS amplio. En produccion, acotar CORS al dominio
del frontend cuando se congele el host final.

## Frontend en cloud

Configurar en el proveedor del frontend:

```bash
VITE_TRIAGE_API_URL=https://<backend-host>
```

Build:

```bash
npm install
npm run build
```

Si el proveedor usa Bun:

```bash
bun install
bun run build
```

## Smoke test

Backend:

```bash
curl -s https://<backend-host>/health
```

Analisis:

```bash
curl -s -X POST https://<backend-host>/api/triage/analyze \
  -F image=@sample.jpg \
  -F petId=demo-pet \
  -F species=dog \
  -F bodyRegion=belly \
  -F consentForModelImprovement=true
```

Frontend:

1. Abrir `/dashboard/new-analysis`.
2. Subir una imagen JPEG o PNG.
3. Seleccionar especie y zona corporal.
4. Ejecutar analisis.
5. Verificar que se muestra resultado, urgencia y recomendacion.
6. Si se marco consentimiento, revisar la cola en `/dashboard/admin`.

## Checks para PR

```bash
npm run build
npx eslint src/lib/triage-api.ts src/lib/triage-records.ts \
  src/routes/dashboard.new-analysis.tsx \
  src/routes/dashboard.history.tsx \
  src/routes/dashboard.admin.tsx
```

Nota: el lint completo del repo puede reportar deuda previa fuera de esta
integracion. El build debe pasar.
