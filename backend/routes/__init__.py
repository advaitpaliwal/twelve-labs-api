from routes.index import router as index_router
from routes.task import router as task_router
from routes.generate import router as generate_router
from routes.video import router as video_router
from routes.fact import router as fact_router

__all__ = ["index_router", "task_router",
           "generate_router", "video_router", "fact_router"]
