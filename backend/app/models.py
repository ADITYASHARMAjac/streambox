from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    full_name: str = Field(index=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    watchlist: List["WatchlistEntry"] = Relationship(back_populates="user")


class Movie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    genre: str = Field(index=True)
    description: str
    year: int
    rating: str
    thumbnail_url: str
    background_url: str
    video_url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    watchlisted_by: List["WatchlistEntry"] = Relationship(back_populates="movie")


class WatchlistEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    movie_id: int = Field(foreign_key="movie.id", index=True)
    added_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional[User] = Relationship(back_populates="watchlist")
    movie: Optional[Movie] = Relationship(back_populates="watchlisted_by")
