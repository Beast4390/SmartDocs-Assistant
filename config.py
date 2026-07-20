import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:

    SECRET_KEY = "smartdocs-secret-key"

    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

    MAX_CONTENT_LENGTH = 50 * 1024 * 1024

    ALLOWED_EXTENSIONS = {
        "pdf",
        "docx",
        "pptx"
    }