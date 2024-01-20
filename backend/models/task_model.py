from pydantic import BaseModel, Field

class VideoUploadRequest(BaseModel):
    index_id: str = Field(..., description="The ID of the index where the video will be uploaded.")
    language: str = Field(default="en", description="The language of the video.")

class TaskStatusRequest(BaseModel):
    task_id: str = Field(..., description="The ID of the task whose status is being checked.")
