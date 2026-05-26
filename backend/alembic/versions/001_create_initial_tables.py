"""create initial tables

Revision ID: 001
Revises:
Create Date: 2026-05-25
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "players",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("puuid", sa.String(100), unique=True, nullable=False),
        sa.Column("riot_name", sa.String(100), nullable=False),
        sa.Column("riot_tag", sa.String(20), nullable=False),
        sa.Column("region", sa.String(20), nullable=True),
        sa.Column("account_level", sa.Integer(), nullable=True),
        sa.Column("last_updated", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_table(
        "player_stats",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("player_id", UUID(as_uuid=True), sa.ForeignKey("players.id", ondelete="CASCADE"), nullable=False),
        sa.Column("rank", sa.String(50), nullable=True),
        sa.Column("rank_tier_id", sa.Integer(), nullable=True),
        sa.Column("rr", sa.Integer(), nullable=True),
        sa.Column("peak_rank", sa.String(50), nullable=True),
        sa.Column("peak_tier_id", sa.Integer(), nullable=True),
        sa.Column("kd_ratio", sa.Float(), nullable=True),
        sa.Column("win_rate", sa.Float(), nullable=True),
        sa.Column("headshot_percentage", sa.Float(), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index("idx_players_puuid", "players", ["puuid"])
    op.create_index("idx_players_riot_id", "players", ["riot_name", "riot_tag"])
    op.create_index("idx_player_stats_player_id", "player_stats", ["player_id"])


def downgrade() -> None:
    op.drop_table("player_stats")
    op.drop_table("players")
