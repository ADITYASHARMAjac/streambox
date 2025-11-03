import os
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from . import auth, movies, streaming, watchlist
from .database import init_db, session_scope
from .seed import seed_movies

app = FastAPI(title="StreamBox", version="1.0.0")

BASE_DIR = Path(__file__).resolve().parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

default_origins = {
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1",
}
env_origins = {
    origin.strip()
    for origin in os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
}

if "*" in env_origins:
    cors_allow_origins = ["*"]
    cors_allow_credentials = False
else:
    cors_allow_origins = sorted(default_origins | env_origins)
    cors_allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_allow_origins,
    allow_credentials=cors_allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(movies.router)
app.include_router(watchlist.router)
app.include_router(streaming.router)


@app.on_event("startup")
def on_startup() -> None:
    init_db()
    with session_scope() as session:
        seed_movies(session)


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/", response_class=HTMLResponse, name="home")
def home(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/movie", response_class=HTMLResponse, name="movie_page")
def movie_page(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("movie.html", {"request": request})
