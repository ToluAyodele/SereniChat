from fastapi import APIRouter

from api.routes import items

api_router = APIRouter()
api_router.include_router(items.router)