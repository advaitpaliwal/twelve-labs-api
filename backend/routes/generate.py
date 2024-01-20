from fastapi import APIRouter, HTTPException
from service import TwelveLabsService
from models.generate_request import GenerateRequest

generate_router = APIRouter()
service = TwelveLabsService()

@generate_router.post("/generate/")
async def generate_content(request: GenerateRequest):
    try:
        if request.type == "gist":
            return service.generate_gist(request.video_id)
        elif request.type == "summary":
            return service.generate_summary(request.video_id, request.prompt)
        elif request.type == "chapter":
            return service.generate_chapter(request.video_id, request.prompt)
        elif request.type == "highlight":
            return service.generate_highlight(request.video_id, request.prompt)
        elif request.type == "generate":
            if not request.prompt:
                raise HTTPException(status_code=400, detail="Prompt is required for content generation.")
            return service.generate(request.video_id, request.prompt)
        else:
            raise HTTPException(status_code=400, detail=f"Content type '{request.type}' is not supported.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))