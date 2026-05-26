from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings

engine = create_async_engine(
    settings.db_url,
    echo=False,
    connect_args={"timeout": 5, "command_timeout": 5},
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=0,
)

async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db() -> AsyncSession:
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
