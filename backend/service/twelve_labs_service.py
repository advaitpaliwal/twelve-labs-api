from config.env import API_URL, API_KEY
import requests
import time
from pprint import pprint
from typing import Dict, Optional


class TwelveLabsService:

    HEADERS = {
        "x-api-key": API_KEY
    }

    INDEXES_URL = f"{API_URL}/indexes"
    TASKS_URL = f"{API_URL}/tasks"
    GIST_URL = f"{API_URL}/gist"
    SUMMARIZE_URL = f"{API_URL}/summarize"
    GENERATE_URL = f"{API_URL}/generate"

    def __init__(self) -> None:
        pass

    def create_index(self, index_name: str):
        data = {
            "engines": [
                {
                    "engine_name": "marengo2.5",
                    "engine_options": ["visual", "conversation", "text_in_video", "logo"]
                },
                {
                    "engine_name": "pegasus1",
                    "engine_options": ["visual", "conversation"]
                }
            ],
            "index_name": index_name,
            "addons": ["thumbnail"]
        }
        response = requests.post(
            self.INDEXES_URL, headers=self.HEADERS, json=data)
        return response.json()

    def get_indexes(self):
        response = requests.get(self.INDEXES_URL, headers=self.HEADERS)
        return response.json()

    def get_or_create_index(self, index_name: str) -> Dict:
        indexes = self.get_indexes()
        for index in indexes['data']:
            if index.get('index_name') == index_name:
                return index
        return self.create_index(index_name)

    def upload_video(self, index_id: str, file_name: str, file_path: str, language: str = 'en'):
        file_stream = open(file_path, "rb")
        data = {
            "index_id": index_id,
            "language": language
        }
        file_param = [
            ("video_file", (file_name, file_stream, "application/octet-stream")),
        ]
        response = requests.post(
            self.TASKS_URL, headers=self.HEADERS, data=data, files=file_param)
        file_stream.close()
        return response.json()

    def add_video_url(self, index_id: str, video_url: str):
        data = {
            "index_id": index_id,
            "url": video_url
        }
        response = requests.post(
            self.TASKS_URL, headers=self.HEADERS, json=data)
        return response.json()

    def check_video_indexing_status(self, task_id: str):
        task_status_url = f"{self.TASKS_URL}/{task_id}"
        response = requests.get(task_status_url, headers=self.HEADERS)
        return response.json()

    def get_video(self, index_id: str, video_id: str):
        video_url = f"{self.INDEXES_URL}/{index_id}/videos/{video_id}"
        response = requests.get(video_url, headers=self.HEADERS)
        return response.json()

    def list_tasks(self):
        response = requests.get(self.TASKS_URL, headers=self.HEADERS)
        return response.json()

    def generate_gist(self, video_id: str):
        data = {
            "video_id": video_id,
            "types": ["title", "topic", "hashtag"]
        }
        response = requests.post(
            self.GIST_URL, headers=self.HEADERS, json=data)
        return response.json()

    def generate_summary(self, video_id: str, prompt: Optional[str] = None):
        data = {
            "video_id": video_id,
            "type": "summary"
        }
        if prompt:
            data['prompt'] = prompt
        response = requests.post(
            self.SUMMARIZE_URL, headers=self.HEADERS, json=data)
        return response.json()

    def generate_chapter(self, video_id: str, prompt: Optional[str] = None):
        data = {
            "video_id": video_id,
            "type": "chapter"
        }
        if prompt:
            data['prompt'] = prompt
        response = requests.post(
            self.SUMMARIZE_URL, headers=self.HEADERS, json=data)
        return response.json()

    def generate_highlight(self, video_id: str, prompt: Optional[str] = None):
        data = {
            "video_id": video_id,
            "type": "highlight"
        }
        if prompt:
            data['prompt'] = prompt
        response = requests.post(
            self.SUMMARIZE_URL, headers=self.HEADERS, json=data)
        return response.json()

    def generate(self, video_id: str, prompt: str):
        data = {
            "video_id": video_id,
            "prompt": prompt
        }
        response = requests.post(
            self.GENERATE_URL, headers=self.HEADERS, json=data)
        return response.json()


if __name__ == "__main__":
    import time
    service = TwelveLabsService()
    index = service.get_or_create_index("takehome")
    index_id = index.get('_id')
    all_tasks = service.list_tasks()
    path_to_video = "example.mp4"
    task_id = "65ac4f63627beda40b8dfb13"
    file_url = "https://www.youtube.com/watch?v=luFGI13Mv8o"
    response = service.add_video_url(index_id, file_url)
    pprint(response)
    # response = service.upload_video(index_id, path_to_video, path_to_video)
    # task_id = response.get('task_id')
    # pprint(response)
    # response = service.check_video_indexing_status(task_id)
    # pprint(response)
    # video_id = response.get('video_id')
    # # print(f"VIDEO ID: {video_id}")
    # # # pprint(response)
    # response = service.get_video(index_id, video_id)
    # pprint(response)

    # response = service.generate_gist(video_id)
    # pprint(response)
    # response = service.generate_summary(video_id)
    # pprint(response)
    # response = service.generate_chapter(video_id)
    # pprint(response)
    # response = service.generate_highlight(video_id)
    # pprint(response)
