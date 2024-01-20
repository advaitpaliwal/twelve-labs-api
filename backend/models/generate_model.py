from pydantic import BaseModel, Field
from typing import Optional, List

class GenerateRequest(BaseModel):
    video_id: str = Field(..., description="The ID of the video for content generation.")
    prompt: Optional[str] = Field(default=None, description="An optional prompt to guide the content generation.")

class GistResponse(BaseModel):
    id: str = Field(..., description="The ID of the video.")
    title: str = Field(..., description="The title of the video.")
    topics: List[str] = Field(..., description="The topics of the video.")
    hashtags: List[str] = Field(..., description="The hashtags of the video.")

class SummaryResponse(BaseModel):
    id: str = Field(..., description="The ID of the video.")
    summary: str = Field(..., description="The summary of the video.")

class Chapter(BaseModel):
    chapter_number: int = Field(..., description="The chapter number of the video.")
    start: int = Field(..., description="The start time of the chapter.")
    end: int = Field(..., description="The end time of the chapter.")
    chapter_title: str = Field(..., description="The chapter title of the video.")
    chapter_summary: str = Field(..., description="The chapter summary of the video.")

class ChapterResponse(BaseModel):
    id: str = Field(..., description="The ID of the video.")
    chapters: List[Chapter] = Field(..., description="The chapters of the video.")

class Highlight(BaseModel):
    start: int = Field(..., description="The start time of the highlight.")
    end: int = Field(..., description="The end time of the highlight.")
    highlight: str = Field(..., description="The highlight title of the video.")
    highlight_summary: str = Field(..., description="The highlight summary of the video.")

class HighlightResponse(BaseModel):
    id: str = Field(..., description="The ID of the video.")
    highlights: List[Highlight] = Field(..., description="The highlights of the video.")

class CustomResponse(BaseModel):
    id: str = Field(..., description="The ID of the video.")
    data: str = Field(..., description="The generated data of the video.")