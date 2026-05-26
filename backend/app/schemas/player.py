import uuid
from datetime import datetime

from pydantic import BaseModel


class AccountData(BaseModel):
    puuid: str
    name: str
    tag: str
    region: str
    account_level: int


class TierInfo(BaseModel):
    id: int
    name: str


class RankCurrent(BaseModel):
    tier: TierInfo
    rr: int | None = None


class RankPeak(BaseModel):
    tier: TierInfo | None = None


class RankData(BaseModel):
    current: RankCurrent | None = None
    peak: RankPeak | None = None


class PlayerSearchResponse(BaseModel):
    account: AccountData | None = None
    rank: RankData | None = None
    error: str | None = None


class StoredStatsResponse(BaseModel):
    id: uuid.UUID
    rank: str | None
    rank_tier_id: int | None
    rr: int | None
    peak_rank: str | None
    peak_tier_id: int | None
    kd_ratio: float | None
    win_rate: float | None
    headshot_percentage: float | None
    updated_at: datetime

    model_config = {"from_attributes": True}


class StoredPlayerResponse(BaseModel):
    id: uuid.UUID
    puuid: str
    riot_name: str
    riot_tag: str
    region: str | None
    account_level: int | None
    last_updated: datetime
    created_at: datetime
    stats: list[StoredStatsResponse] = []

    model_config = {"from_attributes": True}
