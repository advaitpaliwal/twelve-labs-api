from fastapi import FastAPI
from routes import index_router, task_router, generate_router, video_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="TwelveLabs API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(index_router, prefix="/index", tags=["Index Management"])
app.include_router(task_router, prefix="/task", tags=["Task Management"])
app.include_router(generate_router, prefix="/generate", tags=["Content Generation"])
app.include_router(video_router, prefix="/video", tags=["Video Management"])



@app.get("/")
async def main():
    return {"message": "Twelve Labs API."}