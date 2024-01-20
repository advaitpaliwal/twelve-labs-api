from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Depends
from service import TwelveLabsService
from models.video_model import VideoRequest, Video
import os

router = APIRouter()
service = TwelveLabsService()


@router.post("/upload")
async def upload_video(file: UploadFile = File(...), index_id: str = Form(...), language: str = Form(...)):
    temp_dir = "temp/"
    os.makedirs(temp_dir, exist_ok=True)

    try:
        file_location = f"{temp_dir}{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_content = await file.read()
            file_object.write(file_content)
        response = service.upload_video(index_id, file.filename, file_location, language)
        return response
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/info")
async def get_video_info(request: VideoRequest) -> Video:
    try:
        return service.get_video(request.index_id, request.video_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
