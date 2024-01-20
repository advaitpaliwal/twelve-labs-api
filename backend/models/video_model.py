from pydantic import BaseModel, Field

class VideoRequest(BaseModel):
    index_id: str = Field(..., description="The ID of the index where the video will be uploaded.")
    video_id: str = Field(..., description="The ID of the video.")