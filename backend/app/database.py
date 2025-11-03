from contextlib import contextmanager
import os
from pathlib import Path
from typing import Iterator

from sqlmodel import Session, SQLModel, create_engine

_DB_FILENAME = "streambox.db"


def _resolve_sqlite_url(raw_url: str) -> str:
    path_str = raw_url.replace("sqlite:///", "", 1)
    db_path = Path(path_str)
    if not db_path.is_absolute():
        db_path = Path.cwd() / db_path
    db_path.parent.mkdir(parents=True, exist_ok=True)
    return f"sqlite:///{db_path}"


def _determine_database_url() -> str:
    env_url = os.getenv("DATABASE_URL")
    if env_url:
        if env_url.startswith("sqlite:///"):
            return _resolve_sqlite_url(env_url)
        return env_url

    data_dir_override = os.getenv("STREAMBOX_DATA_DIR")
    if data_dir_override:
        data_dir = Path(data_dir_override)
        if not data_dir.is_absolute():
            data_dir = Path.cwd() / data_dir
    else:
        data_dir = Path(__file__).resolve().parent.parent

    data_dir.mkdir(parents=True, exist_ok=True)
    default_path = data_dir / _DB_FILENAME
    return f"sqlite:///{default_path}"


DATABASE_URL = _determine_database_url()

engine = create_engine(
    DATABASE_URL,
    echo=False,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)


def init_db() -> None:
    """Create database tables if they do not yet exist."""
    SQLModel.metadata.create_all(engine)


@contextmanager
def session_scope() -> Iterator[Session]:
    """Provide a transactional scope around a series of operations."""
    session = Session(engine)
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def get_session() -> Iterator[Session]:
    """FastAPI dependency that yields a database session."""
    with Session(engine) as session:
        yield session
