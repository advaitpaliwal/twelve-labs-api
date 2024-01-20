from dotenv import load_dotenv
import os

load_dotenv()

API_URL = os.getenv("API_URL")
assert API_URL

API_KEY = os.getenv("API_KEY")
assert API_KEY