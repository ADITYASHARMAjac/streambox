from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from . import models, schemas, security
from .database import get_session

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=schemas.UserRead, status_code=status.HTTP_201_CREATED)
def register_user(payload: schemas.UserCreate, session: Session = Depends(get_session)) -> schemas.UserRead:
    existing = session.exec(select(models.User).where(models.User.email == payload.email)).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    user = models.User(
        email=payload.email,
        full_name=payload.full_name,
        hashed_password=security.get_password_hash(payload.password),
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return schemas.UserRead.model_validate(user, from_attributes=True)


@router.post("/login", response_model=schemas.TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)) -> schemas.TokenResponse:
    user = session.exec(select(models.User).where(models.User.email == form_data.username)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    if not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    access_token = security.create_access_token(user.email)
    return schemas.TokenResponse(access_token=access_token)


@router.get("/me", response_model=schemas.UserRead)
def get_me(current_user: models.User = Depends(security.get_current_user)) -> schemas.UserRead:
    return schemas.UserRead.model_validate(current_user, from_attributes=True)
