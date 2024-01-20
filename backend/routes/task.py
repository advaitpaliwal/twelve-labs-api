# routers/router.py
from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Depends
from service import TwelveLabsService
from models.task_model import VideoUploadRequest, TaskStatusRequest

router = APIRouter()
service = TwelveLabsService()

@router.post("/upload_video")
async def upload_video(request: VideoUploadRequest = Depends(), video_file: UploadFile = File(...)):
    try:
        file_location = f"temp/{video_file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(video_file.file.read())
        return service.upload_video(request.index_id, video_file.filename, file_location, request.language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/check_status/{task_id}")
async def check_video_indexing_status(request: TaskStatusRequest):
    try:
        return service.check_video_indexing_status(request.task_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_tasks():
    try:
        return service.list_tasks()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
