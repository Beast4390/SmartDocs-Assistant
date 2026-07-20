import os
import json
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename

from services.extractors.pdf_extractor import PDFExtractor
from services.extractors.docx_extractor import DOCXExtractor
from services.extractors.pptx_extractor import PPTXExtractor


class DocumentProcessor:

    def __init__(self, upload_folder):
        self.upload_folder = upload_folder
        self.metadata_file = "database/metadata.json"

    def save_document(self, file):

        extension = file.filename.rsplit(".", 1)[1].lower()

        filename = f"{uuid.uuid4()}.{extension}"
        filename = secure_filename(filename)

        filepath = os.path.join(self.upload_folder, filename)

        file.save(filepath)

        # Extract text immediately after upload
        extracted_text = self.extract_text(filepath)

        metadata = {
            "original_name": file.filename,
            "saved_name": filename,
            "size": os.path.getsize(filepath),
            "uploaded_at": datetime.now().isoformat(),
            "path": filepath,
            "text_length": len(extracted_text)
        }

        self.save_metadata(metadata)

        return metadata

    def extract_text(self, file_path):

        extension = os.path.splitext(file_path)[1].lower()

        if extension == ".pdf":
            return PDFExtractor.extract_text(file_path)

        elif extension == ".docx":
            return DOCXExtractor.extract_text(file_path)

        elif extension == ".pptx":
            return PPTXExtractor.extract_text(file_path)

        else:
            raise ValueError("Unsupported document format.")

    def save_metadata(self, metadata):

        if not os.path.exists(self.metadata_file):
            with open(self.metadata_file, "w") as f:
                json.dump([], f)

        with open(self.metadata_file, "r") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = []

        data.append(metadata)

        with open(self.metadata_file, "w") as f:
            json.dump(data, f, indent=4)