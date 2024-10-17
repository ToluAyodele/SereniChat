from fastapi import APIRouter

from api.routes import organizations, emotions

api_router = APIRouter()
api_router.include_router(organizations.router, prefix='/organizations', tags=['organizations'])
api_router.include_router(emotions.router, prefix='/synonyms', tags=['emotions'])

