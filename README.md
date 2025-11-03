# StreamBox (Netflix Clone)

StreamBox is a full-stack Netflix-inspired streaming experience built with FastAPI and a responsive JavaScript UI. The backend serves HTML templates and static assets directly, so the entire product can be deployed as a single Python service.

## Features

- **Modern UI** &ndash; Netflix-like layout with hero section, curated rows, and modal authentication flows.
- **User Accounts** &ndash; Registration, login, and bearer-token authentication with hashed passwords.
- **Movie Catalog** &ndash; Seeded catalog with genre metadata delivered through REST APIs.
- **Watchlist Management** &ndash; Add/remove titles using protected endpoints that sync with the UI.
- **Inline Streaming** &ndash; Overlay player with HTTP range streaming for MP4/WebM demo assets.
- **Automated Tests** &ndash; Pytest suite covering authentication and movie catalog endpoints.

## Project Structure

```
backend/
  app/
    __init__.py
    auth.py
    database.py
    main.py
    models.py
    movies.py
    schemas.py
    seed.py
    security.py
    streaming.py
    watchlist.py
    static/
      app.js
      movie.js
      movies.js
      assets/
      videos/
    templates/
      index.html
      movie.html
  requirements.txt
  tests/
    conftest.py
    test_auth.py
    test_movies.py
render.yaml
```

## Prerequisites

- Python 3.11+ (development verified with 3.13.4; deployment targets 3.11.6 on Render)
- FFmpeg (optional) if you plan to regenerate demo video segments

## Local Development

1. Create and activate a virtual environment (recommended).
2. Install dependencies:

   ```bash
   python -m pip install -r backend/requirements.txt
   ```

3. Start the FastAPI server from the `backend` directory:

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. Open `http://127.0.0.1:8000` to use the application. Static assets and templates are served by FastAPI.

The UI defaults to calling the API on the same origin. To fall back to local-only (mock) data, run the app once and set `localStorage.setItem("streambox_use_local_only", "true")` in your browser console.

## Running Tests

Execute the pytest suite from `backend`:

```bash
python -m pytest
```

VS Code tasks named `Start Backend Server` and `Run Backend Tests` mirror the commands above.

## Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `DATABASE_URL` | SQLAlchemy connection string. Points to a writable SQLite file or external DB. | SQLite file inside the project directory. |
| `STREAMBOX_DATA_DIR` | Overrides the directory that stores the SQLite database when `DATABASE_URL` is not set. | Project root (`backend/`). |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed origins for CORS. | Localhost variants (`http://localhost`, `http://localhost:3000`, `http://127.0.0.1`). |

When `DATABASE_URL` or `STREAMBOX_DATA_DIR` point to a SQLite file, the directory is created automatically at startup.

## Deploying on Render

This repository includes `render.yaml`, which provisions a Python web service with an attached persistent disk. To deploy:

1. Push your branch to GitHub.
2. In the Render dashboard, choose **New &rarr; Blueprint** and select this repository.
3. Review the generated service:
   - **rootDir** is set to `backend`, so Render installs dependencies from `backend/requirements.txt`.
   - **buildCommand** upgrades `pip` and installs requirements.
   - **startCommand** runs `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
   - A 1&nbsp;GB persistent disk mounts at `/opt/render/project/data`; the included `DATABASE_URL` (`sqlite:////opt/render/project/data/streambox.db`) stores the SQLite database on that disk.
   - The health check path is `/health`.
4. Create the service. The database seeds automatically on first boot.

If you need custom domains or additional CORS origins, update `CORS_ALLOWED_ORIGINS` in the Render dashboard (comma-separated list). For larger datasets or multi-instance scaling, migrate to a managed PostgreSQL database and update `DATABASE_URL` accordingly.

## API Overview

- `POST /auth/register` &ndash; Register a new user.
- `POST /auth/login` &ndash; Obtain a bearer token (OAuth2 password flow).
- `GET /auth/me` &ndash; Retrieve the current user's profile.
- `GET /movies` &ndash; List all movies (optional `genre` and `search` filters).
- `GET /movies/{id}` &ndash; Fetch a single movie.
- `GET /watchlist` &ndash; Retrieve the authenticated user's watchlist.
- `POST /watchlist/{id}` &ndash; Add a movie to the watchlist.
- `DELETE /watchlist/{id}` &ndash; Remove a movie from the watchlist.
- `GET /stream/{id}/video` &ndash; Stream the movie file with HTTP range support.
- `GET /stream` &ndash; List seeded movies with available video assets.

Bearer tokens returned from `/auth/login` must be sent in the `Authorization: Bearer <token>` header for protected routes.

## Next Steps

- Replace demo thumbnails and backgrounds in `backend/app/static/assets` with production-ready imagery.
- Swap the bundled SQLite database for PostgreSQL when scaling beyond a single instance.
- Address the FastAPI lifespan deprecation warning by migrating to the newer lifespan context manager.
- Regenerate or host video assets in `backend/app/static/videos` to match production streaming requirements.
