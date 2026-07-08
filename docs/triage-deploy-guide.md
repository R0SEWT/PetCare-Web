# Guía de Despliegue: Triage ML

Esta guía cubre el camino mínimo para desplegar `petcare-triage-service` y
conectarlo con `PetCare-Web`.

## Resumen Operativo

| Pieza             | Valor                                                        |
| ----------------- | ------------------------------------------------------------ |
| Backend           | `petcare-triage-service/services/triage-mock`                |
| Frontend          | `PetCare-Web`                                                |
| Variable frontend | `VITE_TRIAGE_API_URL`                                        |
| Endpoint          | `POST /api/triage/analyze`                                   |
| Health check      | `GET /health`                                                |
| Imágenes          | JPEG o PNG, máximo 5 MB                                      |
| Captura ML        | Solo con consentimiento explícito en la pantalla de análisis |

## Flujo

```text
Usuario sube imagen
  -> PetCare-Web arma FormData
  -> POST /api/triage/analyze
  -> Backend devuelve contract v0.1
  -> UI muestra resultado, urgencia y recomendaciones
  -> Si hay consentimiento, backend guarda captura para mejora del modelo
```

## 1. Demo Local

### Backend

```bash
cd ../petcare-triage-service/services/triage-mock
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8000
```

Validar:

```bash
curl -s http://127.0.0.1:8000/health
```

### Frontend

```bash
cd ../PetCare-Web
cp .env.example .env.local
npm install
npm run dev
```

Abrir:

```text
http://127.0.0.1:5173/dashboard/new-analysis
```

## 2. Backend en Cloud

Crear un servicio web apuntando al repo `petcare-triage-service`.

Configuración recomendada:

| Campo             | Valor                                         |
| ----------------- | --------------------------------------------- |
| Root directory    | `services/triage-mock`                        |
| Build command     | `pip install -r requirements.txt`             |
| Start command     | `uvicorn app:app --host 0.0.0.0 --port $PORT` |
| Health check path | `/health`                                     |

Variables opcionales:

```bash
PETCARE_CAPTURE_ENABLED=true
PETCARE_CAPTURE_BUFFER_DIR=/data/triage-captures
```

Para demo, el mock permite CORS amplio. En producción, acotar CORS al dominio
del frontend cuando el host final esté definido.

## 3. Frontend en Cloud

Configurar en el proveedor del frontend:

```bash
VITE_TRIAGE_API_URL=https://<backend-host>
```

Build con npm:

```bash
npm install
npm run build
```

Build con Bun, si el proveedor lo usa:

```bash
bun install
bun run build
```

## 4. Smoke Tests

Backend:

```bash
curl -s https://<backend-host>/health
```

Análisis:

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
4. Ejecutar análisis.
5. Confirmar que se muestra resultado, urgencia y recomendación.
6. Si se marcó consentimiento, revisar la cola en `/dashboard/admin`.

## 5. Checklist para PR

```bash
npm run build
npx eslint src/lib/triage-api.ts src/lib/triage-records.ts \
  src/routes/dashboard.new-analysis.tsx \
  src/routes/dashboard.history.tsx \
  src/routes/dashboard.admin.tsx
```

Notas:

- El build debe pasar.
- El lint completo del repo puede reportar deuda previa fuera de esta
  integración.
- La captura para mejora de modelo es best-effort; el análisis no debe fallar si
  la captura no se puede guardar.
