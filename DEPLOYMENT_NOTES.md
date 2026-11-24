# FlightApp deployment notes

This ZIP is prepared for: Netlify (React/Vite frontend) + Render (Spring Boot API) + Neon (PostgreSQL).

Repository layout after extracting the outer `flightapp` directory:
- `frontend/flight-frontend` — Netlify site
- `flightapp` — Spring Boot API and Dockerfile

## Netlify
- Base directory: `frontend/flight-frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_BASE_URL=https://YOUR-RENDER-SERVICE.onrender.com`

## Render
- Create a Web Service from this GitHub repository.
- Root directory: `flightapp`
- Runtime/language: Docker
- Dockerfile path: `Dockerfile`
- Plan: Free
- Environment variables: `SPRING_DATASOURCE_URL` (JDBC URL from Neon), `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`.
- Render provides `PORT`; Spring Boot reads it automatically.

## Neon
Create a PostgreSQL project and use its JDBC connection URL, username and password in Render's environment variables. Use the JDBC URL format beginning `jdbc:postgresql://` and ensure it includes `?sslmode=require`.

The local database fallback (`localhost`, user `postgres`, password `pwd`) is only for local development. Always set all three `SPRING_DATASOURCE_*` variables in Render.

## Important security limitation in the supplied application
The current admin login is checked in frontend code, and the backend deal-creation/update/deletion endpoints do not enforce server-side authentication. Do not use this version to manage real users, payments, or live business data until backend authentication/authorization is implemented.
