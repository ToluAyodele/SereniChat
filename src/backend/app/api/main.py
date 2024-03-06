from fastapi import APIRouter

from api.routes import organizations

api_router = APIRouter()
api_router.include_router(organizations.router, prefix='/organizations', tags=['organizations'])
