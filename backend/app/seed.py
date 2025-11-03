import json
from pathlib import Path
from typing import List

from sqlmodel import Session, select

from . import models

_DATA_FILE = Path(__file__).resolve().parent / "data" / "movies.json"


def seed_movies(session: Session) -> None:
    with _DATA_FILE.open("r", encoding="utf-8") as file:
        records: List[dict] = json.load(file)

    existing_movies = {movie.id: movie for movie in session.exec(select(models.Movie)).all()}

    for record in records:
        movie_id = record["id"]
        if movie_id in existing_movies:
            movie = existing_movies[movie_id]
            for key, value in record.items():
                setattr(movie, key, value)
        else:
            movie = models.Movie(**record)
            session.add(movie)
    session.commit()
