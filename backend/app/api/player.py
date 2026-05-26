import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.player import PlayerSearchResponse, StoredPlayerResponse
from app.services.henrikdev_service import HenrikDevError, HenrikDevService
from app.services.storage_service import StorageService

logger = logging.getLogger(__name__)

router = APIRouter()
henrik = HenrikDevService()


@router.get("/player/{name}/{tag}", response_model=PlayerSearchResponse)
async def get_player(name: str, tag: str, db: AsyncSession = Depends(get_db)):
    try:
        account = await henrik.get_account(name, tag)
    except HenrikDevError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)

    region = account.get("region", "")
    rank = None
    if region:
        try:
            rank = await henrik.get_mmr(region, name, tag)
        except HenrikDevError:
            rank = None

    try:
        storage = StorageService(db)
        await storage.save_player(account, rank)
        logger.info("Jugador %s#%s guardado en DB", account["name"], account["tag"])
    except Exception as e:
        logger.warning("No se pudo guardar en DB: %s", e)

    return PlayerSearchResponse(account=account, rank=rank)


@router.get("/player/{name}/{tag}/matches", response_model=list)
async def get_player_matches(name: str, tag: str):
    try:
        account = await henrik.get_account(name, tag)
    except HenrikDevError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)

    region = account.get("region", "")
    try:
        matches = await henrik.get_match_history(region, name, tag)
    except HenrikDevError as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)

    return matches or []


@router.get("/players", response_model=list[StoredPlayerResponse])
async def list_stored_players(limit: int = 20, offset: int = 0):
    from app.database.session import async_session

    try:
        async with async_session() as session:
            storage = StorageService(session)
            return await storage.get_all_players(limit, offset)
    except Exception as e:
        logger.warning("DB no disponible para historial: %s", e)
        return []


@router.get("/players/{player_id}", response_model=StoredPlayerResponse)
async def get_stored_player(player_id: str):
    from app.database.session import async_session

    try:
        async with async_session() as session:
            storage = StorageService(session)
            player = await storage.get_player_by_id(player_id)
            if not player:
                raise HTTPException(status_code=404, detail="Jugador no encontrado en la DB")
            return player
    except HTTPException:
        raise
    except Exception as e:
        logger.warning("DB no disponible: %s", e)
        raise HTTPException(status_code=503, detail="Base de datos no disponible")
