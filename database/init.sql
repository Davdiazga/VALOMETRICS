CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    puuid VARCHAR(100) UNIQUE NOT NULL,
    riot_name VARCHAR(100) NOT NULL,
    riot_tag VARCHAR(20) NOT NULL,
    region VARCHAR(20),
    account_level INTEGER,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS player_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    rank VARCHAR(50),
    rank_tier_id INTEGER,
    rr INTEGER,
    peak_rank VARCHAR(50),
    peak_tier_id INTEGER,
    kd_ratio FLOAT,
    win_rate FLOAT,
    headshot_percentage FLOAT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_players_puuid ON players(puuid);
CREATE INDEX IF NOT EXISTS idx_players_riot_id ON players(riot_name, riot_tag);
CREATE INDEX IF NOT EXISTS idx_player_stats_player_id ON player_stats(player_id);
