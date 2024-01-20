from fastapi import APIRouter, HTTPException
from service import TwelveLabsService
from models.generate_model import GenerateRequest, GistResponse, SummaryResponse, ChapterResponse, HighlightResponse, CustomResponse

router = APIRouter()
service = TwelveLabsService()

@router.post("/gist")
async def generate_gist_content(request: GenerateRequest) -> GistResponse:
    try:
        return service.generate_gist(request.video_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summary")
async def generate_summary_content(request: GenerateRequest) -> SummaryResponse:
    try:
        return service.generate_summary(request.video_id, request.prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chapter")
async def generate_chapter_content(request: GenerateRequest) -> ChapterResponse:
    try:
        return service.generate_chapter(request.video_id, request.prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/highlight")
async def generate_highlight_content(request: GenerateRequest) -> HighlightResponse:
    try:
        return service.generate_highlight(request.video_id, request.prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/custom")
async def generate_custom_content(request: GenerateRequest) -> CustomResponse:
    try:
        if not request.prompt:
            raise HTTPException(status_code=400, detail="Prompt is required for content generation.")
        return service.generate(request.video_id, request.prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
