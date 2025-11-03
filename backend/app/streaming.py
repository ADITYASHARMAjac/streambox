from __future__ import annotations

import re
from pathlib import Path
from typing import Iterable

from fastapi import APIRouter, Depends, Header, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session, select

from . import models
from .database import get_session

router = APIRouter(prefix="/stream", tags=["streaming"])

VIDEO_ROOT = Path(__file__).resolve().parent / "static" / "videos"
CHUNK_SIZE = 1024 * 1024  # 1 MiB
SUPPORTED_EXTENSIONS = (".mp4", ".webm", ".mkv")


def _slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def _iter_file(path: Path, start: int, end: int) -> Iterable[bytes]:
    with path.open("rb") as file:
        file.seek(start)
        remaining = end - start + 1
        while remaining > 0:
            chunk = file.read(min(CHUNK_SIZE, remaining))
            if not chunk:
                break
            remaining -= len(chunk)
            yield chunk


def _resolve_movie(movie_id: int, session: Session) -> models.Movie:
    movie = session.get(models.Movie, movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


def _candidate_filenames(movie: models.Movie) -> list[str]:
    slug = _slugify(movie.title)
    candidates: list[str] = []

    # If the stored URL already ends with a filename, prefer that filename first.
    tail = movie.video_url.split("/")[-1]
    if any(tail.endswith(ext) for ext in SUPPORTED_EXTENSIONS):
        candidates.append(tail)

    for ext in SUPPORTED_EXTENSIONS:
        candidates.append(f"movie-{movie.id}{ext}")
        candidates.append(f"{movie.id}{ext}")
        if slug:
            candidates.append(f"{slug}{ext}")

    # Remove duplicates while preserving order.
    seen: set[str] = set()
    ordered: list[str] = []
    for name in candidates:
        if name not in seen:
            seen.add(name)
            ordered.append(name)
    return ordered


def _resolve_video_path(movie: models.Movie) -> Path:
    if not VIDEO_ROOT.exists():
        raise HTTPException(
            status_code=500,
            detail="Video library directory is missing. Create backend/app/static/videos and add media files.",
        )

    for candidate in _candidate_filenames(movie):
        path = VIDEO_ROOT / candidate
        if path.exists():
            return path

    expected = ", ".join(_candidate_filenames(movie))
    raise HTTPException(
        status_code=404,
        detail=(
            "Video asset not found. Expected one of the following filenames in the videos folder: "
            f"{expected}."
        ),
    )


def _parse_range(range_header: str | None, file_size: int) -> tuple[int, int]:
    if not range_header or not range_header.startswith("bytes="):
        return 0, file_size - 1

    range_match = re.match(r"bytes=(\d*)-(\d*)", range_header)
    if not range_match:
        return 0, file_size - 1

    start_str, end_str = range_match.groups()
    start = int(start_str) if start_str else 0
    end = int(end_str) if end_str else file_size - 1

    if start >= file_size or end >= file_size:
        raise HTTPException(status_code=416, detail="Requested range not satisfiable")

    if start > end:
        raise HTTPException(status_code=416, detail="Requested range not satisfiable")

    return start, end


@router.get("/{movie_id}/video", response_class=StreamingResponse)
def stream_movie(
    movie_id: int,
    range: str | None = Header(default=None),
    session: Session = Depends(get_session),
):
    movie = _resolve_movie(movie_id, session)
    video_path = _resolve_video_path(movie)
    file_size = video_path.stat().st_size
    start, end = _parse_range(range, file_size)

    media_type = "video/mp4"
    if video_path.suffix == ".webm":
        media_type = "video/webm"
    elif video_path.suffix == ".mkv":
        media_type = "video/x-matroska"

    status_code = 206 if range else 200
    headers = {
        "Content-Type": media_type,
        "Accept-Ranges": "bytes",
        "Content-Length": str(end - start + 1 if status_code == 206 else file_size),
    }
    if status_code == 206:
        headers["Content-Range"] = f"bytes {start}-{end}/{file_size}"
    return StreamingResponse(
        _iter_file(video_path, start, end),
        status_code=status_code,
        headers=headers,
        media_type=media_type,
    )


@router.get("", summary="List streamable movies")
def list_available_streams(session: Session = Depends(get_session)) -> dict[str, list[str]]:
    movies = session.exec(select(models.Movie)).all()
    available: list[str] = []
    missing: list[str] = []

    for movie in movies:
        try:
            path = _resolve_video_path(movie)
        except HTTPException:
            missing.append(f"{movie.id}: {movie.title}")
        else:
            available.append(f"{movie.id}: {movie.title} -> {path.name}")

    return {"available": available, "missing": missing}
