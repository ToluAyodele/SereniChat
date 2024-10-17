from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from core.config import settings
from api.main import api_router

app = FastAPI()

if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[ str(origin).strip('/') for origin in settings.CORS_ORIGINS ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router)
