from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.player import Player


class PlayerService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_riot_id(self, name: str, tag: str) -> Player | None:
        result = await self.db.execute(
            select(Player).where(Player.riot_name == name, Player.riot_tag == tag)
        )
        return result.scalar_one_or_none()
