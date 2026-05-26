import uuid
from datetime import datetime, timezone

from sqlalchemy import Float, Integer, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class PlayerStats(Base):
    __tablename__ = "player_stats"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    player_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("players.id", ondelete="CASCADE"), nullable=False
    )
    rank: Mapped[str] = mapped_column(String(50), nullable=True)
    rank_tier_id: Mapped[int] = mapped_column(Integer, nullable=True)
    rr: Mapped[int] = mapped_column(Integer, nullable=True)
    peak_rank: Mapped[str] = mapped_column(String(50), nullable=True)
    peak_tier_id: Mapped[int] = mapped_column(Integer, nullable=True)
    kd_ratio: Mapped[float] = mapped_column(Float, nullable=True)
    win_rate: Mapped[float] = mapped_column(Float, nullable=True)
    headshot_percentage: Mapped[float] = mapped_column(Float, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    player = relationship("Player", back_populates="stats")
