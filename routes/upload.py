from flask import Blueprint, request, jsonify, current_app
from services.document_processor import DocumentProcessor
from utils.helper import allowed_file

upload_bp = Blueprint("upload", __name__)

processor = None


@upload_bp.before_app_request
def initialize():
    global processor

    if processor is None:
        processor = DocumentProcessor(
            current_app.config["UPLOAD_FOLDER"]
        )


@upload_bp.route("/api/upload", methods=["POST"])
def upload_document():
    global processor

    if processor is None:
        return jsonify({
            "success": False,
            "message": "Document processor not initialized."
        }), 500

    # Check whether a file is present
    if "file" not in request.files:
        return jsonify({
            "success": False,
            "message": "No file uploaded."
        }), 400

    file = request.files["file"]

    # Empty filename
    if file.filename == "":
        return jsonify({
            "success": False,
            "message": "Empty filename."
        }), 400

    # Validate extension
    if not allowed_file(
        file.filename,
        current_app.config["ALLOWED_EXTENSIONS"]
    ):
        return jsonify({
            "success": False,
            "message": "Unsupported file type."
        }), 400

    try:
        metadata = processor.save_document(file)

        return jsonify({
            "success": True,
            "message": "File uploaded successfully.",
            "metadata": metadata
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500