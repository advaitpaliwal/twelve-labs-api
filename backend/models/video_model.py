from pydantic import BaseModel, Field
from models.extra_models import HLS, Metadata


class VideoRequest(BaseModel):
    index_id: str = Field(...,
                          description="The ID of the index where the video will be uploaded.")
    video_id: str = Field(..., description="The ID of the video.")


class VideoUrlRequest(BaseModel):
    index_id: str = Field(...,
                          description="The ID of the index where the video will be uploaded.")
    url: str = Field(..., description="The URL of the video.")


class Video(BaseModel):
    id: str = Field(..., alias='_id', description="The ID of the video.")
    hls: HLS = Field(..., description="The HLS of the video.")
    indexed_at: str = Field(..., description="The indexed time of the video.")
    metadata: Metadata = Field(..., description="The metadata of the video.")

    class Config:
        populate_by_name = True
