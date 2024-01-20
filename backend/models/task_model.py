from pydantic import BaseModel, Field
from models.extra_models import HLS, Metadata
from typing import Optional
class TaskStatusRequest(BaseModel):
    task_id: str = Field(..., description="The ID of the task whose status is being checked.")
class Task(BaseModel):
    id: str = Field(..., alias='_id', description="The ID of the task.")
    created_at: str = Field(..., description="The created time of the task.")
    hls: Optional[HLS] = Field(None, description="The HLS information of the task.")  # HLS field is optional
    index_id: str = Field(..., description="The ID of the index where the task is.")
    metadata: Metadata = Field(..., description="The metadata of the task.")
    status: str = Field(..., description="The status of the task.")
    type: str = Field(..., description="The type of the task.")
    updated_at: str = Field(..., description="The updated time of the task.")
    video_id: str = Field(..., description="The ID of the video.")

    class Config:
        populate_by_name = True