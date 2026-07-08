# PetCare Web

Aplicación web de PetCare para análisis dermatológico de mascotas, historial de
triages y revisión operativa de capturas consentidas.

Esta rama conecta la pantalla de nuevo análisis con el contrato HTTP de
`petcare-triage-service`, reemplazando el flujo demo aleatorio por respuestas
del servicio de triage ML.

## Qué incluye esta integración

| Área           | Estado                                                                             |
| -------------- | ---------------------------------------------------------------------------------- |
| Nuevo análisis | Envía imagen, especie, zona corporal y consentimiento al backend ML.               |
| Resultado      | Renderiza `completed`, `low_confidence` y `out_of_distribution` desde el contrato. |
| Historial      | Guarda resultados recientes en `localStorage` de forma best-effort.                |
| Admin          | Muestra una cola ligera para revisar capturas consentidas.                         |
| Deploy         | Documenta cómo configurar `VITE_TRIAGE_API_URL` y validar el servicio.             |

## Arquitectura

```text
PetCare-Web
  └─ POST /api/triage/analyze
       └─ petcare-triage-service
            ├─ contract v0.1
            ├─ YOLOv8-cls mock/baseline surface
            └─ consented capture buffer
```

Responsabilidades:

| Repo                     | Rol                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `PetCare-Web`            | UI, flujo de upload, consentimiento compacto, historial y consumo del API.         |
| `petcare-triage-service` | Contrato ML, mock FastAPI, preparación de datos, entrenamiento y sync de capturas. |

## Quick Start

Levantar el frontend local:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Por defecto `.env.example` apunta al mock local en `http://127.0.0.1:8000`.

Levantar el backend mock local:

```bash
cd ../petcare-triage-service/services/triage-mock
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8000
```

Abrir:

```text
http://127.0.0.1:5173/dashboard/new-analysis
```

## Configuración

| Variable              | Requerida | Ejemplo                 | Uso                                             |
| --------------------- | --------- | ----------------------- | ----------------------------------------------- |
| `VITE_TRIAGE_API_URL` | Sí        | `http://127.0.0.1:8000` | URL base del servicio `petcare-triage-service`. |

En cloud, configurar `VITE_TRIAGE_API_URL` con la URL pública del backend.

## Triage ML

- Guía de despliegue y consumo: [`docs/triage-deploy-guide.md`](docs/triage-deploy-guide.md)
- Endpoint principal: `POST /api/triage/analyze`
- Health check: `GET /health`
- Formatos soportados: JPEG y PNG, máximo 5 MB

## Checks

```bash
npm run build
npm run lint
```

Para este PR, el lint focalizado usado durante la integración fue:

```bash
npx eslint src/lib/triage-api.ts src/lib/triage-records.ts \
  src/routes/dashboard.new-analysis.tsx \
  src/routes/dashboard.history.tsx \
  src/routes/dashboard.admin.tsx
```
