from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.player import Player
from app.models.player_stats import PlayerStats


class StorageService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_player_by_riot_id(self, name: str, tag: str) -> Player | None:
        result = await self.db.execute(
            select(Player)
            .options(selectinload(Player.stats))
            .where(Player.riot_name == name, Player.riot_tag == tag)
        )
        return result.scalar_one_or_none()

    async def get_player_by_puuid(self, puuid: str) -> Player | None:
        result = await self.db.execute(
            select(Player)
            .options(selectinload(Player.stats))
            .where(Player.puuid == puuid)
        )
        return result.scalar_one_or_none()

    async def save_player(self, account: dict, rank: dict | None) -> Player:
        existing = await self.get_player_by_puuid(account["puuid"])
        now = datetime.now(timezone.utc)

        if existing:
            existing.riot_name = account["name"]
            existing.riot_tag = account["tag"]
            existing.region = account.get("region") or existing.region
            existing.account_level = account.get("account_level")
            existing.last_updated = now
            player = existing
        else:
            player = Player(
                puuid=account["puuid"],
                riot_name=account["name"],
                riot_tag=account["tag"],
                region=account.get("region"),
                account_level=account.get("account_level"),
                last_updated=now,
            )
            self.db.add(player)

        await self.db.flush()

        if rank:
            stats_data = {
                "rank": rank.get("current", {}).get("tier", {}).get("name"),
                "rank_tier_id": rank.get("current", {}).get("tier", {}).get("id"),
                "rr": rank.get("current", {}).get("rr"),
                "peak_rank": rank.get("peak", {}).get("tier", {}).get("name") if rank.get("peak") else None,
                "peak_tier_id": rank.get("peak", {}).get("tier", {}).get("id") if rank.get("peak") else None,
                "updated_at": now,
            }

            existing_stats = await self.db.execute(
                select(PlayerStats).where(PlayerStats.player_id == player.id)
            )
            stats_row = existing_stats.scalar_one_or_none()

            if stats_row:
                for key, value in stats_data.items():
                    setattr(stats_row, key, value)
            else:
                stat = PlayerStats(player_id=player.id, **stats_data)
                self.db.add(stat)

        await self.db.commit()
        await self.db.refresh(player)
        return player

    async def get_all_players(self, limit: int = 20, offset: int = 0) -> list[Player]:
        result = await self.db.execute(
            select(Player)
            .options(selectinload(Player.stats))
            .order_by(Player.last_updated.desc())
            .limit(limit)
            .offset(offset)
        )
        return list(result.scalars().all())

    async def get_player_by_id(self, player_id: str) -> Player | None:
        from uuid import UUID
        result = await self.db.execute(
            select(Player)
            .options(selectinload(Player.stats))
            .where(Player.id == UUID(player_id))
        )
        return result.scalar_one_or_none()
