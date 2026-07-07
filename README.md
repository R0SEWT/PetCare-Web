# PetCare Web

Frontend de PetCare. La pantalla de nuevo análisis consume el servicio
`petcare-triage-service` mediante el contrato de triage ML.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Por defecto `.env.example` apunta al mock local en `http://127.0.0.1:8000`.
Para un entorno desplegado, configurar `VITE_TRIAGE_API_URL` con la URL pública
del backend.

## Triage ML

- Guía de despliegue y consumo: [`docs/triage-deploy-guide.md`](docs/triage-deploy-guide.md)
- Endpoint esperado: `POST /api/triage/analyze`
- Health check esperado: `GET /health`

## Checks

```bash
npm run build
npm run lint
```
