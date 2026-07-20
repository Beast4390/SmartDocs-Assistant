import os
import json
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename


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

        metadata = {
            "original_name": file.filename,
            "saved_name": filename,
            "size": os.path.getsize(filepath),
            "uploaded_at": datetime.now().isoformat(),
            "path": filepath
        }

        self.save_metadata(metadata)

        return metadata

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