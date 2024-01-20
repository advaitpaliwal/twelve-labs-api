from fastapi import APIRouter, HTTPException
from service import TwelveLabsService
from models.index_model import IndexRequest

index_router = APIRouter()
service = TwelveLabsService()

@index_router.get("/list")
async def get_indexes():
    try:
        return service.get_indexes()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@index_router.post("/get_or_create")
async def get_or_create_index(request: IndexRequest):
    try:
        return service.get_or_create_index(request.index_name)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
