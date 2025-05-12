# auth_router.py
from fastapi import APIRouter
from .auth import login  # import các hàm bạn cần

router = APIRouter()

router.post("/login")(login)
