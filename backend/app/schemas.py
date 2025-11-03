from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class MovieBase(BaseModel):
    id: int
    title: str
    genre: str
    description: str
    year: int
    rating: str
    thumbnail_url: str
    background_url: str
    video_url: str


class MovieListResponse(BaseModel):
    items: List[MovieBase]


class WatchlistEntryResponse(BaseModel):
    id: int
    movie: MovieBase
    added_at: datetime


class WatchlistListResponse(BaseModel):
    items: List[WatchlistEntryResponse]


class StreamManifest(BaseModel):
    movie_id: int
    master_playlist: str


class StreamSegment(BaseModel):
    movie_id: int
    segment_index: int
    duration: float
    content: str


class MessageResponse(BaseModel):
    message: str
    detail: Optional[str] = None
