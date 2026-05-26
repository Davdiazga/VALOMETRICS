import logging
from urllib.parse import quote

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

ERROR_MESSAGES = {
    22: "Cuenta no encontrada. Verifica que el nombre y tag sean correctos.",
    23: "El jugador existe pero no tiene partidas registradas. Debe jugar al menos una partida.",
}


class HenrikDevError(Exception):
    def __init__(self, message: str, status_code: int = 500, code: int | None = None):
        self.message = message
        self.status_code = status_code
        self.code = code
        super().__init__(message)


class HenrikDevService:
    def __init__(self):
        self.base_url = settings.HENRIKDEV_BASE_URL
        self.api_key = settings.HENRIKDEV_API_KEY

    async def _get(self, path: str) -> dict | list | None:
        url = f"{self.base_url}{path}?api_key={self.api_key}"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, timeout=15)
            if resp.status_code == 200:
                return resp.json().get("data")
            if resp.status_code in (401, 403):
                raise HenrikDevError("API key inválida. Revisa la configuración.", resp.status_code)
            if resp.status_code == 429:
                raise HenrikDevError("Demasiadas solicitudes. Espera unos segundos.", 429)
            body = resp.json()
            errors = body.get("errors", [])
            if errors:
                err = errors[0]
                code = err.get("code")
                msg = ERROR_MESSAGES.get(code, err.get("message", f"Error {resp.status_code}"))
                status = err.get("status", resp.status_code)
                raise HenrikDevError(msg, status, code)
            raise HenrikDevError(f"Error {resp.status_code}", resp.status_code)

    async def get_account(self, name: str, tag: str) -> dict | None:
        return await self._get(f"/v2/account/{quote(name)}/{quote(tag)}")

    async def get_mmr(self, region: str, name: str, tag: str) -> dict | None:
        return await self._get(f"/v2/mmr/{region}/{quote(name)}/{quote(tag)}")

    async def get_match_history(self, region: str, name: str, tag: str, platform: str = "pc") -> list | None:
        data = await self._get(f"/v4/matches/{region}/{platform}/{quote(name)}/{quote(tag)}")
        if isinstance(data, list):
            return data
        return None
