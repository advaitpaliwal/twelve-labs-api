from fastapi import APIRouter, HTTPException
from service import TwelveLabsService
from models.video_model import VideoRequest

router = APIRouter()
service = TwelveLabsService()

@router.get("/")
async def get_video_info(request: VideoRequest):
    try:
        return service.get_video(request.index_id, request.video_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
