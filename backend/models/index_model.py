from pydantic import BaseModel, Field

class IndexRequest(BaseModel):
    index_name: str = Field(..., description="The name of the index.")