import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.health import router as health_router
from app.api.player import router as player_router
from app.core.config import settings
from app.database.base import Base
from app.database.session import engine

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Tablas sincronizadas en PostgreSQL")
    except Exception as e:
        logger.warning("PostgreSQL no disponible: %s", e)
    yield
    await engine.dispose()


app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix=settings.API_V1_PREFIX)
app.include_router(player_router, prefix=settings.API_V1_PREFIX)
