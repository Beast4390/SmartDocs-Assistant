from flask import Blueprint, request, jsonify
from services.rag_service import RAGService

chat_bp = Blueprint("chat", __name__)

rag = RAGService()


@chat_bp.route("/api/chat", methods=["POST"])
def chat():

    data = request.get_json()

    question = data.get("question", "").strip()

    if not question:
        return jsonify({
            "success": False,
            "message": "Question is required."
        }), 400

    try:

        answer = rag.ask(question)

        return jsonify({
            "success": True,
            "question": question,
            "answer": answer
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500