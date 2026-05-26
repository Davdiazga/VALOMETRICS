from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "ValoMetrics"
    API_V1_PREFIX: str = "/api"

    POSTGRES_USER: str = "valometrics"
    POSTGRES_PASSWORD: str = "valometrics"
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: str = "5432"
    POSTGRES_DB: str = "valometrics"

    DATABASE_URL: str | None = None

    @property
    def db_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    HENRIKDEV_API_KEY: str = ""
    HENRIKDEV_BASE_URL: str = "https://api.henrikdev.xyz/valorant"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
