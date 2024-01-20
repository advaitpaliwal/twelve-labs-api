from pydantic import BaseModel, Field
from typing import Optional, Literal

class GenerateRequest(BaseModel):
    video_id: str = Field(..., description="The ID of the video for content generation.")
    prompt: Optional[str] = Field(None, description="An optional prompt to guide the content generation.")
    type: Literal["gist", "summary", "chapter", "highlight", "generate"] = Field(..., description="The type of generatation ('gist', 'summary', 'chapter', 'highlight', 'generate).")