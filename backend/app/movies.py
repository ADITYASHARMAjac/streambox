from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from . import models, schemas
from .database import get_session

router = APIRouter(prefix="/movies", tags=["movies"])


@router.get("", response_model=schemas.MovieListResponse)
def list_movies(
    genre: str | None = Query(default=None, description="Filter by genre"),
    search: str | None = Query(default=None, description="Search term for title matches"),
    session: Session = Depends(get_session),
) -> schemas.MovieListResponse:
    statement = select(models.Movie)
    if genre:
        statement = statement.where(models.Movie.genre.ilike(f"%{genre}%"))
    if search:
        statement = statement.where(models.Movie.title.ilike(f"%{search}%"))

    movies: List[models.Movie] = session.exec(statement.order_by(models.Movie.created_at.desc())).all()
    items = [
        schemas.MovieBase.model_validate(movie, from_attributes=True)
        for movie in movies
    ]
    return schemas.MovieListResponse(items=items)


@router.get("/{movie_id}", response_model=schemas.MovieBase)
def get_movie(movie_id: int, session: Session = Depends(get_session)) -> schemas.MovieBase:
    movie = session.get(models.Movie, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return schemas.MovieBase.model_validate(movie, from_attributes=True)
