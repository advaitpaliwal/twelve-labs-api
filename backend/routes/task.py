# routers/router.py
from fastapi import APIRouter, HTTPException
from service import TwelveLabsService
from models.task_model import Task

router = APIRouter()
service = TwelveLabsService()

@router.get("/check_status/{task_id}")
async def check_video_indexing_status(task_id: str) -> Task:
    try:
        return service.check_video_indexing_status(task_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_tasks():
    try:
        return service.list_tasks()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
