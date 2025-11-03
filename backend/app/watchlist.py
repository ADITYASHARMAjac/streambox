from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from . import models, schemas, security
from .database import get_session

router = APIRouter(prefix="/watchlist", tags=["watchlist"])


@router.get("", response_model=schemas.WatchlistListResponse)
def list_watchlist(
    current_user: models.User = Depends(security.get_current_user),
    session: Session = Depends(get_session),
) -> schemas.WatchlistListResponse:
    entries = session.exec(
        select(models.WatchlistEntry).where(models.WatchlistEntry.user_id == current_user.id)
    ).all()
    items = [
        schemas.WatchlistEntryResponse(
            id=entry.id,
            added_at=entry.added_at,
            movie=schemas.MovieBase.model_validate(entry.movie, from_attributes=True),
        )
        for entry in entries
        if entry.movie is not None
    ]
    return schemas.WatchlistListResponse(items=items)


@router.post("/{movie_id}", response_model=schemas.MessageResponse, status_code=status.HTTP_201_CREATED)
def add_to_watchlist(
    movie_id: int,
    current_user: models.User = Depends(security.get_current_user),
    session: Session = Depends(get_session),
) -> schemas.MessageResponse:
    movie = session.get(models.Movie, movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")

    existing = session.exec(
        select(models.WatchlistEntry).where(
            (models.WatchlistEntry.user_id == current_user.id)
            & (models.WatchlistEntry.movie_id == movie_id)
        )
    ).first()
    if existing:
        return schemas.MessageResponse(message="Movie already in watchlist")

    entry = models.WatchlistEntry(user_id=current_user.id, movie_id=movie_id)
    session.add(entry)
    session.commit()
    return schemas.MessageResponse(message="Added to watchlist")


@router.delete("/{movie_id}", response_model=schemas.MessageResponse)
def remove_from_watchlist(
    movie_id: int,
    current_user: models.User = Depends(security.get_current_user),
    session: Session = Depends(get_session),
) -> schemas.MessageResponse:
    entry = session.exec(
        select(models.WatchlistEntry).where(
            (models.WatchlistEntry.user_id == current_user.id)
            & (models.WatchlistEntry.movie_id == movie_id)
        )
    ).first()
    if entry is None:
        raise HTTPException(status_code=404, detail="Movie is not in watchlist")

    session.delete(entry)
    session.commit()
    return schemas.MessageResponse(message="Removed from watchlist")
