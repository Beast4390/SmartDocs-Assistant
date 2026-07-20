from services.document_processor import DocumentProcessor

processor = DocumentProcessor("uploads")

text = processor.extract_text(
    "uploads/5a83fb80-462e-4e87-84c7-047b499ca59a.pdf"
)

print(text)