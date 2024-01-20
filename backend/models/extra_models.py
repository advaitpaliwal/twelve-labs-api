from pydantic import BaseModel, Field, HttpUrl
from typing import List

class HLS(BaseModel):
    status: str = Field(..., description="The status of the HLS processing.")
    thumbnail_urls: List[HttpUrl] = Field(..., description="The URLs of the thumbnails.")
    updated_at: str = Field(..., description="The updated time of the HLS processing.")
    video_url: HttpUrl = Field(..., description="The URL of the HLS video.")

class Metadata(BaseModel):
    duration: float = Field(..., description="The duration of the video in seconds.")
    filename: str = Field(..., description="The filename of the video.")
    height: int = Field(..., description="The height of the video.")
    width: int = Field(..., description="The width of the video.")