import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Player(Base):
    __tablename__ = "players"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    puuid: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    riot_name: Mapped[str] = mapped_column(String(100), nullable=False)
    riot_tag: Mapped[str] = mapped_column(String(20), nullable=False)
    region: Mapped[str] = mapped_column(String(20), nullable=True)
    account_level: Mapped[int] = mapped_column(Integer, nullable=True)
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    stats = relationship("PlayerStats", back_populates="player", cascade="all, delete-orphan")
