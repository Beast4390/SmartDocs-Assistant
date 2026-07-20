from services.document_processor import DocumentProcessor
from services.text_cleaner import TextCleaner
from services.chunking import TextChunker

processor = DocumentProcessor("uploads")

text = processor.extract_text(
    "uploads/5a83fb80-462e-4e87-84c7-047b499ca59a.pdf"
)

cleaned = TextCleaner.clean(text)

chunks = TextChunker.chunk_text(cleaned)

print(f"\nTotal Chunks: {len(chunks)}")

for i, chunk in enumerate(chunks, start=1):
    print("\n" + "=" * 60)
    print(f"CHUNK {i}")
    print("=" * 60)
    print(chunk)